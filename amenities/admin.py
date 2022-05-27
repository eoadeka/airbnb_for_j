from django.contrib import admin
from .models import *

# Register your models here.
# AMENITIES-RELATED ADMINS
class AttractionsAdmin(admin.ModelAdmin):
    list_display = ('amenity', )
    empty_value_display = '-empty-'

class BathroomAdmin(admin.ModelAdmin):
    list_display = ('amenity', )
    empty_value_display = '-empty-'

class BedroomAdmin(admin.ModelAdmin):
    list_display = ('amenity', )
    empty_value_display = '-empty-'

class CleaningAdmin(admin.ModelAdmin):
    list_display = ('amenity', )
    empty_value_display = '-empty-'

class EntertainmentAdmin(admin.ModelAdmin):
    list_display = ('amenity', )
    empty_value_display = '-empty-'

class FamilyAdmin(admin.ModelAdmin):
    list_display = ('amenity', )
    empty_value_display = '-empty-'

class FacilitiesAdmin(admin.ModelAdmin):
    list_display = ('amenity', )
    empty_value_display = '-empty-'

class HeatingAndCoolingAdmin(admin.ModelAdmin):
    list_display = ('amenity', )
    empty_value_display = '-empty-'

class InternetAndOfficeAdmin(admin.ModelAdmin):
    list_display = ('amenity', )
    empty_value_display = '-empty-'

class KitchenAndDiningAdmin(admin.ModelAdmin):
    list_display = ('amenity',)
    empty_value_display = '-empty-'
    
class OutdoorsAdmin(admin.ModelAdmin):
    list_display = ('amenity',)
    empty_value_display = '-empty-'

class ParkingAdmin(admin.ModelAdmin):
    list_display = ('amenity',)
    empty_value_display = '-empty-'

class SafetyAdmin(admin.ModelAdmin):
    list_display = ('amenity',)
    empty_value_display = '-empty-'

class ServicesAdmin(admin.ModelAdmin):
    list_display = ('amenity',)
    empty_value_display = '-empty-'

# admin.site.register(Attractions, AttractionsAdmin)
# admin.site.register(Bathroom, BathroomAdmin)
# admin.site.register(Bedroom, BedroomAdmin)
# admin.site.register(Cleaning, CleaningAdmin)
# admin.site.register(Entertainment, EntertainmentAdmin)
# admin.site.register(Family, FamilyAdmin)
# admin.site.register(Facilities, FacilitiesAdmin)
# admin.site.register(HeatingAndCooling, HeatingAndCoolingAdmin)
# admin.site.register(InternetAndOffice, InternetAndOfficeAdmin)
# admin.site.register(KitchenAndDining, KitchenAndDiningAdmin)
# admin.site.register(Outdoors, OutdoorsAdmin)
# admin.site.register(Parking, ParkingAdmin)
# admin.site.register(Safety, SafetyAdmin)
# admin.site.register(Services, ServicesAdmin)


# admin.site.register(Attractions)
# admin.site.register(Bathroom)
# admin.site.register(Bedroom)
# admin.site.register(Cleaning)
# admin.site.register(Entertainment)
# admin.site.register(Family)
# admin.site.register(Facilities)
# admin.site.register(HeatingAndCooling)
# admin.site.register(InternetAndOffice)
# admin.site.register(KitchenAndDining)
# admin.site.register(Outdoors)
# admin.site.register(Parking)
# admin.site.register(Safety)
# admin.site.register(Services)