from django.urls import path
from .views import (
    RegisterView, CustomTokenObtainPairView, TransformationJourneyListCreateView,
    AIClassificationView, LocationView, FeelingsView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('journeys/', TransformationJourneyListCreateView.as_view(), name='journey-list-create'),
    path('ai-classify/', AIClassificationView.as_view(), name='ai-classify'),
    path('location/', LocationView.as_view(), name='location'),
    path('feelings/', FeelingsView.as_view(), name='feelings'),
] 