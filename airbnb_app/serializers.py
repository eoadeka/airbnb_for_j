# serializers are used to convert model instances to JSON, 
# so that the frontend can work with the received data.
from rest_framework import serializers
from .models import *
from amenities.models import *

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields =  (
            'id',
            'city',
            'type',
            'image',
            'title',
            'slug',
            'description',
            'location',
            'highlights',
            'price',
            'is_available',
            'attractions',
            'bathroom',
            'bedroom',
            'cleaning',
            'entertainment',
            'family',
            'facilities',
            'heating_and_cooling',
            'internet_and_office',
            'kitchen_and_dining',
            'outdoors',
            'parking',
            'safety',
            'services',
        )

class PropertyImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImages
        fields =  (
            'property',
            'images'
        )