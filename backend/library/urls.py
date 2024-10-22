from django.urls import path
from .views import ContentListCreateView, ContentDetailView, AdminContentControlView

urlpatterns = [
    path('contents/', ContentListCreateView.as_view(), name='content-list-create'),
    path('contents/<int:pk>/', ContentDetailView.as_view(), name='content-detail'),
    path('admin/contents/', AdminContentControlView.as_view(), name='admin-content-control'),
]







# from django.urls import path
# from .views import ContentListCreateView, ContentDetailView, AdminContentControlView

# urlpatterns = [
#     path('contents/', ContentListCreateView.as_view(), name='content-list-create'),
#     path('contents/<int:pk>/', ContentDetailView.as_view(), name='content-detail'),
#     path('admin/contents/', AdminContentControlView.as_view(), name='admin-content-control'),
# ]
