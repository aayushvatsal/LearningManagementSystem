from django.contrib import admin
from .models import Assignment, AssignmentSubmission

@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'instructor', 'due_date']
    search_fields = ['title', 'instructor__username']
    list_filter = ['due_date']
    ordering = ['due_date']
    date_hierarchy = 'due_date'


@admin.register(AssignmentSubmission)
class AssignmentSubmissionAdmin(admin.ModelAdmin):
    list_display = ['id', 'student', 'assignment', 'submitted_on', 'grade']
    search_fields = ['student__username', 'assignment__title']
    list_filter = ['submitted_on', 'grade']
    ordering = ['submitted_on']
    date_hierarchy = 'submitted_on'









# from django.contrib import admin
# from .models import Assignment, AssignmentSubmission

# @admin.register(Assignment)
# class AssignmentAdmin(admin.ModelAdmin):
#     list_display = ['id', 'title', 'instructor', 'due_date']
#     search_fields = ['title', 'instructor__username']
#     list_filter = ['due_date']
#     ordering = ['due_date']
#     date_hierarchy = 'due_date'

# @admin.register(AssignmentSubmission)
# class AssignmentSubmissionAdmin(admin.ModelAdmin):
#     list_display = ['id', 'student', 'assignment', 'submitted_on', 'grade']
#     search_fields = ['student__username', 'assignment__title']
#     list_filter = ['submitted_on', 'grade']
#     ordering = ['submitted_on']
#     date_hierarchy = 'submitted_on'
