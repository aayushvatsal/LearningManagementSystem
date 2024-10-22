from django.urls import path
from .views import RegisterView, VerifyOTPView, LoginView, LogoutView, GetAllUsersView, AddUserView, UpdateUserRoleView, DeleteUserView, CourseView, InstructorCourseView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('users/', GetAllUsersView.as_view(), name='get_all_users'),
    path('users/add/', AddUserView.as_view(), name='add_user'),
    path('users/update-role/<int:user_id>/', UpdateUserRoleView.as_view(), name='update_user_role'),
    path('users/delete/<int:user_id>/', DeleteUserView.as_view(), name='delete_user'),
    path('courses/', CourseView.as_view(), name='course-list'),
    path('courses/<int:course_id>/', CourseView.as_view(), name='course-detail'),
    path('instructors/', InstructorCourseView.as_view(), name='instructor-courses'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]











# from django.urls import path
# from .views import RequestOTPView, VerifyOTPView, RegisterView, LoginView, LogoutView, GetAllUsersView, AddUserView, UpdateUserRoleView, DeleteUserView, CourseView, InstructorCourseView
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# urlpatterns = [
#     path('request-otp/', RequestOTPView.as_view(), name='request-otp'),
#     path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
#     path('register/', RegisterView.as_view(), name='register'),
#     path('login/', LoginView.as_view(), name='login'),
#     path('logout/', LogoutView.as_view(), name='logout'),
#     path('users/', GetAllUsersView.as_view(), name='get_all_users'),
#     path('users/add/', AddUserView.as_view(), name='add_user'),
#     path('users/update-role/<int:user_id>/', UpdateUserRoleView.as_view(), name='update_user_role'),
#     path('users/delete/<int:user_id>/', DeleteUserView.as_view(), name='delete_user'),
#     path('courses/', CourseView.as_view(), name='course-list'),
#     path('courses/<int:course_id>/', CourseView.as_view(), name='course-detail'),
#     path('instructors/', InstructorCourseView.as_view(), name='instructor-courses'),
#     path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
# ]











# from django.urls import path
# from .views import RequestOTPView, VerifyOTPView, RegisterView, LoginView, LogoutView, GetAllUsersView, AddUserView, UpdateUserRoleView, DeleteUserView
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# urlpatterns = [
#     path('request-otp/', RequestOTPView.as_view(), name='request-otp'),
#     path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
#     path('register/', RegisterView.as_view(), name='register'),
#     path('login/', LoginView.as_view(), name='login'),
#     path('logout/', LogoutView.as_view(), name='logout'),
#     path('users/', GetAllUsersView.as_view(), name='get_all_users'),  # Get all users
#     path('users/add/', AddUserView.as_view(), name='add_user'),  # Add user
#     path('users/update-role/<int:user_id>/', UpdateUserRoleView.as_view(), name='update_user_role'),  # Update role
#     path('users/delete/<int:user_id>/', DeleteUserView.as_view(), name='delete_user'),  # Delete user
#     path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
# ]
