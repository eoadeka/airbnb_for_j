from rest_framework import routers
from accounts import views as accounts
from airbnb_app import views as airbnb_app

router = routers.DefaultRouter()

# accounts
router.register(r'accounts', accounts.UserViewSet, 'account')
# cities
router.register(r'cities', airbnb_app.CitiesView, 'city')

# properties
router.register(r'properties', airbnb_app.PropertiesView, 'property')
router.register(r'propertyImages', airbnb_app.PropertyImagesView, 'propertyImages')


urlpatterns = [
    *router.urls
]