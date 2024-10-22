from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('authentication.urls')),
    path('api/', include('platform_activity.urls')),
    path('api/analytics/', include('analytics.urls')),
    path('api/notifications/', include('notifications.urls')),
    path('api/', include('assignment.urls')),
    path('api/', include('instructorcalendar.urls')),
    path('api/', include('attendance.urls')),
    path('api/', include('library.urls')),
    path('api/', include('profiles.urls')),
    
   
    
    

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)