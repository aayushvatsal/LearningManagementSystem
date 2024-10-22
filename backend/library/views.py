from rest_framework import generics, permissions
from .models import Content
from .serializers import ContentSerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated

# Custom permission: Only admin or owner (instructor) can modify, users can only view.
class IsAdminOrOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.created_by or request.user.is_staff

class ContentListCreateView(generics.ListCreateAPIView):
    queryset = Content.objects.all()
    serializer_class = ContentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class ContentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Content.objects.all()
    serializer_class = ContentSerializer
    permission_classes = [IsAdminOrOwner]

class AdminContentControlView(generics.ListAPIView):
    queryset = Content.objects.all()
    serializer_class = ContentSerializer
    permission_classes = [IsAdminUser]


















# from rest_framework import generics, permissions
# from .models import Content
# from .serializers import ContentSerializer
# from rest_framework.permissions import IsAdminUser, IsAuthenticated

# # Custom permission: Only admin or owner (instructor) can modify, users can only view.
# class IsAdminOrOwner(permissions.BasePermission):
#     def has_object_permission(self, request, view, obj):
#         return request.user == obj.created_by or request.user.is_staff

# class ContentListCreateView(generics.ListCreateAPIView):
#     queryset = Content.objects.all()
#     serializer_class = ContentSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         serializer.save(created_by=self.request.user)

# class ContentDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Content.objects.all()
#     serializer_class = ContentSerializer
#     permission_classes = [IsAdminOrOwner]

# class AdminContentControlView(generics.ListAPIView):
#     queryset = Content.objects.all()
#     serializer_class = ContentSerializer
#     permission_classes = [IsAdminUser]
