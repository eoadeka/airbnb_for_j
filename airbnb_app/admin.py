from django.contrib import admin
from .models import *
from amenities.models import *

# Register your models here.
# class CityAdmin(admin.ModelAdmin):
#     list_display = ('city',)
#     empty_value_display = '-empty-'

# class HighlightsAdmin(admin.ModelAdmin):
#     list_display = ('highlight',)
#     empty_value_display = '-empty-'




# PROPERTIES-RELATED ADMINS
class CityAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ['city']}

class BookingAdmin(admin.ModelAdmin):
    list_display = ('user','property','check_in', 'check_out', 'guests', 'reserved')

class PaymentAdmin(admin.ModelAdmin):
    list_display = ('user','booking', 'total_amount')

class PropertyImagesAdmin(admin.StackedInline):
    model = PropertyImages
    
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'city')
    list_filter = ('type', 'city')
    inlines = [PropertyImagesAdmin]
    prepopulated_fields= {'slug': ['title']}
    empty_value_display = '-empty-'

class PropertyImagesAdmin(admin.ModelAdmin):
    list_display = ('property',)

class PropertyCategoryAdmin(admin.ModelAdmin):
    list_display = ('title', )
    empty_value_display = '-empty-'

class ReviewsAdmin(admin.ModelAdmin):
    list_display = ('user','property', 'title', 'created_at')
# Register your models here.



admin.site.register(Booking, BookingAdmin)
admin.site.register(City, CityAdmin)
admin.site.register(Highlights)
admin.site.register(Payment, PaymentAdmin)
admin.site.register(Property, PropertyAdmin)
admin.site.register(PropertyCategory, PropertyCategoryAdmin)
admin.site.register(PropertyImages, PropertyImagesAdmin)
admin.site.register(Reviews, ReviewsAdmin)