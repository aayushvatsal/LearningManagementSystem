from django.urls import path
from .views import AttendanceView

urlpatterns = [
    path('attendance/', AttendanceView.as_view(), name='attendance-list'),
    path('attendance/<int:pk>/', AttendanceView.as_view(), name='attendance-detail'),
]


















# from django.urls import path
# from .views import AttendanceView

# urlpatterns = [
#     path('attendance/', AttendanceView.as_view(), name='attendance-list'),
#     path('attendance/<int:pk>/', AttendanceView.as_view(), name='attendance-detail'),
# ]











# from django.urls import path
# from .views import AttendanceView

# urlpatterns = [
#     path('attendance/', AttendanceView.as_view(), name='attendance-list'),
#     path('attendance/<int:pk>/', AttendanceView.as_view(), name='attendance-detail'),
# ]











# from django.urls import path
# from .views import AttendanceView

# urlpatterns = [
#     path('attendance/', AttendanceView.as_view(), name='attendance-list'),
#     path('attendance/<int:pk>/', AttendanceView.as_view(), name='attendance-detail'),
# ]
