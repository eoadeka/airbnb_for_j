# serializers are used to convert model instances to JSON, 
# so that the frontend can work with the received data.
from rest_framework import serializers
from .models import *
from amenities.models import *


# https://www.django-rest-framework.org/api-guide/renderers/

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields =  '__all__'

class PropertySerializer(serializers.ModelSerializer):

    city = serializers.StringRelatedField(many=False)
    type = serializers.StringRelatedField(many=False)
    highlights = serializers.StringRelatedField(many=True)

    attractions = serializers.StringRelatedField(many=True)
    bathroom = serializers.StringRelatedField(many=True)
    bedroom = serializers.StringRelatedField(many=True)
    cleaning = serializers.StringRelatedField(many=True)
    entertainment = serializers.StringRelatedField(many=True)
    family = serializers.StringRelatedField(many=True)
    facilities = serializers.StringRelatedField(many=True)
    heating_and_cooling = serializers.StringRelatedField(many=True)
    internet_and_office = serializers.StringRelatedField(many=True)
    kitchen_and_dining = serializers.StringRelatedField(many=True)
    outdoors = serializers.StringRelatedField(many=True)
    parking = serializers.StringRelatedField(many=True)
    safety = serializers.StringRelatedField(many=True)
    services = serializers.StringRelatedField(many=True)


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

    # bathroom = serializers.SerializerMethodField(read_only=True)

    # def get_bathroom(self, model):
    #     return [bathroom.__str__() for bathroom in model.bathroom.all().order_by('id')]
    

    
    

class PropertyImagesSerializer(serializers.ModelSerializer):
    property = serializers.StringRelatedField(many=False)

    class Meta:
        model = PropertyImages
        fields =  '__all__'


# class PropertySerializer(serializers.ModelSerializer):
    # class Meta:
    #     model = Property
    #     fields =  (
    #         'id',
    #         'city',
    #         'type',
    #         'image',
    #         'title',
    #         'slug',
    #         'description',
    #         'location',
    #         'highlights',
    #         'price',
    #         'is_available',
    #         'attractions',
    #         'bathroom',
    #         'bedroom',
    #         'cleaning',
    #         'entertainment',
    #         'family',
    #         'facilities',
    #         'heating_and_cooling',
    #         'internet_and_office',
    #         'kitchen_and_dining',
    #         'outdoors',
    #         'parking',
    #         'safety',
    #         'services',
    #     )