from django.db import models
from django.conf import settings
from authentication.models import Course

class ClassSchedule(models.Model):
    instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='instructor_class_schedules')
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    students = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='student_class_schedules')
    date = models.DateField()
    time = models.TimeField()

    def __str__(self):
        return f"{self.course.name} on {self.date} at {self.time}"

class Reminder(models.Model):
    instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='instructor_reminders')
    title = models.CharField(max_length=100)
    due_date = models.DateField()
    students = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='student_reminders')

    def __str__(self):
        return f"Reminder: {self.title}, Due: {self.due_date}"

class Event(models.Model):
    instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='instructor_events')
    event_name = models.CharField(max_length=100)
    event_date = models.DateField()
    event_time = models.TimeField()
    students = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='student_events')

    def __str__(self):
        return f"Event: {self.event_name}, Date: {self.event_date}, Time: {self.event_time}"





















# # instructor_dashboard/models.py
# from django.db import models
# from django.conf import settings
# from authentication.models import Course  # Assuming Course is defined in your authentication app

# class ClassSchedule(models.Model):
#     instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     course = models.ForeignKey(Course, on_delete=models.CASCADE)
#     date = models.DateField()
#     time = models.TimeField()

#     def __str__(self):
#         return f"{self.course.name} on {self.date} at {self.time}"

# class Reminder(models.Model):
#     instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     title = models.CharField(max_length=100)
#     due_date = models.DateField()

#     def __str__(self):
#         return f"Reminder: {self.title}, Due: {self.due_date}"

# class Event(models.Model):
#     instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     event_name = models.CharField(max_length=100)
#     event_date = models.DateField()
#     event_time = models.TimeField()

#     def __str__(self):
#         return f"Event: {self.event_name}, Date: {self.event_date}, Time: {self.event_time}"

















# from django.db import models
# from django.conf import settings
# from authentication.models import CustomUser, Course

# # Model to store class schedules
# class ClassSchedule(models.Model):
#     instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     course = models.ForeignKey(Course, on_delete=models.CASCADE)
#     date = models.DateField()
#     time = models.TimeField()

#     def __str__(self):
#         return f"Class for {self.course.name} on {self.date} at {self.time}"

# # Model to store attendance for students
# class Attendance(models.Model):
#     student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     class_schedule = models.ForeignKey(ClassSchedule, on_delete=models.CASCADE)
#     status = models.CharField(max_length=10, choices=[('Present', 'Present'), ('Absent', 'Absent')], default='Absent')
#     date = models.DateField()

#     def __str__(self):
#         return f"Attendance for {self.student.username} on {self.class_schedule.date}: {self.status}"

# # Model to store reminders for instructors
# class Reminder(models.Model):
#     instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     title = models.CharField(max_length=100)
#     due_date = models.DateField()

#     def __str__(self):
#         return f"Reminder: {self.title}, Due: {self.due_date}"

# # Model to store events
# class Event(models.Model):
#     instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     event_name = models.CharField(max_length=100)
#     event_date = models.DateField()
#     event_time = models.TimeField()

#     def __str__(self):
#         return f"Event: {self.event_name} on {self.event_date} at {self.event_time}"














# from django.db import models
# from django.conf import settings
# from authentication.models import CustomUser, Course

# # Model to store class schedules
# class ClassSchedule(models.Model):
#     instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     course = models.ForeignKey(Course, on_delete=models.CASCADE)
#     date = models.DateField()
#     time = models.TimeField()

#     def __str__(self):
#         return f"Class for {self.course.name} on {self.date} at {self.time}"

# # Model to store attendance for students
# class Attendance(models.Model):
#     student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
#     class_schedule = models.ForeignKey(ClassSchedule, on_delete=models.CASCADE)
#     status = models.CharField(max_length=10, choices=[('Present', 'Present'), ('Absent', 'Absent')], default='Absent')
#     date = models.DateField()

#     def __str__(self):
#         return f"Attendance for {self.student.username} on {self.class_schedule.date}: {self.status}"

# # Model to store reminders for instructors
# class Reminder(models.Model):
#     instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     title = models.CharField(max_length=100)
#     due_date = models.DateField()

#     def __str__(self):
#         return f"Reminder: {self.title}, Due: {self.due_date}"

# # Model to store events
# class Event(models.Model):
#     instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     event_name = models.CharField(max_length=100)
#     event_date = models.DateField()
#     event_time = models.TimeField()

#     def __str__(self):
#         return f"Event: {self.event_name} on {self.event_date} at {self.event_time}"















