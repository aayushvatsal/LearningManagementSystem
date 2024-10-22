from rest_framework import serializers
from .models import Assignment, AssignmentSubmission

class AssignmentSerializer(serializers.ModelSerializer):
    instructor = serializers.ReadOnlyField(source='instructor.username')

    class Meta:
        model = Assignment
        fields = ['id', 'title', 'description', 'due_date', 'resources', 'instructor']


class AssignmentSubmissionSerializer(serializers.ModelSerializer):
    student = serializers.ReadOnlyField(source='student.username')

    class Meta:
        model = AssignmentSubmission
        fields = ['id', 'student', 'assignment', 'submitted_on', 'submission_file', 'grade', 'feedback']













# from rest_framework import serializers
# from .models import Assignment, AssignmentSubmission

# class AssignmentSerializer(serializers.ModelSerializer):
#     instructor = serializers.ReadOnlyField(source='instructor.username')

#     class Meta:
#         model = Assignment
#         fields = ['id', 'title', 'description', 'due_date', 'resources', 'instructor']

# class AssignmentSubmissionSerializer(serializers.ModelSerializer):
#     student = serializers.ReadOnlyField(source='student.username')

#     class Meta:
#         model = AssignmentSubmission
#         fields = ['id', 'student', 'assignment', 'submitted_on', 'submission_file', 'grade', 'feedback']


















# from rest_framework import serializers
# from .models import Assignment, AssignmentSubmission

# class AssignmentSerializer(serializers.ModelSerializer):
#     instructor = serializers.ReadOnlyField(source='instructor.username')

#     class Meta:
#         model = Assignment
#         fields = ['id', 'title', 'description', 'due_date', 'resources', 'instructor']

# class AssignmentSubmissionSerializer(serializers.ModelSerializer):
#     student = serializers.ReadOnlyField(source='student.username')

#     class Meta:
#         model = AssignmentSubmission
#         fields = ['id', 'student', 'assignment', 'submitted_on', 'submission_file', 'grade', 'feedback']
