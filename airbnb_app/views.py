from importlib.resources import contents
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import BookingSerializer, CitySerializer, PropertySerializer, PropertyImagesSerializer
from .models import *
from amenities.models import *

# Create your views here.
def main(request):
    return HttpResponse("<h1>Airbnb Django app</h1>")

class BookingsView(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()

class CitiesView(viewsets.ModelViewSet):
    serializer_class = CitySerializer
    queryset = City.objects.all()

class PropertiesView(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    queryset = Property.objects.all()

class PropertyImagesView(viewsets.ModelViewSet):
    serializer_class = PropertyImagesSerializer
    queryset = PropertyImages.objects.all()

class CitiesAPIView(APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, format=None):
        cities = City.objects.all()
        serializer = CitySerializer(cities, many=True)
        return Response(serializer.data)

