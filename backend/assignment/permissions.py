from rest_framework.permissions import BasePermission

class IsInstructor(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated and is an instructor
        return request.user.is_authenticated and request.user.role == 'instructor'


class IsUser(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated and is a student/user
        return request.user.is_authenticated and request.user.role == 'user'









# from rest_framework.permissions import BasePermission

# class IsInstructor(BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_authenticated and request.user.role == 'instructor'

# class IsUser(BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_authenticated and request.user.role == 'user'









# from rest_framework.permissions import BasePermission

# class IsInstructor(BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_authenticated and request.user.role == 'instructor'

# class IsUser(BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_authenticated and request.user.role == 'user'
