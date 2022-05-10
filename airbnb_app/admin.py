from django.contrib import admin
from .models import Property, PropertyCategory

# Register your models here.
class PropertyAdmin(admin.ModelAdmin):
    list_display = ('title', 'location')
    empty_value_display = '-empty-'

class PropertyCategoryAdmin(admin.ModelAdmin):
    list_display = ('title', )
    empty_value_display = '-empty-'

# Register your models here.
admin.site.register(Property, PropertyAdmin)
admin.site.register(PropertyCategory, PropertyCategoryAdmin)