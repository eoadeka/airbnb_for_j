# serializers are used to convert model instances to JSON, 
# so that the frontend can work with the received data.
from dataclasses import field
from django.forms import DateTimeField
from rest_framework import serializers
from django.core.exceptions import ObjectDoesNotExist
from .models import *
from amenities.models import *


# https://www.django-rest-framework.org/api-guide/renderers/

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields =  '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    booking = serializers.StringRelatedField()

    class Meta:
        model = Payment
        fields =  '__all__'

class BookingSerializer(serializers.ModelSerializer):
    check_in = serializers.DateTimeField(format="%Y-%m-%d")
    check_out = serializers.DateTimeField(format="%Y-%m-%d")
    class Meta:
        model = Booking
        # fields = '__all__'
        fields = [
            'id',
            'user',
            'property',
            'get_property_title',
            'get_property_image',
            'get_property_price',
            'check_in',
            'check_out',
            'guests',
            'booking_date',
            'reserved',
            'date_diff',
            'get_total'
        ]

    
    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Booking.objects.create(**validated_data)

    # def update(self, instance, validated_data):
    #     instance.user = validated_data.get('title', instance.title)
    #     instance.property = validated_data.get('property', instance.property)
    #     instance.check_in = validated_data.get('check_in', instance.check_in)

    #     instance.save()
    #     return instance


class PropertySerializer(serializers.ModelSerializer):

    price = serializers.FloatField()

    # city = serializers.StringRelatedField(many=False)
    city = serializers.SlugRelatedField(many=False, slug_field='city', queryset=City.objects.all())
    type = serializers.SlugRelatedField(many=False, slug_field='title', queryset=PropertyCategory.objects.all())
    highlights = serializers.SlugRelatedField(many=True, slug_field='highlight', queryset=Highlights.objects.all())

    attractions = serializers.SlugRelatedField(many=True, slug_field='amenity', queryset=Attractions.objects.all())
    bathroom = serializers.SlugRelatedField(many=True, slug_field='amenity', queryset=Bathroom.objects.all())
    bedroom = serializers.SlugRelatedField(many=True, slug_field='amenity', queryset=Bedroom.objects.all())
    cleaning = serializers.SlugRelatedField(many=True, slug_field='amenity', queryset=Cleaning.objects.all())
    entertainment = serializers.SlugRelatedField(many=True, slug_field='amenity', queryset=Entertainment.objects.all())
    family = serializers.SlugRelatedField(many=True, slug_field='amenity', queryset=Family.objects.all())
    facilities = serializers.SlugRelatedField(many=True, slug_field='amenity', queryset=Facilities.objects.all())
    heating_and_cooling = serializers.SlugRelatedField(many=True, slug_field='amenity', queryset=HeatingAndCooling.objects.all())
    internet_and_office = serializers.SlugRelatedField(many=True, slug_field='amenity', queryset=InternetAndOffice.objects.all())
    kitchen_and_dining = serializers.SlugRelatedField(many=True, slug_field='amenity', queryset=KitchenAndDining.objects.all())
    outdoors = serializers.SlugRelatedField(many=True, slug_field='amenity', queryset=Outdoors.objects.all())
    parking = serializers.SlugRelatedField(many=True, slug_field='amenity', queryset=Parking.objects.all())
    safety = serializers.SlugRelatedField(many=True, slug_field='amenity', queryset=Safety.objects.all())
    services = serializers.SlugRelatedField(many=True, slug_field='amenity', queryset=Services.objects.all())
    # attractions = serializers.StringRelatedField(many=True)
 

    property_images = serializers.SerializerMethodField(allow_null=True)

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
            'min_days',
            'max_guests',
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
            'property_images'
        )
    
    def get_property_images(self, obj):
        property_images_query = PropertyImages.objects.filter(property_id=obj.id)
        serializer = PropertyImagesSerializer(property_images_query, many=True)
        return serializer.data

    # def create(self, validated_data):
    #     property_images = validated_data.pop('property_images')
    #     property_instance = Property.objects.create(**validated_data)
    #     for image in property_images:
    #         PropertyImages.objects.create(property=property_instance,**image)
    #     return property_instance

    # bathroom = serializers.SerializerMethodField(read_only=True)

    # def get_bathroom(self, model):
    #     return [bathroom.__str__() for bathroom in model.bathroom.all().order_by('id')]
    

class PropertyImagesSerializer(serializers.ModelSerializer):
    # property = serializers.StringRelatedField(many=False)

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