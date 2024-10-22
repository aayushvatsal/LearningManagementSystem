from django.contrib import admin
from .models import Attendance

class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('student', 'class_schedule', 'status', 'date')
    search_fields = ('student__username', 'class_schedule__course__name', 'status')
    list_filter = ('status', 'date')

admin.site.register(Attendance, AttendanceAdmin)













# from django.contrib import admin
# from .models import Attendance

# class AttendanceAdmin(admin.ModelAdmin):
#     list_display = ('student', 'class_schedule', 'status', 'date')
#     search_fields = ('student__username', 'class_schedule__course__name', 'status')
#     list_filter = ('status', 'date')

# admin.site.register(Attendance, AttendanceAdmin)














# from django.contrib import admin
# from .models import Attendance

# class AttendanceAdmin(admin.ModelAdmin):
#     list_display = ('student', 'class_schedule', 'status', 'date')
#     search_fields = ('student__username', 'class_schedule__course__name', 'status')
#     list_filter = ('status', 'date')

# admin.site.register(Attendance, AttendanceAdmin)
