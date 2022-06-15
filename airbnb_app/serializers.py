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

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class PropertySerializer(serializers.ModelSerializer):

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
            'max_days',
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