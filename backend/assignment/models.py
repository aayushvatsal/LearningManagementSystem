from django.db import models
from django.conf import settings

class Assignment(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    due_date = models.DateField()
    resources = models.TextField(null=True, blank=True)  # Optional links or references
    instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assignments')

    def __str__(self):
        return self.title


class AssignmentSubmission(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='submissions')
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    submitted_on = models.DateTimeField(auto_now_add=True)
    submission_file = models.FileField(upload_to='submissions/')
    grade = models.CharField(max_length=10, null=True, blank=True)
    feedback = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Submission by {self.student.username} for {self.assignment.title}"













# from django.db import models
# from django.conf import settings

# class Assignment(models.Model):
#     title = models.CharField(max_length=255)
#     description = models.TextField()
#     due_date = models.DateField()
#     resources = models.TextField(null=True, blank=True)  # Optional links or references
#     instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assignments')

#     def __str__(self):
#         return self.title

# class AssignmentSubmission(models.Model):
#     student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='submissions')
#     assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
#     submitted_on = models.DateTimeField(auto_now_add=True)
#     submission_file = models.FileField(upload_to='submissions/')
#     grade = models.CharField(max_length=10, null=True, blank=True)
#     feedback = models.TextField(null=True, blank=True)

#     def __str__(self):
#         return f"Submission by {self.student.username} for {self.assignment.title}"




















# from django.db import models
# from django.conf import settings

# class Assignment(models.Model):
#     title = models.CharField(max_length=255)
#     description = models.TextField()
#     due_date = models.DateField()
#     resources = models.TextField(null=True, blank=True)  # Optional links or references
#     instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assignments')

#     def __str__(self):
#         return self.title

# class AssignmentSubmission(models.Model):
#     student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='submissions')
#     assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
#     submitted_on = models.DateTimeField(auto_now_add=True)
#     submission_file = models.FileField(upload_to='submissions/')
#     grade = models.CharField(max_length=10, null=True, blank=True)
#     feedback = models.TextField(null=True, blank=True)

#     def __str__(self):
#         return f"Submission by {self.student.username} for {self.assignment.title}"
