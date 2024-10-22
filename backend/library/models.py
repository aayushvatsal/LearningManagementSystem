from django.conf import settings
from django.db import models

# ContentType model for multiple choices
class ContentType(models.Model):
    type_name = models.CharField(max_length=10, choices=[
        ('HTML', 'HTML'),
        ('IMAGE', 'Image'),
        ('AUDIO', 'Audio'),
        ('VIDEO', 'Video'),
        ('PDF', 'PDF'),
    ])

    def __str__(self):
        return self.type_name

class Content(models.Model):
    title = models.CharField(max_length=255)
    content_type = models.ManyToManyField(ContentType)  # Updated to ManyToManyField
    file = models.FileField(upload_to='uploads/', null=True, blank=True)
    text_content = models.TextField(null=True, blank=True)  # For HTML content
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title











# from django.conf import settings
# from django.db import models

# CONTENT_TYPE_CHOICES = [
#     ('HTML', 'HTML'),
#     ('IMAGE', 'Image'),
#     ('AUDIO', 'Audio'),
#     ('VIDEO', 'Video'),
#     ('PDF', 'PDF'),
# ]

# class Content(models.Model):
#     title = models.CharField(max_length=255)
#     content_type = models.CharField(max_length=10, choices=CONTENT_TYPE_CHOICES)
#     file = models.FileField(upload_to='uploads/', null=True, blank=True)
#     text_content = models.TextField(null=True, blank=True)  # For HTML content
#     created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return self.title
