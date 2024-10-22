from django.conf import settings
from django.db import models

class NotificationChannel(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    email = models.BooleanField(default=False)
    sms = models.BooleanField(default=False)
    push = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification Channel for {self.user}"

class UserPreference(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    allow_customization = models.BooleanField(default=True)
    default_preference = models.CharField(max_length=50, choices=[
        ('Email Only', 'Email Only'),
        ('SMS Only', 'SMS Only'),
        ('Push Only', 'Push Only'),
        ('All Channels', 'All Channels'),
    ], default='Email Only')

    def __str__(self):
        return f"User Preference for {self.user}"

class SystemAlert(models.Model):
    critical_alerts = models.BooleanField(default=False)
    downtime_notifications = models.BooleanField(default=False)

    def __str__(self):
        return f"System Alert: Critical - {self.critical_alerts}, Downtime - {self.downtime_notifications}"

class NotificationTemplate(models.Model):
    template_type = models.CharField(max_length=50)
    template_content = models.TextField()

    def __str__(self):
        return f"Template: {self.template_type}"

class ScheduledNotification(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    schedule_time = models.DateTimeField()

    def __str__(self):
        return f"Scheduled Notification: {self.title} at {self.schedule_time}"

class BulkNotification(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Bulk Notification: {self.title} sent at {self.sent_at}"

class NotificationLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    notification_type = models.CharField(max_length=50)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification Log for {self.user} at {self.timestamp}"
