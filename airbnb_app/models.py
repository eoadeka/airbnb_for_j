from email.mime import image
from tabnanny import verbose
from django.db import models
from amenities.models import *

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

# Create choices here
PROPERTY_TYPE_CHOICES = [
    ('S', 'Studio'),
    ('F', 'Flat'),
    ('H', 'House')
]

# Create models here.
# --------------------- PROPERTY RELATED -------------------------
class City(models.Model):
    city = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = 'Cities'

    def __str__(self):
        return self.city


class Highlights(models.Model):
    # apt-hightlights/ Highlights: 1 Bed, 2Bed, 2Guest, 2bath/ Bedrooms: 2, Double Beds:1, Single Beds:2,capcity: 5, size(m2):20
    highlight = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Highlights'

    def __str__(self):
        return self.highlight
    


class PropertyManager(models.Manager):
    def get_queryset(self):
        return super(PropertyManager, self).get_queryset().filter(is_available = True)


class PropertyCategory(models.Model):
    title = models.CharField(max_length=10)

    class Meta:
        verbose_name_plural = 'Property Categories'
    
    def __str__(self):
        return self.title


# price : £100.00 per day
class Property(models.Model):
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    type = models.ForeignKey(PropertyCategory, on_delete=models.CASCADE, related_name='properties')
    image = models.FileField(blank=True, upload_to="property")
    title = models.CharField(max_length=1000)
    slug = models.SlugField(max_length=250,unique=True, null=True)
    description = models.TextField(blank=True, null=True)
    location = models.TextField()
    highlights = models.ManyToManyField(Highlights, blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    date_added = models.DateTimeField(auto_now=False,auto_now_add=True)
    is_available = models.BooleanField(default=True)
    
    attractions = models.ManyToManyField(Attractions, blank=True)
    bathroom = models.ManyToManyField(Bathroom, blank=True)
    bedroom = models.ManyToManyField(Bedroom, blank=True)
    cleaning = models.ManyToManyField(Cleaning, blank=True)
    entertainment = models.ManyToManyField(Entertainment, blank=True)
    family = models.ManyToManyField(Family, blank=True)
    facilities = models.ManyToManyField(Facilities, blank=True)
    heating_and_cooling = models.ManyToManyField(HeatingAndCooling, blank=True)
    internet_and_office = models.ManyToManyField(InternetAndOffice, blank=True)
    kitchen_and_dining = models.ManyToManyField(KitchenAndDining, blank=True)
    outdoors = models.ManyToManyField(Outdoors, blank=True)
    parking = models.ManyToManyField(Parking, blank=True)
    safety = models.ManyToManyField(Safety, blank=True)
    services = models.ManyToManyField(Services, blank=True)

    class Meta:
        ordering = ('title',)
        verbose_name_plural = 'Properties'
    
    def __str__(self):
        return self.title


class PropertyImages(models.Model):
    property = models.ForeignKey(Property,default=None, on_delete=models.CASCADE)
    images = models.FileField(upload_to="property")

    class Meta:
        verbose_name_plural = 'Property Images'

    def __str__(self):
        return self.property.title
    
# ---------------- END OF PROPERTY RELATED ------------------------





# ------------------------ BOOKING --------------------------------
class Booking(models.Model):
    # user
    # property_name = models.ManyToManyField(Property)
    property_name = models.CharField(max_length=250)
    check_in = models.DateField()
    check_out = models.DateField()
    no_of_beds = models.IntegerField()
    no_of_guests = models.IntegerField()

    class Meta:
        verbose_name_plural = 'Bookings'

    def __str__(self):
        return self.property_name
# ----------------------- END OF BOOKING --------------------------






# -------------------------- REVIEWS -----------------------------
class Reviews(models.Model):
    # user
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)
    review = models.TextField()

    class Meta:
        verbose_name_plural = 'Reviews'
# ----------------------- END OF REVIEWS -----------------------
