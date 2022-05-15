from django.http import HttpResponse
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def amenitiesHome(request):
    return HttpResponse("<h1>Amenities</h1>")