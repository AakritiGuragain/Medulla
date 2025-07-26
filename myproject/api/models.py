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

    def __str__(self):
        return f"{self.user.username} - {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"
