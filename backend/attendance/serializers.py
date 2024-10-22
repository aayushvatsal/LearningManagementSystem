from rest_framework import serializers
from .models import Attendance

class AttendanceSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.username', read_only=True)
    class_schedule_info = serializers.CharField(source='class_schedule.course.name', read_only=True)
    scheduled_class_date = serializers.DateField(source='class_schedule.date', read_only=True)
    class_time = serializers.CharField(source='class_schedule.time', read_only=True)  # Added class time
    date = serializers.SerializerMethodField()

    class Meta:
        model = Attendance
        fields = ['id', 'student', 'student_name', 'class_schedule', 'class_schedule_info', 'status', 'date', 'scheduled_class_date', 'class_time']  # Added 'class_time'

    def get_date(self, obj):
        # Ensure only the date part is returned
        return obj.date.strftime('%Y-%m-%d')



















# from rest_framework import serializers
# from .models import Attendance

# class AttendanceSerializer(serializers.ModelSerializer):
#     student_name = serializers.CharField(source='student.username', read_only=True)
#     class_schedule_info = serializers.CharField(source='class_schedule.course.name', read_only=True)
#     scheduled_class_date = serializers.DateField(source='class_schedule.date', read_only=True)  # Added this to include the scheduled date of the class
#     date = serializers.SerializerMethodField()

#     class Meta:
#         model = Attendance
#         fields = ['id', 'student', 'student_name', 'class_schedule', 'class_schedule_info', 'status', 'date', 'scheduled_class_date']  # Added 'scheduled_class_date'

#     def get_date(self, obj):
#         # Ensure only the date part is returned
#         return obj.date.strftime('%Y-%m-%d')











# from rest_framework import serializers
# from .models import Attendance

# class AttendanceSerializer(serializers.ModelSerializer):
#     student_name = serializers.CharField(source='student.username', read_only=True)
#     class_schedule_info = serializers.CharField(source='class_schedule.course.name', read_only=True)
#     date = serializers.SerializerMethodField()  # Use SerializerMethodField to handle the date conversion

#     class Meta:
#         model = Attendance
#         fields = ['id', 'student', 'student_name', 'class_schedule', 'class_schedule_info', 'status', 'date']

#     def get_date(self, obj):
#         # Ensure only the date part is returned
#         return obj.date.strftime('%Y-%m-%d')














# from rest_framework import serializers
# from .models import Attendance

# class AttendanceSerializer(serializers.ModelSerializer):
#     student_name = serializers.CharField(source='student.username', read_only=True)
#     class_schedule_info = serializers.CharField(source='class_schedule.course.name', read_only=True)
#     date = serializers.SerializerMethodField()  # Use SerializerMethodField to handle the date conversion

#     class Meta:
#         model = Attendance
#         fields = ['id', 'student', 'student_name', 'class_schedule', 'class_schedule_info', 'status', 'date']

#     def get_date(self, obj):
#         # Ensure only the date part is returned
#         return obj.date.strftime('%Y-%m-%d')
