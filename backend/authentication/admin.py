from django.contrib import admin
from .models import CustomUser, Course

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'role', 'is_staff', 'is_superuser')
    search_fields = ('email', 'username', 'role')
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('username', 'role')}),
        ('Permissions', {'fields': ('is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'instructor', 'duration')
    search_fields = ('name', 'instructor__username')
    list_filter = ('instructor',)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Course, CourseAdmin)















# from django.contrib import admin
# from .models import CustomUser, Course

# class CustomUserAdmin(admin.ModelAdmin):
#     list_display = ('email', 'username', 'role', 'is_staff', 'is_superuser')
#     search_fields = ('email', 'username', 'role')
#     ordering = ('email',)
#     fieldsets = (
#         (None, {'fields': ('email', 'password')}),
#         ('Personal Info', {'fields': ('username', 'role')}),
#         ('Permissions', {'fields': ('is_staff', 'is_superuser', 'groups', 'user_permissions')}),
#         ('Important dates', {'fields': ('last_login', 'date_joined')}),
#     )

# class CourseAdmin(admin.ModelAdmin):
#     list_display = ('name', 'instructor', 'duration')
#     search_fields = ('name', 'instructor__username')
#     list_filter = ('instructor',)

# admin.site.register(CustomUser, CustomUserAdmin)
# admin.site.register(Course, CourseAdmin)


















# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
# from .models import CustomUser

# class CustomUserAdmin(UserAdmin):
#     list_display = ('email', 'username', 'role', 'is_staff', 'is_superuser')
#     search_fields = ('email', 'username', 'role')
#     ordering = ('email',)
#     fieldsets = (
#         (None, {'fields': ('email', 'password')}),
#         ('Personal Info', {'fields': ('username', 'role')}),
#         ('Permissions', {'fields': ('is_staff', 'is_superuser', 'groups', 'user_permissions')}),
#         ('Important dates', {'fields': ('last_login', 'date_joined')}),
#     )
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('email', 'username', 'role', 'password1', 'password2', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
#         }),
#     )

# admin.site.register(CustomUser, CustomUserAdmin)
