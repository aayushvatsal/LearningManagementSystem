from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from django.core.mail import send_mail
from django.conf import settings
from django.utils.crypto import get_random_string
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, UpdateRoleSerializer, CourseSerializer
from .models import CustomUser, OTP, Course

User = get_user_model()

# Helper function to generate OTP
def generate_otp_code():
    return get_random_string(length=6, allowed_chars='0123456789')

# Register view with OTP generation
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save(is_active=False)
            otp_code = generate_otp_code()
            OTP.objects.create(user=user, otp_code=otp_code)

            # Send OTP to the user's email
            send_mail(
                'Your OTP Code',
                f'Your OTP code is {otp_code}',
                settings.EMAIL_HOST_USER,
                [user.email],
                fail_silently=False,
            )
            return Response({'detail': 'OTP sent to your email. Please verify to complete registration.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# OTP Verification view
class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        otp_code = request.data.get('otp_code')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            otp = OTP.objects.get(user=user, otp_code=otp_code)
        except OTP.DoesNotExist:
            return Response({'detail': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

        if otp.is_expired():
            return Response({'detail': 'OTP has expired'}, status=status.HTTP_400_BAD_REQUEST)

        # Mark user as active after OTP verification
        user.is_active = True
        user.save()

        otp.delete()

        return Response({'detail': 'OTP verified. Registration completed successfully.'}, status=status.HTTP_200_OK)

# Login view
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': user.role
            }, status=status.HTTP_200_OK)
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# Logout view
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Get the refresh token from the request
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)

            # Blacklist the token
            token.blacklist()

            return Response({"detail": "Successfully logged out"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Get all users (Admin only)
class GetAllUsersView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Add user (Admin only)
class AddUserView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Update user role (Admin only)
class UpdateUserRoleView(APIView):
    permission_classes = [IsAdminUser]

    def put(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UpdateRoleSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete user (Admin only)
class DeleteUserView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            if user.is_superuser:
                return Response({'detail': 'Cannot delete superuser'}, status=status.HTTP_400_BAD_REQUEST)
            user.delete()
            return Response({'detail': 'User deleted successfully'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

# Course Management Views
class CourseView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_id=None):
        user = request.user
        if course_id:
            try:
                course = Course.objects.get(id=course_id)
                if user.role == 'user' and user not in course.users.all():
                    return Response({'detail': 'You are not enrolled in this course.'}, status=status.HTTP_403_FORBIDDEN)
                if user.role == 'instructor' and course.instructor != user:
                    return Response({'detail': 'You are not the instructor of this course.'}, status=status.HTTP_403_FORBIDDEN)
                serializer = CourseSerializer(course)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Course.DoesNotExist:
                return Response({'detail': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            if user.role == 'user':
                courses = user.enrolled_courses.all()
            elif user.role == 'instructor':
                courses = Course.objects.filter(instructor=user)
            elif user.is_staff:
                courses = Course.objects.all()
            else:
                return Response({'detail': 'You do not have permission to access this resource.'}, status=status.HTTP_403_FORBIDDEN)

            serializer = CourseSerializer(courses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        if not request.user.is_staff:
            return Response({'detail': 'Permission denied. Admin access only.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            course = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, course_id):
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({'detail': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

        if not request.user.is_staff:
            return Response({'detail': 'Permission denied. Admin access only.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, course_id):
        try:
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({'detail': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

        if not request.user.is_staff:
            return Response({'detail': 'Permission denied. Admin access only.'}, status=status.HTTP_403_FORBIDDEN)

        course.delete()
        return Response({'detail': 'Course deleted successfully'}, status=status.HTTP_200_OK)

# Instructor-specific Course View
class InstructorCourseView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        instructors = CustomUser.objects.filter(role='instructor')
        instructor_courses = []
        for instructor in instructors:
            courses = Course.objects.filter(instructor=instructor)
            instructor_courses.append({
                'instructor': UserSerializer(instructor).data,
                'courses': CourseSerializer(courses, many=True).data
            })
        return Response(instructor_courses, status=status.HTTP_200_OK)













# from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from django.contrib.auth import get_user_model
# from rest_framework_simplejwt.tokens import RefreshToken
# from django.core.mail import send_mail
# from django.conf import settings
# from django.utils import timezone
# from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, UpdateRoleSerializer, CourseSerializer
# from .models import OTP, CustomUser, Course
# import random
# from datetime import timedelta

# User = get_user_model()

# # OTP generation and validation
# def generate_otp():
#     return random.randint(100000, 999999)

# # Request OTP for registration
# class RequestOTPView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         email = request.data.get('email')
#         if not email:
#             return Response({'detail': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

#         otp = generate_otp()
#         OTP.objects.create(user_email=email, otp=otp)

#         send_mail(
#             'Your OTP Code',
#             f'Your OTP code is {otp}',
#             settings.EMAIL_HOST_USER,
#             [email],
#             fail_silently=False,
#         )
#         return Response({'detail': 'OTP sent to your email'}, status=status.HTTP_200_OK)

# # Verify OTP
# class VerifyOTPView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         email = request.data.get('email')
#         otp = request.data.get('otp')
#         if not email or not otp:
#             return Response({'detail': 'Email and OTP are required'}, status=status.HTTP_400_BAD_REQUEST)

#         otp_record = OTP.objects.filter(user_email=email, otp=otp).first()

#         if otp_record and otp_record.is_valid():
#             request.session['otp_verified'] = True
#             otp_record.delete()
#             return Response({'detail': 'OTP verified'}, status=status.HTTP_200_OK)
#         else:
#             return Response({'detail': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)

# # Register User after OTP is verified
# class RegisterView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         if not request.session.get('otp_verified'):
#             return Response({'detail': 'OTP must be verified before registration.'}, status=status.HTTP_400_BAD_REQUEST)

#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             refresh = RefreshToken.for_user(user)

#             # Clear OTP session after registration
#             request.session['otp_verified'] = None

#             return Response({
#                 'detail': 'Registered successfully!',
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#                 'role': user.role
#             }, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # User login view
# class LoginView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = LoginSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.validated_data
#             refresh = RefreshToken.for_user(user)

#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#                 'role': user.role
#             }, status=status.HTTP_200_OK)
#         return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# # User logout view
# class LogoutView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         if request.auth:
#             try:
#                 request.auth.blacklist()
#                 return Response({'detail': 'Successfully logged out'}, status=status.HTTP_200_OK)
#             except AttributeError:
#                 return Response({'detail': 'No active session'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response({'detail': 'No active session'}, status=status.HTTP_400_BAD_REQUEST)

# # User Management Views
# class GetAllUsersView(APIView):
#     permission_classes = [IsAdminUser]

#     def get(self, request):
#         users = User.objects.all()
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

# class AddUserView(APIView):
#     permission_classes = [IsAdminUser]

#     def post(self, request):
#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class UpdateUserRoleView(APIView):
#     permission_classes = [IsAdminUser]

#     def put(self, request, user_id):
#         try:
#             user = User.objects.get(id=user_id)
#         except User.DoesNotExist:
#             return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

#         serializer = UpdateRoleSerializer(user, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class DeleteUserView(APIView):
#     permission_classes = [IsAdminUser]

#     def delete(self, request, user_id):
#         try:
#             user = User.objects.get(id=user_id)
#             if user.is_superuser:
#                 return Response({'detail': 'Cannot delete superuser'}, status=status.HTTP_400_BAD_REQUEST)
#             user.delete()
#             return Response({'detail': 'User deleted successfully'}, status=status.HTTP_200_OK)
#         except User.DoesNotExist:
#             return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

# # Course Management Views
# class CourseView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, course_id=None):
#         user = request.user
#         if course_id:
#             try:
#                 course = Course.objects.get(id=course_id)
#                 if user.role == 'user' and user not in course.users.all():
#                     return Response({'detail': 'You are not enrolled in this course.'}, status=status.HTTP_403_FORBIDDEN)
#                 if user.role == 'instructor' and course.instructor != user:
#                     return Response({'detail': 'You are not the instructor of this course.'}, status=status.HTTP_403_FORBIDDEN)
#                 serializer = CourseSerializer(course)
#                 return Response(serializer.data, status=status.HTTP_200_OK)
#             except Course.DoesNotExist:
#                 return Response({'detail': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
#         else:
#             if user.role == 'user':
#                 courses = user.enrolled_courses.all()
#             elif user.role == 'instructor':
#                 courses = Course.objects.filter(instructor=user)
#             elif user.is_staff:
#                 courses = Course.objects.all()
#             else:
#                 return Response({'detail': 'You do not have permission to access this resource.'}, status=status.HTTP_403_FORBIDDEN)

#             serializer = CourseSerializer(courses, many=True)
#             return Response(serializer.data, status=status.HTTP_200_OK)

#     def post(self, request):
#         if not request.user.is_staff:
#             return Response({'detail': 'Permission denied. Admin access only.'}, status=status.HTTP_403_FORBIDDEN)

#         serializer = CourseSerializer(data=request.data)
#         if serializer.is_valid():
#             course = serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, course_id):
#         try:
#             course = Course.objects.get(id=course_id)
#         except Course.DoesNotExist:
#             return Response({'detail': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

#         if not request.user.is_staff:
#             return Response({'detail': 'Permission denied. Admin access only.'}, status=status.HTTP_403_FORBIDDEN)

#         serializer = CourseSerializer(course, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, course_id):
#         try:
#             course = Course.objects.get(id=course_id)
#         except Course.DoesNotExist:
#             return Response({'detail': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

#         if not request.user.is_staff:
#             return Response({'detail': 'Permission denied. Admin access only.'}, status=status.HTTP_403_FORBIDDEN)

#         course.delete()
#         return Response({'detail': 'Course deleted successfully'}, status=status.HTTP_200_OK)

# # Instructor-specific Course View
# class InstructorCourseView(APIView):
#     permission_classes = [IsAdminUser]

#     def get(self, request):
#         instructors = CustomUser.objects.filter(role='instructor')
#         instructor_courses = []
#         for instructor in instructors:
#             courses = Course.objects.filter(instructor=instructor)
#             instructor_courses.append({
#                 'instructor': UserSerializer(instructor).data,
#                 'courses': CourseSerializer(courses, many=True).data
#             })
#         return Response(instructor_courses, status=status.HTTP_200_OK)

















# from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from django.contrib.auth import get_user_model
# from rest_framework_simplejwt.tokens import RefreshToken
# from django.core.mail import send_mail
# from django.conf import settings
# import random
# from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, UpdateRoleSerializer, CourseSerializer
# from .models import CustomUser, Course

# User = get_user_model()

# # Function to generate OTP
# def generate_otp():
#     return random.randint(100000, 999999)

# # Request OTP view (open to all)
# class RequestOTPView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         email = request.data.get('email')
#         if not email:
#             return Response({'detail': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

#         otp = generate_otp()
#         request.session['otp'] = otp
#         send_mail(
#             'Your OTP Code',
#             f'Your OTP code is {otp}',
#             settings.EMAIL_HOST_USER,
#             [email],
#             fail_silently=False,
#         )
#         return Response({'detail': 'OTP sent to your email'}, status=status.HTTP_200_OK)

# # Verify OTP view (open to all)
# class VerifyOTPView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         otp = request.data.get('otp')
#         if otp and str(otp) == str(request.session.get('otp')):
#             return Response({'detail': 'OTP verified'}, status=status.HTTP_200_OK)
#         return Response({'detail': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

# # Register view (open to all)
# class RegisterView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'detail': 'User registered successfully'}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # Login view (open to all)
# class LoginView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = LoginSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.validated_data
#             refresh = RefreshToken.for_user(user)

#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#                 'role': user.role
#             }, status=status.HTTP_200_OK)
#         return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# # Logout view (for authenticated users)
# class LogoutView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         if request.auth:
#             try:
#                 request.auth.blacklist()
#                 return Response({'detail': 'Successfully logged out'}, status=status.HTTP_200_OK)
#             except AttributeError:
#                 return Response({'detail': 'No active session'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response({'detail': 'No active session'}, status=status.HTTP_400_BAD_REQUEST)

# # Get all users (Admin only)
# class GetAllUsersView(APIView):
#     permission_classes = [IsAdminUser]

#     def get(self, request):
#         users = User.objects.all()
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

# # Add a new user (Admin only)
# class AddUserView(APIView):
#     permission_classes = [IsAdminUser]

#     def post(self, request):
#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # Update user role (Admin only)
# class UpdateUserRoleView(APIView):
#     permission_classes = [IsAdminUser]

#     def put(self, request, user_id):
#         try:
#             user = User.objects.get(id=user_id)
#         except User.DoesNotExist:
#             return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

#         serializer = UpdateRoleSerializer(user, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # Delete a user (Admin only)
# class DeleteUserView(APIView):
#     permission_classes = [IsAdminUser]

#     def delete(self, request, user_id):
#         try:
#             user = User.objects.get(id=user_id)
#             if user.is_superuser:
#                 return Response({'detail': 'Cannot delete superuser'}, status=status.HTTP_400_BAD_REQUEST)
#             user.delete()
#             return Response({'detail': 'User deleted successfully'}, status=status.HTTP_200_OK)
#         except User.DoesNotExist:
#             return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

# # Course management (Admin only)
# class CourseView(APIView):
#     permission_classes = [IsAdminUser]
    
#     # Get all courses
#     def get(self, request, course_id=None):
#         if course_id:
#             try:
#                 course = Course.objects.get(id=course_id)
#                 serializer = CourseSerializer(course)
#                 return Response(serializer.data, status=status.HTTP_200_OK)
#             except Course.DoesNotExist:
#                 return Response({'detail': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
#         else:
#             courses = Course.objects.all()
#             serializer = CourseSerializer(courses, many=True)
#             return Response(serializer.data, status=status.HTTP_200_OK)

#     # Create a new course
#     def post(self, request):
#         serializer = CourseSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     # Update a course by ID
#     def put(self, request, course_id):
#         try:
#             course = Course.objects.get(id=course_id)
#         except Course.DoesNotExist:
#             return Response({'detail': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

#         serializer = CourseSerializer(course, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#    # Delete a course by ID
#     def delete(self, request, course_id):
#         try:
#             course = Course.objects.get(id=course_id)
#             course.delete()
#             return Response({'detail': 'Course deleted successfully'}, status=status.HTTP_200_OK)
#         except Course.DoesNotExist:
#             return Response({'detail': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

# # Get all instructors and their assigned courses
# class InstructorCourseView(APIView):
#     permission_classes = [IsAdminUser]

#     def get(self, request):
#         instructors = CustomUser.objects.filter(role='instructor')
#         instructor_courses = []
#         for instructor in instructors:
#             courses = Course.objects.filter(instructor=instructor)
#             instructor_courses.append({
#                 'instructor': UserSerializer(instructor).data,
#                 'courses': CourseSerializer(courses, many=True).data
#             })
#         return Response(instructor_courses, status=status.HTTP_200_OK)































# from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
# from django.contrib.auth import get_user_model
# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework_simplejwt.tokens import RefreshToken
# from django.core.mail import send_mail
# from django.conf import settings
# import random
# from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, UpdateRoleSerializer

# User = get_user_model()

# # Function to generate OTP
# def generate_otp():
#     return random.randint(100000, 999999)

# # Request OTP view (open to all)
# class RequestOTPView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         email = request.data.get('email')
#         if not email:
#             return Response({'detail': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

#         otp = generate_otp()
#         request.session['otp'] = otp
#         send_mail(
#             'Your OTP Code',
#             f'Your OTP code is {otp}',
#             settings.EMAIL_HOST_USER,
#             [email],
#             fail_silently=False,
#         )
#         return Response({'detail': 'OTP sent to your email'}, status=status.HTTP_200_OK)

# # Verify OTP view (open to all)
# class VerifyOTPView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         otp = request.data.get('otp')
#         if otp and str(otp) == str(request.session.get('otp')):
#             return Response({'detail': 'OTP verified'}, status=status.HTTP_200_OK)
#         return Response({'detail': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

# # Register view (open to all)
# class RegisterView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'detail': 'User registered successfully'}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # Login view (open to all)
# class LoginView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = LoginSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.validated_data
#             refresh = RefreshToken.for_user(user)

#             return Response({
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#                 'role': user.role
#             }, status=status.HTTP_200_OK)
#         return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# # Logout view (for authenticated users)
# class LogoutView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         if request.auth:
#             try:
#                 request.auth.blacklist()
#                 return Response({'detail': 'Successfully logged out'}, status=status.HTTP_200_OK)
#             except AttributeError:
#                 return Response({'detail': 'No active session'}, status=status.HTTP_400_BAD_REQUEST)
#         return Response({'detail': 'No active session'}, status=status.HTTP_400_BAD_REQUEST)

# # Get all users (Admin only)
# class GetAllUsersView(APIView):
#     permission_classes = [IsAdminUser]  # Only admin can access this endpoint

#     def get(self, request):
#         users = User.objects.all()
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

# # Add a new user (Admin only)
# class AddUserView(APIView):
#     permission_classes = [IsAdminUser]

#     def post(self, request):
#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # Update user role (Admin only)
# class UpdateUserRoleView(APIView):
#     permission_classes = [IsAdminUser]

#     def put(self, request, user_id):
#         try:
#             user = User.objects.get(id=user_id)
#         except User.DoesNotExist:
#             return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

#         serializer = UpdateRoleSerializer(user, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # Delete a user (Admin only)
# class DeleteUserView(APIView):
#     permission_classes = [IsAdminUser]  # Only admin can delete users

#     def delete(self, request, user_id):
#         try:
#             user = User.objects.get(id=user_id)
#             if user.is_superuser:
#                 return Response({'detail': 'Cannot delete superuser'}, status=status.HTTP_400_BAD_REQUEST)
#             user.delete()
#             return Response({'detail': 'User deleted successfully'}, status=status.HTTP_200_OK)
#         except User.DoesNotExist:
#             return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
