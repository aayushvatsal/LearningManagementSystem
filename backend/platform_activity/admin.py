from django.contrib import admin
from .models import Activity, Log, SystemHealth, Settings

admin.site.register(Activity)
admin.site.register(Log)
admin.site.register(SystemHealth)
admin.site.register(Settings)
