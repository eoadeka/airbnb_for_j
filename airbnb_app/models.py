from turtle import title
from django.db import models

# Create your models here.
# class booking: check-in, check-out, no of beds, no. of guests
# keywords for filtering apts

class Apt(models.Model):
    # title, images, location, utilities, apt type, price
    # Utilities: wi-fi, housekeeping, gym, laundry
    # Apt type: 
    title = models.CharField(max_length=120)
    location = models.CharField(max_length=500)

    def __str__(self):
        return self.title

# class Booking(models.Model):
#     apt_title = models.CharField(max_length=250)
#     check_in = models.DateField()
#     check_out = models.DateField()
#     no_of_beds = models.IntegerField()
#     no_of_guests = models.IntegerField()

