from django.contrib.auth.models import User
from rest_framework import serializers
from .models import TransformationJourney, WasteClassification, UserLocation

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class TransformationJourneySerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    image = serializers.SerializerMethodField()
    location = serializers.CharField(required=False, allow_blank=True)
    feeling = serializers.CharField(required=False, allow_blank=True)
    waste_type = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = TransformationJourney
        fields = ('id', 'user', 'description', 'image', 'timestamp', 'location', 'feeling', 'waste_type', 'ai_classified')
        read_only_fields = ('id', 'user', 'timestamp', 'ai_classified')

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class WasteClassificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = WasteClassification
        fields = ('waste_type', 'confidence', 'points_per_kg', 'description', 'examples', 'classified_at')

class UserLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLocation
        fields = ('latitude', 'longitude', 'address', 'timestamp')
        read_only_fields = ('timestamp',)

class AIClassificationRequestSerializer(serializers.Serializer):
    image = serializers.ImageField()

class LocationRequestSerializer(serializers.Serializer):
    latitude = serializers.FloatField()
    longitude = serializers.FloatField() 