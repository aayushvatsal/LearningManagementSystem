from rest_framework import serializers
from .models import ClassSchedule, Reminder, Event
from authentication.models import Course

class ClassScheduleSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)
    students = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = ClassSchedule
        fields = ['id', 'course', 'course_name', 'date', 'time', 'students']

class ReminderSerializer(serializers.ModelSerializer):
    students = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Reminder
        fields = ['id', 'title', 'due_date', 'students']

class EventSerializer(serializers.ModelSerializer):
    students = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'event_name', 'event_date', 'event_time', 'students']











# # instructor_dashboard/serializers.py
# from rest_framework import serializers
# from .models import ClassSchedule, Reminder, Event
# from authentication.models import Course  # Assuming you have a Course model

# class ClassScheduleSerializer(serializers.ModelSerializer):
#     course_name = serializers.CharField(source='course.name', read_only=True)  # This will include the course name

#     class Meta:
#         model = ClassSchedule
#         fields = ['id', 'course', 'course_name', 'date', 'time']  # Include both course and course_name

# class ReminderSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Reminder
#         fields = ['id', 'title', 'due_date']

# class EventSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Event
#         fields = ['id', 'event_name', 'event_date', 'event_time']








# from rest_framework import serializers
# from .models import ClassSchedule, Reminder, Event, Attendance

# class ClassScheduleSerializer(serializers.ModelSerializer):
#     course_name = serializers.CharField(source='course.name', read_only=True)

#     class Meta:
#         model = ClassSchedule
#         fields = ['id', 'course', 'course_name', 'date', 'time']

# class ReminderSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Reminder
#         fields = ['id', 'title', 'due_date']

# class EventSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Event
#         fields = ['id', 'event_name', 'event_date', 'event_time']

# class AttendanceSerializer(serializers.ModelSerializer):
#     student_name = serializers.CharField(source='student.username', read_only=True)
#     course_name = serializers.CharField(source='class_schedule.course.name', read_only=True)
#     instructor_name = serializers.CharField(source='class_schedule.instructor.username', read_only=True)

#     class Meta:
#         model = Attendance
#         fields = ['id', 'student', 'student_name', 'class_schedule', 'course_name', 'instructor_name', 'status', 'date']











# from rest_framework import serializers
# from .models import ClassSchedule, Reminder, Event, Attendance

# class ClassScheduleSerializer(serializers.ModelSerializer):
#     course_name = serializers.CharField(source='course.name', read_only=True)

#     class Meta:
#         model = ClassSchedule
#         fields = ['id', 'course', 'course_name', 'date', 'time']

# class ReminderSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Reminder
#         fields = ['id', 'title', 'due_date']

# class EventSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Event
#         fields = ['id', 'event_name', 'event_date', 'event_time']

# class AttendanceSerializer(serializers.ModelSerializer):
#     student_name = serializers.CharField(source='student.username', read_only=True)
#     course_name = serializers.CharField(source='class_schedule.course.name', read_only=True)

#     class Meta:
#         model = Attendance
#         fields = ['id', 'student', 'student_name', 'class_schedule', 'course_name', 'status', 'date']













