from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import PropertySerializer, PropertyImagesSerializer
from .models import *
from amenities.models import *

# Create your views here.
def main(request):
    return HttpResponse("<h1>Airbnb app</h1>")

class PropertiesView(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    queryset = Property.objects.all()

class PropertyImagesView(viewsets.ModelViewSet):
    serializer_class = PropertyImagesSerializer
    queryset = PropertyImages.objects.all()
