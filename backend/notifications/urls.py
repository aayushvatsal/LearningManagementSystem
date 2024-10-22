from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'channels', views.NotificationChannelViewSet)
router.register(r'preferences', views.UserPreferenceViewSet)
router.register(r'alerts', views.SystemAlertViewSet)
router.register(r'templates', views.NotificationTemplateViewSet)
router.register(r'scheduled', views.ScheduledNotificationViewSet)
router.register(r'bulk', views.BulkNotificationViewSet)
router.register(r'logs', views.NotificationLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
