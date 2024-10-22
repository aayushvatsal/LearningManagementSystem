from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .models import Assignment, AssignmentSubmission
from .serializers import AssignmentSerializer, AssignmentSubmissionSerializer
from .permissions import IsInstructor, IsUser


# Instructors: Create assignments, Students: View assignments
class AssignmentListCreateView(ListCreateAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [IsAuthenticated, IsInstructor]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)


# Retrieve, Update, or Delete an assignment (instructors only)
class AssignmentDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method in ['PUT', 'DELETE']:
            self.permission_classes = [IsAuthenticated, IsInstructor]
        return super().get_permissions()


# Students: Submit assignments and view their own submissions
class AssignmentSubmissionView(ListCreateAPIView):
    queryset = AssignmentSubmission.objects.all()
    serializer_class = AssignmentSubmissionSerializer
    permission_classes = [IsAuthenticated, IsUser]

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

    # Ensure students only retrieve their own submissions
    def get_queryset(self):
        return AssignmentSubmission.objects.filter(student=self.request.user)


# Students and Instructors: Retrieve or delete a specific submission
class AssignmentSubmissionDetailView(RetrieveUpdateDestroyAPIView):
    queryset = AssignmentSubmission.objects.all()
    serializer_class = AssignmentSubmissionSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method in ['GET', 'DELETE']:
            self.permission_classes = [IsAuthenticated, IsUser | IsInstructor]
        return super().get_permissions()


# Instructors: Grade submissions
class GradeAssignmentView(APIView):
    permission_classes = [IsAuthenticated, IsInstructor]

    def post(self, request, pk):
        try:
            submission = AssignmentSubmission.objects.get(id=pk)
        except AssignmentSubmission.DoesNotExist:
            return Response({'error': 'Submission not found'}, status=status.HTTP_404_NOT_FOUND)

        submission.grade = request.data.get('grade')
        submission.feedback = request.data.get('feedback')
        submission.save()
        return Response({'status': 'graded'}, status=status.HTTP_200_OK)


# Instructors: Retrieve all submissions for their assignments
class InstructorSubmissionListView(ListAPIView):
    serializer_class = AssignmentSubmissionSerializer
    permission_classes = [IsAuthenticated, IsInstructor]

    def get_queryset(self):
        # Instructors can view submissions for assignments they created
        return AssignmentSubmission.objects.filter(assignment__instructor=self.request.user)


# Instructors: Retrieve specific submission by ID
class InstructorSubmissionDetailView(RetrieveUpdateDestroyAPIView):
    queryset = AssignmentSubmission.objects.all()
    serializer_class = AssignmentSubmissionSerializer
    permission_classes = [IsAuthenticated, IsInstructor]

    def get_object(self):
        return AssignmentSubmission.objects.get(id=self.kwargs['submission_id'])






















# from rest_framework import status
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
# from .models import Assignment, AssignmentSubmission
# from .serializers import AssignmentSerializer, AssignmentSubmissionSerializer
# from .permissions import IsInstructor, IsUser

# # Instructors: Create, Students: Get
# class AssignmentListCreateView(ListCreateAPIView):
#     queryset = Assignment.objects.all()
#     serializer_class = AssignmentSerializer
#     permission_classes = [IsAuthenticated]

#     def get_permissions(self):
#         if self.request.method == 'POST':
#             self.permission_classes = [IsAuthenticated, IsInstructor]
#         return super().get_permissions()

#     def perform_create(self, serializer):
#         serializer.save(instructor=self.request.user)

# class AssignmentDetailView(RetrieveUpdateDestroyAPIView):
#     queryset = Assignment.objects.all()
#     serializer_class = AssignmentSerializer
#     permission_classes = [IsAuthenticated]

#     def get_permissions(self):
#         if self.request.method in ['PUT', 'DELETE']:
#             self.permission_classes = [IsAuthenticated, IsInstructor]
#         return super().get_permissions()

# # Students: Submit
# class AssignmentSubmissionView(ListCreateAPIView):
#     queryset = AssignmentSubmission.objects.all()
#     serializer_class = AssignmentSubmissionSerializer
#     permission_classes = [IsAuthenticated, IsUser]

#     def perform_create(self, serializer):
#         serializer.save(student=self.request.user)

# class AssignmentSubmissionDetailView(RetrieveUpdateDestroyAPIView):
#     queryset = AssignmentSubmission.objects.all()
#     serializer_class = AssignmentSubmissionSerializer
#     permission_classes = [IsAuthenticated]

#     def get_permissions(self):
#         if self.request.method in ['GET', 'DELETE']:
#             self.permission_classes = [IsAuthenticated, IsUser | IsInstructor]
#         return super().get_permissions()

# # Instructors: Grade submissions
# class GradeAssignmentView(APIView):
#     permission_classes = [IsAuthenticated, IsInstructor]

#     def post(self, request, pk):
#         try:
#             submission = AssignmentSubmission.objects.get(id=pk)
#         except AssignmentSubmission.DoesNotExist:
#             return Response({'error': 'Submission not found'}, status=status.HTTP_404_NOT_FOUND)

#         submission.grade = request.data.get('grade')
#         submission.feedback = request.data.get('feedback')
#         submission.save()
#         return Response({'status': 'graded'}, status=status.HTTP_200_OK)























# from rest_framework import status
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
# from .models import Assignment, AssignmentSubmission
# from .serializers import AssignmentSerializer, AssignmentSubmissionSerializer
# from .permissions import IsInstructor, IsUser

# # Instructors: Create, Students: Get
# class AssignmentListCreateView(ListCreateAPIView):
#     queryset = Assignment.objects.all()
#     serializer_class = AssignmentSerializer
#     permission_classes = [IsAuthenticated]

#     def get_permissions(self):
#         if self.request.method == 'POST':
#             self.permission_classes = [IsAuthenticated, IsInstructor]
#         return super().get_permissions()

#     def perform_create(self, serializer):
#         serializer.save(instructor=self.request.user)

# class AssignmentDetailView(RetrieveUpdateDestroyAPIView):
#     queryset = Assignment.objects.all()
#     serializer_class = AssignmentSerializer
#     permission_classes = [IsAuthenticated]

#     def get_permissions(self):
#         if self.request.method in ['PUT', 'DELETE']:
#             self.permission_classes = [IsAuthenticated, IsInstructor]
#         return super().get_permissions()

# # Students: Submit
# class AssignmentSubmissionView(ListCreateAPIView):
#     queryset = AssignmentSubmission.objects.all()
#     serializer_class = AssignmentSubmissionSerializer
#     permission_classes = [IsAuthenticated, IsUser]

#     def perform_create(self, serializer):
#         serializer.save(student=self.request.user)

# class AssignmentSubmissionDetailView(RetrieveUpdateDestroyAPIView):
#     queryset = AssignmentSubmission.objects.all()
#     serializer_class = AssignmentSubmissionSerializer
#     permission_classes = [IsAuthenticated, IsUser]

# # Instructors: Grade submissions
# class GradeAssignmentView(APIView):
#     permission_classes = [IsAuthenticated, IsInstructor]

#     def post(self, request, pk):
#         try:
#             submission = AssignmentSubmission.objects.get(id=pk)
#         except AssignmentSubmission.DoesNotExist:
#             return Response({'error': 'Submission not found'}, status=status.HTTP_404_NOT_FOUND)

#         submission.grade = request.data.get('grade')
#         submission.feedback = request.data.get('feedback')
#         submission.save()
#         return Response({'status': 'graded'}, status=status.HTTP_200_OK)
