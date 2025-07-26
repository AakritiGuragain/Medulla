from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class TransformationJourney(models.Model):
    """
    Model representing a user's transformation journey post.
    Assumptions:
    - description: max_length=2000 (can be adjusted as needed)
    - image: optional, can be null/blank
    - timestamp: auto-set on creation
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='journeys')
    description = models.TextField(max_length=2000)
    image = models.ImageField(upload_to='journey_images/', null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    feeling = models.CharField(max_length=50, blank=True, null=True)
    waste_type = models.CharField(max_length=100, blank=True, null=True)
    ai_classified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"

class WasteClassification(models.Model):
    """
    Model for AI waste classification results
    """
    journey = models.OneToOneField(TransformationJourney, on_delete=models.CASCADE, related_name='classification')
    waste_type = models.CharField(max_length=100)
    confidence = models.FloatField()
    points_per_kg = models.IntegerField()
    description = models.TextField()
    examples = models.JSONField(default=list)
    classified_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.waste_type} - {self.confidence}%"

class UserLocation(models.Model):
    """
    Model for storing user locations
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='locations')
    latitude = models.FloatField()
    longitude = models.FloatField()
    address = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.address}"
