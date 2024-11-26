from django.urls import path
from .views import LeadListCreateView, LeadRetrieveUpdateDestroyView

urlpatterns = [
    path('leads/', LeadListCreateView.as_view(), name='lead-list-create'),
    path('leads/<int:pk>/', LeadRetrieveUpdateDestroyView.as_view(), name='lead-detail'),
]
