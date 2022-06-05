from rest_framework import serializers
from .models import *
# from amenities.models import *


# https://www.django-rest-framework.org/api-guide/renderers/
class AttractionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attractions
        fields =  '__all__'

class BathroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bathroom
        fields =  '__all__'

class BedroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bedroom
        fields =  '__all__'

class CleaningSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cleaning
        fields =  '__all__'

class EntertainmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entertainment
        fields =  '__all__'
        
class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields =  '__all__'
        
class FacilitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Facilities
        fields =  '__all__'
        
class HeatingAndCoolingSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeatingAndCooling
        fields =  '__all__'
        
class InternetAndOfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = InternetAndOffice
        fields =  '__all__'

class KitchenAndDiningSerializer(serializers.ModelSerializer):
    class Meta:
        model = KitchenAndDining
        fields =  '__all__'

class OutdoorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outdoors
        fields =  '__all__'

class ParkingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parking
        fields =  '__all__'

class SafetySerializer(serializers.ModelSerializer):
    class Meta:
        model = Safety
        fields =  '__all__'

class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields =  '__all__'

