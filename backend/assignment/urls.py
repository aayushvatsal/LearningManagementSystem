from django.urls import path
from .views import (
    AssignmentListCreateView,
    AssignmentDetailView,
    AssignmentSubmissionView,
    AssignmentSubmissionDetailView,
    GradeAssignmentView,
    InstructorSubmissionListView,
    InstructorSubmissionDetailView
)

urlpatterns = [
    # For assignments
    path('assignments/', AssignmentListCreateView.as_view(), name='assignment-list-create'),
    path('assignments/<int:pk>/', AssignmentDetailView.as_view(), name='assignment-detail'),

    # For grading assignments
    path('assignments/<int:pk>/grade/', GradeAssignmentView.as_view(), name='grade-assignment'),

    # For student submissions
    path('submissions/', AssignmentSubmissionView.as_view(), name='submission-list-create'),
    path('submissions/<int:pk>/', AssignmentSubmissionDetailView.as_view(), name='submission-detail'),

    # For instructor: Retrieve all submissions and specific submission
    path('instructor/submissions/', InstructorSubmissionListView.as_view(), name='instructor-submission-list'),
    path('instructor/submissions/<int:submission_id>/', InstructorSubmissionDetailView.as_view(), name='instructor-submission-detail'),
]













# from django.urls import path
# from .views import (
#     AssignmentListCreateView, 
#     AssignmentDetailView, 
#     AssignmentSubmissionView, 
#     AssignmentSubmissionDetailView, 
#     GradeAssignmentView
# )

# urlpatterns = [
#     path('assignments/', AssignmentListCreateView.as_view(), name='assignment-list-create'),
#     path('assignments/<int:pk>/', AssignmentDetailView.as_view(), name='assignment-detail'),
#     path('assignments/<int:pk>/grade/', GradeAssignmentView.as_view(), name='grade-assignment'),
#     path('submissions/', AssignmentSubmissionView.as_view(), name='submission-list-create'),
#     path('submissions/<int:pk>/', AssignmentSubmissionDetailView.as_view(), name='submission-detail'),
# ]






















# from django.urls import path
# from .views import (
#     AssignmentListCreateView, 
#     AssignmentDetailView, 
#     AssignmentSubmissionView, 
#     AssignmentSubmissionDetailView, 
#     GradeAssignmentView
# )

# urlpatterns = [
#     path('assignments/', AssignmentListCreateView.as_view(), name='assignment-list-create'),
#     path('assignments/<int:pk>/', AssignmentDetailView.as_view(), name='assignment-detail'),
#     path('assignments/<int:pk>/grade/', GradeAssignmentView.as_view(), name='grade-assignment'),
#     path('submissions/', AssignmentSubmissionView.as_view(), name='submission-list-create'),
#     path('submissions/<int:pk>/', AssignmentSubmissionDetailView.as_view(), name='submission-detail'),
# ]
