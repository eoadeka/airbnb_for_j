from django.http import HttpResponse
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .models import *
from .serializers import *

# Create your views here.
def amenitiesHome(request):
    return HttpResponse("<h1>Amenities</h1>")

# class AmenitiesView(APIView, GenericAPIView):
class AmenitiesView(APIView):
    # permission_classes = (IsAuthenticated,)
    attractions_queryset = Attractions.objects.all()
    bathroom_queryset = Bathroom.objects.all()
    bedroom_queryset = Bedroom.objects.all()
    cleaning_queryset = Cleaning.objects.all()
    entertainment_queryset = Entertainment.objects.all()
    family_queryset = Family.objects.all()
    facilities_queryset = Facilities.objects.all()
    heating_and_cooling_queryset = HeatingAndCooling.objects.all()
    internet_and_office_queryset = InternetAndOffice.objects.all()
    kitchen_and_dining_queryset = KitchenAndDining.objects.all()
    outdoors_queryset = Outdoors.objects.all()
    parking_queryset = Parking.objects.all()
    safety_queryset = Safety.objects.all()
    services_queryset = Services.objects.all()

    attractions_serializer_class = AttractionsSerializer
    bathroom_serializer_class = BathroomSerializer
    bedroom_serializer_class = BedroomSerializer
    cleaning_serializer_class = CleaningSerializer
    entertainment_serializer_class = EntertainmentSerializer
    family_serializer_class = FamilySerializer
    facilities_serializer_class = FacilitiesSerializer
    heating_and_cooling_serializer_class = HeatingAndCoolingSerializer
    internet_and_office_serializer_class = InternetAndOfficeSerializer
    kitchen_and_dining_serializer_class = KitchenAndDiningSerializer
    outdoors_serializer_class = OutdoorsSerializer
    parking_serializer_class = ParkingSerializer
    safety_serializer_class = SafetySerializer
    services_serializer_class = ServicesSerializer


    filterset_fields = ['amenity']

    # def get_paginated_query(self, _query_set):
    #     page = self.paginate_queryset(self.filter_queryset(_query_set))
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)
    #     return page

    def get(self, request, *args, **kwargs):
        attractions_serializer = self.attractions_serializer_class(self.attractions_queryset,many=True)
        bathroom_serializer = self.bathroom_serializer_class(self.bathroom_queryset, many=True)
        bedroom_serializer = self.bedroom_serializer_class(self.bedroom_queryset, many=True)
        cleaning_serializer = self.cleaning_serializer_class(self.cleaning_queryset, many=True)
        entertainment_serializer = self.entertainment_serializer_class(self.entertainment_queryset, many=True)
        family_serializer = self.family_serializer_class(self.family_queryset, many=True)
        facilities_serializer = self.facilities_serializer_class(self.facilities_queryset, many=True)
        heating_and_cooling_serializer = self.heating_and_cooling_serializer_class(self.facilities_queryset, many=True)
        internet_and_office_serializer = self.internet_and_office_serializer_class(self.internet_and_office_queryset, many=True)
        kitchen_and_dining_serializer = self.kitchen_and_dining_serializer_class(self.kitchen_and_dining_queryset, many=True)
        outdoors_serializer = self.outdoors_serializer_class(self.outdoors_queryset, many=True)
        parking_serializer = self.parking_serializer_class(self.outdoors_queryset, many=True)
        safety_serializer = self.safety_serializer_class(self.outdoors_queryset, many=True)
        services_serializer = self.services_serializer_class(self.outdoors_queryset, many=True)

        response_results = {
            "attractions": attractions_serializer.data,
            "bathroom": bathroom_serializer.data,
            "bedroom": bedroom_serializer.data,
            "cleaning": cleaning_serializer.data,
            "entertainment": entertainment_serializer.data,
            "family": family_serializer.data,
            "facilities": facilities_serializer.data,
            "heating_and_cooling": heating_and_cooling_serializer.data,
            "internet_and_office": internet_and_office_serializer.data,
            "kitchen_and_dining": kitchen_and_dining_serializer.data,
            "outdoors": outdoors_serializer.data,
            "parking": parking_serializer.data,
            "safety": safety_serializer.data,
            "services": services_serializer.data,

        }
        return Response(response_results)