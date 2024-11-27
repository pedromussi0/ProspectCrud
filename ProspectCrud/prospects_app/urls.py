from django.urls import path
from . import views
from .views import (
    LeadListCreateView,
    LeadRetrieveUpdateDestroyView,
    RegisterView,
    UserListCreateView,
    UserRetrieveUpdateDestroyView
)

urlpatterns = [
    path('leads/', LeadListCreateView.as_view(), name='lead-list-create'),
    path('leads/<int:pk>/', LeadRetrieveUpdateDestroyView.as_view(), name='lead-detail'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/user/', views.get_user, name='get_user'),
    path('csrf/', views.get_csrf_token, name='get_csrf_token'),
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user-detail'),
]
