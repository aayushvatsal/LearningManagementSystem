from django.db import models
from django.conf import settings
from instructorcalendar.models import ClassSchedule
from django.utils import timezone

class Attendance(models.Model):
    STATUS_CHOICES = [
        ('PRESENT', 'Present'),
        ('ABSENT', 'Absent'),
    ]

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    class_schedule = models.ForeignKey(ClassSchedule, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    date = models.DateField(default=timezone.now)

    class Meta:
        unique_together = ('student', 'class_schedule', 'date')

    def __str__(self):
        return f"{self.student.username} - {self.status} on {self.date} for {self.class_schedule.course.name}"






















# from django.db import models
# from django.conf import settings
# from instructorcalendar.models import ClassSchedule
# from django.utils import timezone

# class Attendance(models.Model):
#     STATUS_CHOICES = [
#         ('PRESENT', 'Present'),
#         ('ABSENT', 'Absent'),
#     ]

#     student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     class_schedule = models.ForeignKey(ClassSchedule, on_delete=models.CASCADE)
#     status = models.CharField(max_length=10, choices=STATUS_CHOICES)
#     date = models.DateField(default=timezone.now)

#     class Meta:
#         unique_together = ('student', 'class_schedule', 'date')

#     def __str__(self):
#         return f"{self.student.username} - {self.status} on {self.date} for {self.class_schedule.course.name}"
















# from django.db import models
# from django.conf import settings
# from instructorcalendar.models import ClassSchedule
# from django.utils import timezone

# class Attendance(models.Model):
#     STATUS_CHOICES = [
#         ('PRESENT', 'Present'),
#         ('ABSENT', 'Absent'),
#     ]

#     student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     class_schedule = models.ForeignKey(ClassSchedule, on_delete=models.CASCADE)
#     status = models.CharField(max_length=10, choices=STATUS_CHOICES)
#     date = models.DateField(default=timezone.now)

#     class Meta:
#         unique_together = ('student', 'class_schedule', 'date')

#     def __str__(self):
#         return f"{self.student.username} - {self.status} on {self.date} for {self.class_schedule.course.name}"




















# from django.db import models
# from django.conf import settings
# from instructorcalendar.models import ClassSchedule
# from django.utils import timezone

# class Attendance(models.Model):
#     STATUS_CHOICES = [
#         ('PRESENT', 'Present'),
#         ('ABSENT', 'Absent'),
#     ]

#     student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     class_schedule = models.ForeignKey(ClassSchedule, on_delete=models.CASCADE)
#     status = models.CharField(max_length=10, choices=STATUS_CHOICES)
#     date = models.DateField(default=timezone.now)

#     class Meta:
#         unique_together = ('student', 'class_schedule', 'date')

#     def __str__(self):
#         return f"{self.student.username} - {self.status} on {self.date} for {self.class_schedule.course.name}"
