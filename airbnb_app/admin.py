from django.contrib import admin
from .models import Apt

# Register your models here.
class AptAdmin(admin.ModelAdmin):
    list_display = ('title', 'location')

# Register your models here.
admin.site.register(Apt, AptAdmin)