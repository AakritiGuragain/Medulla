from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .serializers import (
    UserRegisterSerializer, UserLoginSerializer, TransformationJourneySerializer,
    WasteClassificationSerializer, UserLocationSerializer, AIClassificationRequestSerializer,
    LocationRequestSerializer
)
from .models import TransformationJourney, WasteClassification, UserLocation
import random
import json

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Login endpoint using JWT. Expects email and password.
    """
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        if not user.check_password(password):
            return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)

class TransformationJourneyListCreateView(generics.ListCreateAPIView):
    queryset = TransformationJourney.objects.all().order_by('-timestamp')
    serializer_class = TransformationJourneySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AIClassificationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = AIClassificationRequestSerializer(data=request.data)
        if serializer.is_valid():
            # Simulate AI classification with realistic waste types
            waste_types = [
                {
                    'waste_type': 'Plastic Bottles (PET)',
                    'confidence': random.uniform(85, 98),
                    'points_per_kg': 25,
                    'description': 'Clear plastic bottles, typically used for beverages',
                    'examples': ['Water bottles', 'Soda bottles', 'Juice containers']
                },
                {
                    'waste_type': 'Cardboard',
                    'confidence': random.uniform(80, 95),
                    'points_per_kg': 15,
                    'description': 'Clean cardboard boxes and packaging materials',
                    'examples': ['Shipping boxes', 'Food packaging', 'Moving boxes']
                },
                {
                    'waste_type': 'Aluminum Cans',
                    'confidence': random.uniform(90, 99),
                    'points_per_kg': 45,
                    'description': 'Aluminum beverage cans and containers',
                    'examples': ['Soda cans', 'Beer cans', 'Energy drink cans']
                },
                {
                    'waste_type': 'Glass Bottles',
                    'confidence': random.uniform(85, 97),
                    'points_per_kg': 20,
                    'description': 'Clean glass containers and bottles',
                    'examples': ['Wine bottles', 'Jars', 'Beer bottles']
                },
                {
                    'waste_type': 'Electronics',
                    'confidence': random.uniform(75, 92),
                    'points_per_kg': 150,
                    'description': 'Electronic devices and components',
                    'examples': ['Old phones', 'Laptops', 'Tablets']
                }
            ]
            
            result = random.choice(waste_types)
            return Response(result, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LocationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = LocationRequestSerializer(data=request.data)
        if serializer.is_valid():
            lat = serializer.validated_data['latitude']
            lng = serializer.validated_data['longitude']
            
            # Simulate reverse geocoding
            addresses = [
                'Thamel, Kathmandu',
                'Patan, Lalitpur',
                'Bhaktapur Durbar Square',
                'Boudhanath, Kathmandu',
                'Swayambhunath, Kathmandu',
                'Pashupatinath, Kathmandu'
            ]
            
            location_data = {
                'latitude': lat,
                'longitude': lng,
                'address': random.choice(addresses),
                'timestamp': '2024-01-01T12:00:00Z'
            }
            
            # Save to database
            UserLocation.objects.create(
                user=request.user,
                latitude=lat,
                longitude=lng,
                address=location_data['address']
            )
            
            return Response(location_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FeelingsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        feelings = [
            'Happy', 'Excited', 'Proud', 'Grateful', 'Hopeful',
            'Motivated', 'Inspired', 'Satisfied', 'Peaceful', 'Joyful'
        ]
        return Response({'feelings': feelings}, status=status.HTTP_200_OK)
