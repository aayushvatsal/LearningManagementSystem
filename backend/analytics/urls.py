from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, RevenueViewSet, SystemAlertsView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'revenues', RevenueViewSet)
router.register(r'alerts', SystemAlertsView, basename='alerts')

urlpatterns = [
    path('', include(router.urls)),
]
