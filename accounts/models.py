from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
# from PIL import Image

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
    email = models.EmailField(db_index=True, unique=True, null=True, blank=True)
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    avatar = models.ImageField(default="default.png", upload_to="images/profile_pics")
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
        return "{} {}".format(self.firstname, self.lastname)

    # @property
    # def is_active(self):
    #     return self.is_active

    # @property
    # def is_staff(self):
    #     return self.is_staff
    


# class UserProfile(models.Model):
#     # ondelete=models.SET_NULL : Field will be nullable. If a User is deleted, their comments will be kept
#     # User object contains username, password, email, first_name, last_name

#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user", help_text=" ")
#     profile_picture = models.ImageField(upload_to="images/profile_pics")

#     def __str__(self):
#         return "{}'s Profile".format(self.user.username)

#     def save(self):
#         super().save()
    
