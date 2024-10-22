from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('user', 'User'),
        ('admin', 'Admin'),
        ('instructor', 'Instructor'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    email = models.EmailField(unique=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

class OTP(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        expiration_time = self.created_at + timezone.timedelta(minutes=5)
        return timezone.now() > expiration_time


# Course Model to manage courses with instructor and enrolled users
class Course(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    duration = models.PositiveIntegerField(help_text="Duration in days")
    prerequisites = models.TextField(blank=True, null=True)
    instructor = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, limit_choices_to={'role': 'instructor'}, related_name='courses')
    users = models.ManyToManyField(CustomUser, related_name='enrolled_courses', blank=True, limit_choices_to={'role': 'user'})

    def __str__(self):
        return self.name





























# from django.db import models
# from django.contrib.auth.models import AbstractUser, BaseUserManager
# from django.utils import timezone

# # Custom User Manager
# class CustomUserManager(BaseUserManager):
#     def create_user(self, email, password=None, **extra_fields):
#         if not email:
#             raise ValueError('The Email field must be set')
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         return self.create_user(email, password, **extra_fields)

# # Custom User Model
# class CustomUser(AbstractUser):
#     ROLE_CHOICES = [
#         ('user', 'User'),
#         ('admin', 'Admin'),
#         ('instructor', 'Instructor'),
#     ]
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
#     email = models.EmailField(unique=True)

#     objects = CustomUserManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username']

# # OTP Model to handle OTP generation and validation
# class OTP(models.Model):
#     user_email = models.EmailField()
#     otp = models.CharField(max_length=6)
#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f'OTP for {self.user_email}'

#     def is_valid(self):
#         return timezone.now() < self.created_at + timezone.timedelta(minutes=10)

# # Course Model to manage courses with instructor and enrolled users
# class Course(models.Model):
#     name = models.CharField(max_length=255)
#     description = models.TextField()
#     duration = models.PositiveIntegerField(help_text="Duration in days")
#     prerequisites = models.TextField(blank=True, null=True)
#     instructor = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, limit_choices_to={'role': 'instructor'}, related_name='courses')
#     users = models.ManyToManyField(CustomUser, related_name='enrolled_courses', blank=True, limit_choices_to={'role': 'user'})

#     def __str__(self):
#         return self.name

















# from django.contrib.auth.models import AbstractUser, BaseUserManager
# from django.db import models

# class CustomUserManager(BaseUserManager):
#     def create_user(self, email, password=None, **extra_fields):
#         if not email:
#             raise ValueError('The Email field must be set')
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         return self.create_user(email, password, **extra_fields)

# class CustomUser(AbstractUser):
#     ROLE_CHOICES = [
#         ('user', 'User'),
#         ('admin', 'Admin'),
#         ('instructor', 'Instructor'),
#     ]
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
#     email = models.EmailField(unique=True)

#     objects = CustomUserManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username']

# class Course(models.Model):
#     name = models.CharField(max_length=255)
#     description = models.TextField()
#     duration = models.PositiveIntegerField(help_text="Duration in days")
#     prerequisites = models.TextField(blank=True, null=True)
#     instructor = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, limit_choices_to={'role': 'instructor'}, related_name='authentication_courses')  # Unique related_name
#     users = models.ManyToManyField(CustomUser, related_name='authentication_user_courses', blank=True, limit_choices_to={'role': 'user'})  # Unique related_name

#     def __str__(self):
#         return self.name










# from django.contrib.auth.models import AbstractUser, BaseUserManager
# from django.db import models

# class CustomUserManager(BaseUserManager):
#     def create_user(self, email, password=None, **extra_fields):
#         if not email:
#             raise ValueError('The Email field must be set')
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         return self.create_user(email, password, **extra_fields)

# class CustomUser(AbstractUser):
#     ROLE_CHOICES = [
#         ('user', 'User'),
#         ('admin', 'Admin'),
#         ('instructor', 'Instructor'),
#     ]
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
#     email = models.EmailField(unique=True)

#     objects = CustomUserManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username']

# class Course(models.Model):
#     name = models.CharField(max_length=255)
#     description = models.TextField()
#     duration = models.PositiveIntegerField(help_text="Duration in days")
#     prerequisites = models.TextField(blank=True, null=True)
#     instructor = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, limit_choices_to={'role': 'instructor'})
#     users = models.ManyToManyField(CustomUser, related_name='courses', blank=True, limit_choices_to={'role': 'user'})

#     def __str__(self):
#         return self.name








