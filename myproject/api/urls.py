from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView, TransformationJourneyListCreateView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('journeys/', TransformationJourneyListCreateView.as_view(), name='journey-list-create'),
] 