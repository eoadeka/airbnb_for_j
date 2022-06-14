from pickle import NONE
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.dispatch import receiver
from django.db.models.signals import post_save
# from PIL import Image
# from django.contrib.auth import get_user_model
# User = get_user_model()

# Create choices here
GENDER_CHOICES = (
    ('M', 'Male'),
    ('F', 'Female'),
    ('O', 'Other')
)

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Create and save a User with the given email and password."""
      
        if email is None:
            raise TypeError('Users must have email.')

        user=self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None):
        """ Create and return a `User` with superuser (admin) permissions. """
        if password is None:
            raise TypeError('Superusers must have a password.')
        if email is None:
            raise TypeError('Superusers must have a email.')

        user = self.create_user(email=email, password=password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user

class User(AbstractBaseUser, PermissionsMixin):
    username = None
    email = models.EmailField(db_index=True, unique=True, null=True, blank=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    # avatar = models.ImageField(default="default.png", upload_to="images/profile_pics")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =  []

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return "{} {}".format(self.first_name, self.last_name)

    # @property
    # def is_active(self):
    #     return self.is_active

    # @property
    # def is_staff(self):
    #     return self.is_staff


# Preferences
# # Language
# # Currency
# # Timzone



# class UserProfile(models.Model):
#     # gender, dob, address, emergency contact
#     # add phone number to update profile
#     # ondelete=models.SET_NULL : Field will be nullable. If a User is deleted, their comments will be kept
#     # User object contains username, password, email, first_name, last_name

#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="userprofile")
#     # user = models.OneToOneField(User, related_name="userprofile", help_text=" ")
#     # avatar = models.ImageField(default="default.png", upload_to="images/profile_pics")
#     gender = models.CharField(choices=GENDER_CHOICES, max_length=20)
#     dob = models.DateField()
#     address = models.TextField()
#     # email_verified

#     def __str__(self):
#         return "{}'s Profile".format(self.user.username)

#     def save(self):
#         super().save()
    


# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         UserProfile.objects.create(user=instance)

# @receiver(post_save, sender=UserProfile)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()