from django.urls import path
from .views import (
    LeadListCreateView, 
    LeadRetrieveUpdateDestroyView,
    LoginView,
    LogoutView,
    UserView
)

urlpatterns = [
    path('leads/', LeadListCreateView.as_view(), name='lead-list-create'),
    path('leads/<int:pk>/', LeadRetrieveUpdateDestroyView.as_view(), name='lead-detail'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/user/', UserView.as_view(), name='user'),
]
