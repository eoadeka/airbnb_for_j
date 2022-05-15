from django.db import models

# attractions nearby: beach access, ski slopes
# Amenity: wi-fi, housekeeping, gym, laundry, pool

# Create your models here.
# ---------------------- AMENITIES ----------------------------------
# class AmenitiesManager(models.Manager):

class AmenityBaseModel(models.Model):
    amenity = models.CharField(max_length=250, default="")

    class Meta:
        abstract = True
    
    def __str__(self):
        return self.amenity


class Attractions(AmenityBaseModel):
    class Meta:
        verbose_name_plural = 'Attractions'


class Bathroom(AmenityBaseModel):
    class Meta:
        verbose_name_plural = 'Bathroom'


class Bedroom(AmenityBaseModel):
    class Meta:
        verbose_name_plural = 'Bedroom'


class Cleaning(AmenityBaseModel):
    class Meta:
        verbose_name_plural = 'Cleaning'


class Entertainment(AmenityBaseModel):
    class Meta:
        verbose_name_plural = 'Entertainment'


class Family(AmenityBaseModel):
    class Meta:
        verbose_name_plural = 'Family'


class Facilities(AmenityBaseModel):
    class Meta:
        verbose_name_plural = 'Facilities'



class HeatingAndCooling(AmenityBaseModel):
    class Meta:
        verbose_name_plural = 'Heating And Cooling'


class InternetAndOffice(AmenityBaseModel):
    class Meta:
        verbose_name_plural = 'Internet And Office'


class KitchenAndDining(AmenityBaseModel):
    class Meta:
        verbose_name_plural = 'Kitchen and Dining'


class Outdoors(AmenityBaseModel):
    class Meta:
        verbose_name_plural = 'Outdoors'


class Parking(AmenityBaseModel):
    class Meta:
        verbose_name_plural = 'Parking'


class Safety(AmenityBaseModel):
    class Meta:
        verbose_name_plural = 'Safety'


class Services(AmenityBaseModel):
    class Meta:
        verbose_name_plural = 'Services'
# --------------------- END OF AMENITES ---------------------
