from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ClassSchedule, Reminder, Event
from .serializers import ClassScheduleSerializer, ReminderSerializer, EventSerializer
from authentication.models import Course
from django.shortcuts import get_object_or_404
from datetime import datetime

class InstructorCoursesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        courses = Course.objects.filter(instructor=request.user)
        courses_data = [{"id": course.id, "name": course.name} for course in courses]
        return Response(courses_data, status=status.HTTP_200_OK)

class ClassScheduleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.role == 'instructor':
            return Response({"error": "Only instructors can schedule classes."}, status=status.HTTP_403_FORBIDDEN)
        
        course_id = request.data.get('course')
        date = request.data.get('date')
        time = request.data.get('time')
        students_ids = request.data.get('students', [])

        course = get_object_or_404(Course, id=course_id, instructor=request.user)

        serializer = ClassScheduleSerializer(data=request.data)
        if serializer.is_valid():
            class_schedule = serializer.save(instructor=request.user, course=course)
            class_schedule.students.set(students_ids)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        if request.user.role == 'instructor':
            schedules = ClassSchedule.objects.filter(instructor=request.user)
        elif request.user.role == 'user':
            schedules = request.user.student_class_schedules.all()
        else:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        serializer = ClassScheduleSerializer(schedules, many=True)
        return Response(serializer.data)

    def put(self, request, pk):
        schedule = get_object_or_404(ClassSchedule, pk=pk, instructor=request.user)
        serializer = ClassScheduleSerializer(schedule, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        schedule = get_object_or_404(ClassSchedule, pk=pk, instructor=request.user)
        schedule.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ReminderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != 'instructor':
            return Response({"error": "Only instructors can create reminders."}, status=status.HTTP_403_FORBIDDEN)

        serializer = ReminderSerializer(data=request.data)
        if serializer.is_valid():
            reminder = serializer.save(instructor=request.user)
            reminder.students.set(request.data.get('students', []))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        if request.user.role == 'instructor':
            reminders = Reminder.objects.filter(instructor=request.user)
        elif request.user.role == 'user':
            reminders = request.user.student_reminders.all()
        else:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        serializer = ReminderSerializer(reminders, many=True)
        return Response(serializer.data)

class EventView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != 'instructor':
            return Response({"error": "Only instructors can create events."}, status=status.HTTP_403_FORBIDDEN)

        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save(instructor=request.user)
            event.students.set(request.data.get('students', []))
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        if request.user.role == 'instructor':
            events = Event.objects.filter(instructor=request.user)
        elif request.user.role == 'user':
            events = request.user.student_events.all()
        else:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

class MonthlyOverviewView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        month = request.query_params.get('month', datetime.now().month)
        year = request.query_params.get('year', datetime.now().year)

        if request.user.role == 'instructor':
            class_schedules = ClassSchedule.objects.filter(instructor=request.user, date__year=year, date__month=month)
            events = Event.objects.filter(instructor=request.user, event_date__year=year, event_date__month=month)
        elif request.user.role == 'user':
            class_schedules = request.user.student_class_schedules.filter(date__year=year, date__month=month)
            events = request.user.student_events.filter(event_date__year=year, event_date__month=month)
        else:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        schedules_data = ClassScheduleSerializer(class_schedules, many=True).data
        events_data = EventSerializer(events, many=True).data

        return Response({
            "class_schedules": schedules_data,
            "events": events_data
        }, status=status.HTTP_200_OK)


















# # instructor_dashboard/views.py
# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from .models import ClassSchedule, Reminder, Event
# from .serializers import ClassScheduleSerializer, ReminderSerializer, EventSerializer
# from authentication.models import Course  # Assuming this model exists
# from django.shortcuts import get_object_or_404
# from datetime import datetime

# # Get Courses where the instructor is assigned
# class InstructorCoursesView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         courses = Course.objects.filter(instructor=request.user)
#         courses_data = [{"id": course.id, "name": course.name} for course in courses]
#         return Response(courses_data, status=status.HTTP_200_OK)

# # Schedule a Class for the course and its users
# class ClassScheduleView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         course_id = request.data.get('course')
#         date = request.data.get('date')
#         time = request.data.get('time')

#         # Validate if the course exists and the instructor is assigned to it
#         course = get_object_or_404(Course, id=course_id, instructor=request.user)

#         # Schedule the class
#         serializer = ClassScheduleSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(instructor=request.user, course=course)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     # Retrieve scheduled classes
#     def get(self, request):
#         schedules = ClassSchedule.objects.filter(instructor=request.user)
#         serializer = ClassScheduleSerializer(schedules, many=True)
#         return Response(serializer.data)

#     # Update scheduled class
#     def put(self, request, pk):
#         schedule = get_object_or_404(ClassSchedule, pk=pk, instructor=request.user)
#         serializer = ClassScheduleSerializer(schedule, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     # Delete a scheduled class
#     def delete(self, request, pk):
#         schedule = get_object_or_404(ClassSchedule, pk=pk, instructor=request.user)
#         schedule.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # Reminder CRUD Operations
# class ReminderView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         reminders = Reminder.objects.filter(instructor=request.user)
#         serializer = ReminderSerializer(reminders, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = ReminderSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(instructor=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, pk):
#         reminder = get_object_or_404(Reminder, pk=pk, instructor=request.user)
#         serializer = ReminderSerializer(reminder, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         reminder = get_object_or_404(Reminder, pk=pk, instructor=request.user)
#         reminder.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # Event CRUD Operations
# class EventView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         events = Event.objects.filter(instructor=request.user)
#         serializer = EventSerializer(events, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = EventSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(instructor=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, pk):
#         event = get_object_or_404(Event, pk=pk, instructor=request.user)
#         serializer = EventSerializer(event, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         event = get_object_or_404(Event, pk=pk, instructor=request.user)
#         event.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # Monthly Overview: ClassSchedules and Events
# class MonthlyOverviewView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         month = request.query_params.get('month', datetime.now().month)
#         year = request.query_params.get('year', datetime.now().year)

#         # Filter schedules and events for the given month and year
#         class_schedules = ClassSchedule.objects.filter(instructor=request.user, date__year=year, date__month=month)
#         events = Event.objects.filter(instructor=request.user, event_date__year=year, event_date__month=month)

#         schedules_data = ClassScheduleSerializer(class_schedules, many=True).data
#         events_data = EventSerializer(events, many=True).data

#         return Response({
#             "class_schedules": schedules_data,
#             "events": events_data
#         }, status=status.HTTP_200_OK)










# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from django.shortcuts import get_object_or_404
# from datetime import datetime
# from .models import ClassSchedule, Reminder, Event, Attendance
# from .serializers import ClassScheduleSerializer, ReminderSerializer, EventSerializer, AttendanceSerializer
# from authentication.models import CustomUser, Course

# # Get Courses where the instructor is assigned
# class InstructorCoursesView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         courses = Course.objects.filter(instructor=request.user)
#         courses_data = [{"id": course.id, "name": course.name} for course in courses]
#         return Response(courses_data, status=status.HTTP_200_OK)

# # Schedule a Class for the course
# class ClassScheduleView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         course_id = request.data.get('course')
#         date = request.data.get('date')
#         time = request.data.get('time')

#         course = get_object_or_404(Course, id=course_id, instructor=request.user)

#         serializer = ClassScheduleSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(instructor=request.user, course=course)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def get(self, request):
#         schedules = ClassSchedule.objects.filter(instructor=request.user)
#         serializer = ClassScheduleSerializer(schedules, many=True)
#         return Response(serializer.data)

#     def put(self, request, pk):
#         schedule = get_object_or_404(ClassSchedule, pk=pk, instructor=request.user)
#         serializer = ClassScheduleSerializer(schedule, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         schedule = get_object_or_404(ClassSchedule, pk=pk, instructor=request.user)
#         schedule.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # Attendance management with correct GET and POST response
# class AttendanceView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         # Check if the user is an instructor or a student
#         if request.user.is_staff:  # If the user is an instructor
#             attendances = Attendance.objects.filter(class_schedule__instructor=request.user)
#         else:  # If the user is a student
#             attendances = Attendance.objects.filter(student=request.user)

#         # If records exist, return them; otherwise, return an empty array
#         if attendances.exists():
#             response_data = []
#             for attendance in attendances:
#                 attendance_data = {
#                     "id": attendance.id,
#                     "student_name": attendance.student.username,
#                     "class_schedule": attendance.class_schedule.id,
#                     "course_name": attendance.class_schedule.course.name,
#                     "instructor_name": attendance.class_schedule.instructor.username,  # Include the instructor's name
#                     "status": attendance.status,
#                     "date": attendance.date
#                 }
#                 response_data.append(attendance_data)
#             return Response(response_data, status=status.HTTP_200_OK)
#         else:
#             return Response([], status=status.HTTP_200_OK)  # Return empty array if no records found

#     def post(self, request):
#         attendances_data = request.data
#         response_data = []

#         for attendance_data in attendances_data:
#             schedule_id = attendance_data.get('class_schedule')
#             student_id = attendance_data.get('student')
#             attendance_status = attendance_data.get('status')

#             schedule = get_object_or_404(ClassSchedule, id=schedule_id)
#             student = get_object_or_404(CustomUser, id=student_id)

#             # Create or update attendance
#             attendance, created = Attendance.objects.get_or_create(
#                 class_schedule=schedule, student=student,
#                 defaults={'status': attendance_status, 'date': schedule.date}
#             )
#             if not created:
#                 attendance.status = attendance_status
#                 attendance.save()

#             serializer = AttendanceSerializer(attendance)
#             response_data.append(serializer.data)

#         return Response(response_data, status=status.HTTP_201_CREATED)

#     def put(self, request, pk):
#         attendance = get_object_or_404(Attendance, pk=pk)
#         serializer = AttendanceSerializer(attendance, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         attendance = get_object_or_404(Attendance, pk=pk)
#         attendance.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # Reminder CRUD Operations
# class ReminderView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         reminders = Reminder.objects.filter(instructor=request.user)
#         serializer = ReminderSerializer(reminders, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = ReminderSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(instructor=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, pk):
#         reminder = get_object_or_404(Reminder, pk=pk, instructor=request.user)
#         serializer = ReminderSerializer(reminder, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         reminder = get_object_or_404(Reminder, pk=pk, instructor=request.user)
#         reminder.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # Event CRUD Operations
# class EventView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         events = Event.objects.filter(instructor=request.user)
#         serializer = EventSerializer(events, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = EventSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(instructor=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, pk):
#         event = get_object_or_404(Event, pk=pk, instructor=request.user)
#         serializer = EventSerializer(event, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         event = get_object_or_404(Event, pk=pk, instructor=request.user)
#         event.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # Monthly Overview: ClassSchedules and Events
# class MonthlyOverviewView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         month = request.query_params.get('month', datetime.now().month)
#         year = request.query_params.get('year', datetime.now().year)

#         class_schedules = ClassSchedule.objects.filter(instructor=request.user, date__year=year, date__month=month)
#         events = Event.objects.filter(instructor=request.user, event_date__year=year, event_date__month=month)

#         schedules_data = ClassScheduleSerializer(class_schedules, many=True).data
#         events_data = EventSerializer(events, many=True).data

#         return Response({
#             "class_schedules": schedules_data,
#             "events": events_data
#         }, status=status.HTTP_200_OK)























# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from django.shortcuts import get_object_or_404
# from datetime import datetime
# from .models import ClassSchedule, Reminder, Event, Attendance
# from .serializers import ClassScheduleSerializer, ReminderSerializer, EventSerializer, AttendanceSerializer
# from authentication.models import CustomUser, Course

# # Get Courses where the instructor is assigned
# class InstructorCoursesView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         courses = Course.objects.filter(instructor=request.user)
#         courses_data = [{"id": course.id, "name": course.name} for course in courses]
#         return Response(courses_data, status=status.HTTP_200_OK)

# # Schedule a Class for the course
# class ClassScheduleView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         course_id = request.data.get('course')
#         date = request.data.get('date')
#         time = request.data.get('time')

#         course = get_object_or_404(Course, id=course_id, instructor=request.user)

#         serializer = ClassScheduleSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(instructor=request.user, course=course)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def get(self, request):
#         schedules = ClassSchedule.objects.filter(instructor=request.user)
#         serializer = ClassScheduleSerializer(schedules, many=True)
#         return Response(serializer.data)

#     def put(self, request, pk):
#         schedule = get_object_or_404(ClassSchedule, pk=pk, instructor=request.user)
#         serializer = ClassScheduleSerializer(schedule, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         schedule = get_object_or_404(ClassSchedule, pk=pk, instructor=request.user)
#         schedule.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # Attendance management with correct GET method for instructor and student
# class AttendanceView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         # Check if the user is an instructor or a student
#         if request.user.is_staff:  # If the user is an instructor
#             attendances = Attendance.objects.filter(class_schedule__instructor=request.user)
#         else:  # If the user is a student
#             attendances = Attendance.objects.filter(student=request.user)

#         # If records exist, return them; otherwise, return a 404 response
#         if attendances.exists():
#             serializer = AttendanceSerializer(attendances, many=True)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response({"message": "No attendance records found."}, status=status.HTTP_404_NOT_FOUND)

#     def post(self, request):
#         attendances_data = request.data
#         response_data = []

#         for attendance_data in attendances_data:
#             schedule_id = attendance_data.get('class_schedule')
#             student_id = attendance_data.get('student')
#             attendance_status = attendance_data.get('status')

#             schedule = get_object_or_404(ClassSchedule, id=schedule_id)
#             student = get_object_or_404(CustomUser, id=student_id)

#             # Create or update attendance
#             attendance, created = Attendance.objects.get_or_create(
#                 class_schedule=schedule, student=student,
#                 defaults={'status': attendance_status, 'date': schedule.date}
#             )
#             if not created:
#                 attendance.status = attendance_status
#                 attendance.save()

#             serializer = AttendanceSerializer(attendance)
#             response_data.append(serializer.data)

#         return Response(response_data, status=status.HTTP_201_CREATED)

#     def put(self, request, pk):
#         attendance = get_object_or_404(Attendance, pk=pk)
#         serializer = AttendanceSerializer(attendance, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         attendance = get_object_or_404(Attendance, pk=pk)
#         attendance.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # Reminder CRUD Operations
# class ReminderView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         reminders = Reminder.objects.filter(instructor=request.user)
#         serializer = ReminderSerializer(reminders, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = ReminderSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(instructor=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, pk):
#         reminder = get_object_or_404(Reminder, pk=pk, instructor=request.user)
#         serializer = ReminderSerializer(reminder, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         reminder = get_object_or_404(Reminder, pk=pk, instructor=request.user)
#         reminder.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # Event CRUD Operations
# class EventView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         events = Event.objects.filter(instructor=request.user)
#         serializer = EventSerializer(events, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = EventSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(instructor=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, pk):
#         event = get_object_or_404(Event, pk=pk, instructor=request.user)
#         serializer = EventSerializer(event, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         event = get_object_or_404(Event, pk=pk, instructor=request.user)
#         event.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # Monthly Overview: ClassSchedules and Events
# class MonthlyOverviewView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         month = request.query_params.get('month', datetime.now().month)
#         year = request.query_params.get('year', datetime.now().year)

#         class_schedules = ClassSchedule.objects.filter(instructor=request.user, date__year=year, date__month=month)
#         events = Event.objects.filter(instructor=request.user, event_date__year=year, event_date__month=month)

#         schedules_data = ClassScheduleSerializer(class_schedules, many=True).data
#         events_data = EventSerializer(events, many=True).data

#         return Response({
#             "class_schedules": schedules_data,
#             "events": events_data
#         }, status=status.HTTP_200_OK)























# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from django.shortcuts import get_object_or_404
# from datetime import datetime
# from .models import ClassSchedule, Reminder, Event, Attendance
# from .serializers import ClassScheduleSerializer, ReminderSerializer, EventSerializer, AttendanceSerializer
# from authentication.models import CustomUser, Course

# # Get Courses where the instructor is assigned
# class InstructorCoursesView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         courses = Course.objects.filter(instructor=request.user)
#         courses_data = [{"id": course.id, "name": course.name} for course in courses]
#         return Response(courses_data, status=status.HTTP_200_OK)

# # Schedule a Class for the course
# class ClassScheduleView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         course_id = request.data.get('course')
#         date = request.data.get('date')
#         time = request.data.get('time')

#         course = get_object_or_404(Course, id=course_id, instructor=request.user)

#         serializer = ClassScheduleSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(instructor=request.user, course=course)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def get(self, request):
#         schedules = ClassSchedule.objects.filter(instructor=request.user)
#         serializer = ClassScheduleSerializer(schedules, many=True)
#         return Response(serializer.data)

#     def put(self, request, pk):
#         schedule = get_object_or_404(ClassSchedule, pk=pk, instructor=request.user)
#         serializer = ClassScheduleSerializer(schedule, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         schedule = get_object_or_404(ClassSchedule, pk=pk, instructor=request.user)
#         schedule.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # Attendance management with debugging
# class AttendanceView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         # Debug: Log the user and their role (staff or not)
#         print(f"User: {request.user.username}, is_staff: {request.user.is_staff}")
        
#         # Check if the user is an instructor (staff) or student
#         if request.user.is_staff:  # If the user is an instructor
#             attendances = Attendance.objects.filter(class_schedule__instructor=request.user)
#             print(f"Found {attendances.count()} attendance records for instructor {request.user.username}")
#         else:  # If the user is a student
#             attendances = Attendance.objects.filter(student=request.user)
#             print(f"Found {attendances.count()} attendance records for student {request.user.username}")

#         # Check if any records exist
#         if attendances.exists():
#             serializer = AttendanceSerializer(attendances, many=True)
#             print("Returning attendance records.")
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             print("No attendance records found for this user.")
#             return Response({"message": "No attendance records found."}, status=status.HTTP_404_NOT_FOUND)

#     def post(self, request):
#         attendances_data = request.data
#         response_data = []

#         for attendance_data in attendances_data:
#             schedule_id = attendance_data.get('class_schedule')
#             student_id = attendance_data.get('student')
#             attendance_status = attendance_data.get('status')

#             schedule = get_object_or_404(ClassSchedule, id=schedule_id)
#             student = get_object_or_404(CustomUser, id=student_id)

#             attendance, created = Attendance.objects.get_or_create(
#                 class_schedule=schedule, student=student,
#                 defaults={'status': attendance_status, 'date': schedule.date}
#             )
#             if not created:
#                 attendance.status = attendance_status
#                 attendance.save()

#             serializer = AttendanceSerializer(attendance)
#             response_data.append(serializer.data)

#         return Response(response_data, status=status.HTTP_201_CREATED)

#     def put(self, request, pk):
#         attendance = get_object_or_404(Attendance, pk=pk)
#         serializer = AttendanceSerializer(attendance, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         attendance = get_object_or_404(Attendance, pk=pk)
#         attendance.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # Reminder CRUD Operations
# class ReminderView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         reminders = Reminder.objects.filter(instructor=request.user)
#         serializer = ReminderSerializer(reminders, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = ReminderSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(instructor=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, pk):
#         reminder = get_object_or_404(Reminder, pk=pk, instructor=request.user)
#         serializer = ReminderSerializer(reminder, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         reminder = get_object_or_404(Reminder, pk=pk, instructor=request.user)
#         reminder.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # Event CRUD Operations
# class EventView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         events = Event.objects.filter(instructor=request.user)
#         serializer = EventSerializer(events, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = EventSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(instructor=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, pk):
#         event = get_object_or_404(Event, pk=pk, instructor=request.user)
#         serializer = EventSerializer(event, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         event = get_object_or_404(Event, pk=pk, instructor=request.user)
#         event.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # Monthly Overview: ClassSchedules and Events
# class MonthlyOverviewView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         month = request.query_params.get('month', datetime.now().month)
#         year = request.query_params.get('year', datetime.now().year)

#         class_schedules = ClassSchedule.objects.filter(instructor=request.user, date__year=year, date__month=month)
#         events = Event.objects.filter(instructor=request.user, event_date__year=year, event_date__month=month)

#         schedules_data = ClassScheduleSerializer(class_schedules, many=True).data
#         events_data = EventSerializer(events, many=True).data

#         return Response({
#             "class_schedules": schedules_data,
#             "events": events_data
#         }, status=status.HTTP_200_OK)

















