from rest_framework import status as http_status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from instructorcalendar.models import ClassSchedule
from .models import Attendance
from .serializers import AttendanceSerializer
from datetime import datetime

class AttendanceView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Only instructors can mark attendance
        if request.user.role != 'instructor':
            return Response({"error": "Only instructors can mark attendance"}, status=http_status.HTTP_403_FORBIDDEN)

        class_schedule_id = request.data.get('class_schedule')
        student_id = request.data.get('student')
        attendance_status = request.data.get('status')

        # Validate if class_schedule exists and the instructor is authorized
        class_schedule = get_object_or_404(ClassSchedule, id=class_schedule_id, instructor=request.user)

        # Ensure attendance is marked only on the scheduled date and today's date
        if class_schedule.date != datetime.now().date():
            return Response({"error": "Attendance can only be marked on the scheduled class date."}, status=http_status.HTTP_400_BAD_REQUEST)

        # Ensure the student exists and attendance hasn't been marked yet for this date and schedule
        existing_attendance = Attendance.objects.filter(student=student_id, class_schedule=class_schedule, date=datetime.now().date()).exists()
        if existing_attendance:
            return Response({"error": "Attendance has already been marked for this student and class schedule."}, status=http_status.HTTP_400_BAD_REQUEST)

        attendance_data = {
            'student': student_id,
            'class_schedule': class_schedule_id,
            'status': attendance_status
        }

        # Validate and save attendance
        serializer = AttendanceSerializer(data=attendance_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=http_status.HTTP_201_CREATED)
        return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        # Admins can view all attendance records
        if request.user.is_staff:
            attendances = Attendance.objects.all()
        # Instructors can view records of classes they teach
        elif request.user.role == 'instructor':
            attendances = Attendance.objects.filter(class_schedule__instructor=request.user)
        # Students can view their own attendance
        else:
            attendances = Attendance.objects.filter(student=request.user)

        serializer = AttendanceSerializer(attendances, many=True)
        return Response(serializer.data)

    def put(self, request, pk):
        # Only instructors can update attendance records they created
        attendance = get_object_or_404(Attendance, id=pk, class_schedule__instructor=request.user)

        # Ensure attendance can only be updated for today's date
        if attendance.class_schedule.date != datetime.now().date():
            return Response({"error": "Attendance can only be updated on the scheduled class date."}, status=http_status.HTTP_400_BAD_REQUEST)

        serializer = AttendanceSerializer(attendance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        # Only instructors can delete attendance records they created
        attendance = get_object_or_404(Attendance, id=pk, class_schedule__instructor=request.user)
        # Ensure attendance can only be deleted for today's date
        if attendance.class_schedule.date != datetime.now().date():
            return Response({"error": "Attendance can only be deleted on the scheduled class date."}, status=http_status.HTTP_400_BAD_REQUEST)

        attendance.delete()
        return Response(status=http_status.HTTP_204_NO_CONTENT)













# from rest_framework import status as http_status
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from django.shortcuts import get_object_or_404
# from instructorcalendar.models import ClassSchedule
# from .models import Attendance
# from .serializers import AttendanceSerializer
# from datetime import datetime

# class AttendanceView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         # Only instructors can mark attendance
#         if request.user.role != 'instructor':
#             return Response({"error": "Only instructors can mark attendance"}, status=http_status.HTTP_403_FORBIDDEN)

#         class_schedule_id = request.data.get('class_schedule')
#         student_id = request.data.get('student')
#         attendance_status = request.data.get('status')

#         # Validate if class_schedule exists and the instructor is authorized
#         class_schedule = get_object_or_404(ClassSchedule, id=class_schedule_id, instructor=request.user)

#         # Ensure attendance is marked only on the scheduled date and today's date
#         if class_schedule.date != datetime.now().date():
#             return Response({"error": "Attendance can only be marked on the scheduled class date."}, status=http_status.HTTP_400_BAD_REQUEST)

#         # Ensure the student exists and attendance hasn't been marked yet for this date and schedule
#         existing_attendance = Attendance.objects.filter(student=student_id, class_schedule=class_schedule, date=datetime.now().date()).exists()
#         if existing_attendance:
#             return Response({"error": "Attendance has already been marked for this student and class schedule."}, status=http_status.HTTP_400_BAD_REQUEST)

#         attendance_data = {
#             'student': student_id,
#             'class_schedule': class_schedule_id,
#             'status': attendance_status
#         }

#         # Validate and save attendance
#         serializer = AttendanceSerializer(data=attendance_data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=http_status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)

#     def get(self, request):
#         # Admins can view all attendance records
#         if request.user.is_staff:
#             attendances = Attendance.objects.all()
#         # Instructors can view records of classes they teach
#         elif request.user.role == 'instructor':
#             attendances = Attendance.objects.filter(class_schedule__instructor=request.user)
#         # Students can view their own attendance
#         else:
#             attendances = Attendance.objects.filter(student=request.user)

#         serializer = AttendanceSerializer(attendances, many=True)
#         return Response(serializer.data)

#     def put(self, request, pk):
#         # Only instructors can update attendance records they created
#         attendance = get_object_or_404(Attendance, id=pk, class_schedule__instructor=request.user)

#         # Ensure attendance can only be updated for today's date
#         if attendance.class_schedule.date != datetime.now().date():
#             return Response({"error": "Attendance can only be updated on the scheduled class date."}, status=http_status.HTTP_400_BAD_REQUEST)

#         serializer = AttendanceSerializer(attendance, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         # Only instructors can delete attendance records they created
#         attendance = get_object_or_404(Attendance, id=pk, class_schedule__instructor=request.user)
#         # Ensure attendance can only be deleted for today's date
#         if attendance.class_schedule.date != datetime.now().date():
#             return Response({"error": "Attendance can only be deleted on the scheduled class date."}, status=http_status.HTTP_400_BAD_REQUEST)

#         attendance.delete()
#         return Response(status=http_status.HTTP_204_NO_CONTENT)


















# from rest_framework import status as http_status
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from django.shortcuts import get_object_or_404
# from instructorcalendar.models import ClassSchedule
# from .models import Attendance
# from .serializers import AttendanceSerializer
# from datetime import datetime

# class AttendanceView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         # Only instructors can mark attendance
#         if request.user.role != 'instructor':
#             return Response({"error": "Only instructors can mark attendance"}, status=http_status.HTTP_403_FORBIDDEN)

#         class_schedule_id = request.data.get('class_schedule')
#         student_id = request.data.get('student')
#         attendance_status = request.data.get('status')

#         # Validate if class_schedule exists and the instructor is authorized
#         class_schedule = get_object_or_404(ClassSchedule, id=class_schedule_id, instructor=request.user)

#         # Ensure the class is scheduled for today's date
#         if class_schedule.date != datetime.now().date():
#             return Response({"error": "Attendance can only be marked on the scheduled date"}, status=http_status.HTTP_400_BAD_REQUEST)

#         # Ensure the student exists and attendance hasn't been marked yet for this date and schedule
#         existing_attendance = Attendance.objects.filter(student=student_id, class_schedule=class_schedule, date=datetime.now().date()).exists()
#         if existing_attendance:
#             return Response({"error": "Attendance has already been marked for this student and class schedule."}, status=http_status.HTTP_400_BAD_REQUEST)

#         attendance_data = {
#             'student': student_id,
#             'class_schedule': class_schedule_id,
#             'status': attendance_status
#         }

#         # Validate and save attendance
#         serializer = AttendanceSerializer(data=attendance_data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=http_status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)

#     def get(self, request):
#         # Admins can view all attendance records
#         if request.user.is_staff:
#             attendances = Attendance.objects.all()
#         # Instructors can view records of classes they teach
#         elif request.user.role == 'instructor':
#             attendances = Attendance.objects.filter(class_schedule__instructor=request.user)
#         # Students can view their own attendance
#         else:
#             attendances = Attendance.objects.filter(student=request.user)

#         serializer = AttendanceSerializer(attendances, many=True)
#         return Response(serializer.data)

#     # Instructors update attendance for a specific record
#     def put(self, request, pk):
#         attendance = get_object_or_404(Attendance, id=pk, class_schedule__instructor=request.user)
#         serializer = AttendanceSerializer(attendance, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)

#     # Instructors delete an attendance record
#     def delete(self, request, pk):
#         attendance = get_object_or_404(Attendance, id=pk, class_schedule__instructor=request.user)
#         attendance.delete()
#         return Response(status=http_status.HTTP_204_NO_CONTENT)




















# from rest_framework import status as http_status
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from django.shortcuts import get_object_or_404
# from instructorcalendar.models import ClassSchedule
# from .models import Attendance
# from .serializers import AttendanceSerializer
# from datetime import datetime

# class AttendanceView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         class_schedule_id = request.data.get('class_schedule')
#         student_id = request.data.get('student')
#         attendance_status = request.data.get('status')
        
#         # Validate if class_schedule exists and the instructor is authorized
#         class_schedule = get_object_or_404(ClassSchedule, id=class_schedule_id, instructor=request.user)

#         # Ensure the class is scheduled for today's date
#         if class_schedule.date != datetime.now().date():
#             return Response({"error": "Attendance can only be marked on the scheduled date"}, status=http_status.HTTP_400_BAD_REQUEST)

#         # Ensure the student exists and attendance hasn't been marked yet for this date and schedule
#         existing_attendance = Attendance.objects.filter(student=student_id, class_schedule=class_schedule, date=datetime.now().date()).exists()
#         if existing_attendance:
#             return Response({"error": "Attendance has already been marked for this student and class schedule."}, status=http_status.HTTP_400_BAD_REQUEST)

#         attendance_data = {
#             'student': student_id,
#             'class_schedule': class_schedule_id,
#             'status': attendance_status
#         }

#         # Validate and save attendance
#         serializer = AttendanceSerializer(data=attendance_data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=http_status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)

#     def get(self, request):
#         # Checking role instead of is_instructor
#         if request.user.role == 'instructor':  # Assuming 'role' field exists on user model
#             attendances = Attendance.objects.filter(class_schedule__instructor=request.user)
#         else:
#             attendances = Attendance.objects.filter(student=request.user)
#         serializer = AttendanceSerializer(attendances, many=True)
#         return Response(serializer.data)

#     # Instructor updates attendance for a specific record
#     def put(self, request, pk):
#         attendance = get_object_or_404(Attendance, id=pk, class_schedule__instructor=request.user)
#         serializer = AttendanceSerializer(attendance, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)

#     # Instructor deletes an attendance record
#     def delete(self, request, pk):
#         attendance = get_object_or_404(Attendance, id=pk, class_schedule__instructor=request.user)
#         attendance.delete()
#         return Response(status=http_status.HTTP_204_NO_CONTENT)
