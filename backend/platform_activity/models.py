from django.db import models

class Activity(models.Model):
    activity_type = models.CharField(max_length=100)
    user = models.CharField(max_length=100)
    date = models.DateField()

class Log(models.Model):
    log_message = models.CharField(max_length=255)
    date = models.DateField()
    details = models.CharField(max_length=255)

class SystemHealth(models.Model):
    cpu_usage = models.FloatField()
    memory_usage = models.FloatField()
    disk_space = models.FloatField()

class Settings(models.Model):
    enable_notifications = models.BooleanField(default=False)
    enable_auto_updates = models.BooleanField(default=False)
    enable_dark_mode = models.BooleanField(default=False)
