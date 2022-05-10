
from django.db import models

# Create your models here.
# class booking: check-in, check-out, no of beds, no. of guests
# keywords for filtering apts
# Filters
# To Property, add map location
# Add Local Time ie UK Time

# GUESTS
# Maximum of 2 guests not including infants, no pets allowed(except service pets)
    # Adults (Age 13+) = no
    # Children (Age 2-12) = number of guests
    # Infants (Under 2) = number of guests
    # Pets

PROPERTY_TYPE_CHOICES = [
    ('S', 'Studio'),
    ('F', 'Flat'),
    ('H', 'House')
]

class PropertyManager(models.Manager):
    def get_queryset(self):
        return super(PropertyManager, self).get_queryset().filter(availability = 1)

class PropertyCategory(models.Model):
    title = models.CharField(max_length=10)

    class Meta:
        verbose_name = 'Property Category'
        verbose_name_plural = 'Property Categories'
        
    
    def __str__(self):
        return self.title


class Property(models.Model):
    # title, images, location, utilities, apt type, price
    # Amenity: wi-fi, housekeeping, gym, laundry, pool
    # Apt-type/ type: Studio, 
    # apt-hightlights/ Highlights: 1 Bed, 2Bed, 2Guest, 2bath/ Bedrooms: 2, Double Beds:1, Single Beds:2,capcity: 5, size(m2):20
    # price : £100.00 per day
    # attractions nearby: beach access, ski slopes
    
    type = models.ForeignKey(PropertyCategory, on_delete=models.CASCADE)
    image = models.FileField(blank=True, upload_to="property/")
    title = models.CharField(max_length=1000)
    description = models.TextField()
    location = models.CharField(max_length=500)
    amenities = models.TextField(max_length=500)
    highlights = models.TextField()
    price = models.FloatField()
    reviews = models.TextField()
    date_added = models.DateTimeField(auto_now=False,auto_now_add=True)
    available = models.BooleanField()

    class Meta:
        verbose_name = "Property"
        verbose_name_plural = "Properties"

    def __str__(self):
        return self.title

class Booking(models.Model):
    property_name = models.CharField(max_length=250)
    check_in = models.DateField()
    check_out = models.DateField()
    no_of_beds = models.IntegerField()
    no_of_guests = models.IntegerField()

    class Meta:
        verbose_name = "Booking"
        verbose_name_plural = "Bookings"

    def __str__(self):
        return self.property_name
    

