from django.urls import path
from .views import ClassScheduleView, InstructorCoursesView, ReminderView, EventView, MonthlyOverviewView

urlpatterns = [
    path('courses/', InstructorCoursesView.as_view(), name='instructor-courses'),
    path('class-schedule/', ClassScheduleView.as_view(), name='class-schedule-list'),
    path('class-schedule/<int:pk>/', ClassScheduleView.as_view(), name='class-schedule-detail'),
    path('reminders/', ReminderView.as_view(), name='reminders-list'),
    path('reminders/<int:pk>/', ReminderView.as_view(), name='reminders-detail'),
    path('events/', EventView.as_view(), name='events-list'),
    path('events/<int:pk>/', EventView.as_view(), name='events-detail'),
    path('monthly-overview/', MonthlyOverviewView.as_view(), name='monthly-overview'),
]









# # instructor_dashboard/urls.py
# from django.urls import path
# from .views import ClassScheduleView, InstructorCoursesView, ReminderView, EventView, MonthlyOverviewView

# urlpatterns = [
#     path('courses/', InstructorCoursesView.as_view(), name='instructor-courses'),
#     path('class-schedule/', ClassScheduleView.as_view(), name='class-schedule-list'),
#     path('class-schedule/<int:pk>/', ClassScheduleView.as_view(), name='class-schedule-detail'),
#     path('reminders/', ReminderView.as_view(), name='reminders-list'),
#     path('reminders/<int:pk>/', ReminderView.as_view(), name='reminders-detail'),
#     path('events/', EventView.as_view(), name='events-list'),
#     path('events/<int:pk>/', EventView.as_view(), name='events-detail'),
#     path('monthly-overview/', MonthlyOverviewView.as_view(), name='monthly-overview'),
# ]










# from django.urls import path
# from .views import ClassScheduleView, InstructorCoursesView, AttendanceView, ReminderView, EventView, MonthlyOverviewView

# urlpatterns = [
#     path('courses/', InstructorCoursesView.as_view(), name='instructor-courses'),
#     path('class-schedule/', ClassScheduleView.as_view(), name='class-schedule-list'),
#     path('class-schedule/<int:pk>/', ClassScheduleView.as_view(), name='class-schedule-detail'),
#     path('attendance/', AttendanceView.as_view(), name='attendance-list'),
#     path('attendance/<int:pk>/', AttendanceView.as_view(), name='attendance-detail'),
#     path('reminders/', ReminderView.as_view(), name='reminders-list'),
#     path('reminders/<int:pk>/', ReminderView.as_view(), name='reminders-detail'),
#     path('events/', EventView.as_view(), name='events-list'),
#     path('events/<int:pk>/', EventView.as_view(), name='events-detail'),
#     path('monthly-overview/', MonthlyOverviewView.as_view(), name='monthly-overview'),
# ]










# from django.urls import path
# from .views import ClassScheduleView, InstructorCoursesView, AttendanceView, ReminderView, EventView, MonthlyOverviewView

# urlpatterns = [
#     path('courses/', InstructorCoursesView.as_view(), name='instructor-courses'),
#     path('class-schedule/', ClassScheduleView.as_view(), name='class-schedule-list'),
#     path('class-schedule/<int:pk>/', ClassScheduleView.as_view(), name='class-schedule-detail'),
#      path('attendance/', AttendanceView.as_view(), name='attendance-list'),
#     path('attendance/<int:pk>/', AttendanceView.as_view(), name='attendance-detail'),
#     path('reminders/', ReminderView.as_view(), name='reminders-list'),
#     path('reminders/<int:pk>/', ReminderView.as_view(), name='reminders-detail'),
#     path('events/', EventView.as_view(), name='events-list'),
#     path('events/<int:pk>/', EventView.as_view(), name='events-detail'),
#     path('monthly-overview/', MonthlyOverviewView.as_view(), name='monthly-overview'),
# ]
















