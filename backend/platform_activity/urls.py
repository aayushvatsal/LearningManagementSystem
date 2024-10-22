from django.urls import path
from .views import PlatformUsageView, UserActivityView, LogsView, SystemHealthView, SettingsView

urlpatterns = [
    path('platform-usage/', PlatformUsageView.as_view(), name='platform-usage'),
    path('user-activity/', UserActivityView.as_view(), name='user-activity'),
    path('logs/', LogsView.as_view(), name='logs'),
    path('system-health/', SystemHealthView.as_view(), name='system-health'),
    path('settings/', SettingsView.as_view(), name='settings'),
]
