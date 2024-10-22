from rest_framework import viewsets
from .models import NotificationChannel, UserPreference, SystemAlert, NotificationTemplate, ScheduledNotification, BulkNotification, NotificationLog
from .serializers import NotificationChannelSerializer, UserPreferenceSerializer, SystemAlertSerializer, NotificationTemplateSerializer, ScheduledNotificationSerializer, BulkNotificationSerializer, NotificationLogSerializer

class NotificationChannelViewSet(viewsets.ModelViewSet):
    queryset = NotificationChannel.objects.all()
    serializer_class = NotificationChannelSerializer

class UserPreferenceViewSet(viewsets.ModelViewSet):
    queryset = UserPreference.objects.all()
    serializer_class = UserPreferenceSerializer

class SystemAlertViewSet(viewsets.ModelViewSet):
    queryset = SystemAlert.objects.all()
    serializer_class = SystemAlertSerializer

class NotificationTemplateViewSet(viewsets.ModelViewSet):
    queryset = NotificationTemplate.objects.all()
    serializer_class = NotificationTemplateSerializer

class ScheduledNotificationViewSet(viewsets.ModelViewSet):
    queryset = ScheduledNotification.objects.all()
    serializer_class = ScheduledNotificationSerializer

class BulkNotificationViewSet(viewsets.ModelViewSet):
    queryset = BulkNotification.objects.all()
    serializer_class = BulkNotificationSerializer

class NotificationLogViewSet(viewsets.ModelViewSet):
    queryset = NotificationLog.objects.all()
    serializer_class = NotificationLogSerializer
