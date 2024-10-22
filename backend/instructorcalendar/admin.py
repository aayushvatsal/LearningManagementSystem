from django.contrib import admin
from .models import ClassSchedule, Reminder, Event

@admin.register(ClassSchedule)
class ClassScheduleAdmin(admin.ModelAdmin):
    list_display = ['instructor', 'course', 'date', 'time']
    filter_horizontal = ('students',)

@admin.register(Reminder)
class ReminderAdmin(admin.ModelAdmin):
    list_display = ['instructor', 'title', 'due_date']
    filter_horizontal = ('students',)

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['instructor', 'event_name', 'event_date', 'event_time']
    filter_horizontal = ('students',)
