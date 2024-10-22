from django.urls import path
from .views import ProfileView, ProfilePictureUploadView

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='profile-detail'),
    path('profile/picture/', ProfilePictureUploadView.as_view(), name='profile-picture-upload'),
]
