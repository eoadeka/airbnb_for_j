from rest_framework import routers
from accounts.views import UserViewSet
from airbnb_app import views as airbnb_app
# from accounts.views import UserViewSet
from core.views import LoginViewSet, RegistrationViewSet, RefreshViewSet


router = routers.DefaultRouter()

# USER
# router.register(r'user', UserViewSet, basename='user')


# accounts
router.register(r'users', UserViewSet, 'users')

# AUTHENTICATION
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/register', RegistrationViewSet, basename='auth-register')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')


# bookings
router.register(r'bookings', airbnb_app.BookingsView, 'booking')

# payments
router.register(r'payments', airbnb_app.PaymentsView, 'payment')

# cities
router.register(r'cities', airbnb_app.CitiesView, 'city')

# properties
router.register(r'properties', airbnb_app.PropertiesView, 'property')
router.register(r'propertyImages', airbnb_app.PropertyImagesView, 'propertyImages')


urlpatterns = [
    *router.urls
]