from django.contrib import admin
from .models import TransformationJourney, WasteClassification, UserLocation

admin.site.register(TransformationJourney)
admin.site.register(WasteClassification)
admin.site.register(UserLocation)

# Register your models here.
