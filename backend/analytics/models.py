from django.db import models

# User model with a username field
class User(models.Model):
    username = models.CharField(max_length=255)

# Revenue model with amount and date
class Revenue(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
