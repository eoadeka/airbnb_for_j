

from django.urls import path, re_path
from .views import index
from django.conf.urls.static import static


urlpatterns = [
    # re_path(r".*", index),
    path('*', index),

    # Admin
    path('loose/admin', index),
    
    # Authentication
    path('login', index),
    path('logout', index),
    path('signup', index),
    path('user/password-change', index),
    path('user/password-reset', index),
    path('user/password-reset-confirm', index),

    # User
    path('user/deactivate', index),
    path('user/profile', index),

    # Pages
    path('', index, name='home'),
    path('about-us', index),
    path('contact-us', index),
    path('cities', index),
    path('cities/<slug:slug>', index),
    path('amenities', index),
    path('properties', index),
    path('properties/<slug:slug>/<str:id>', index),

    path('payment/', index),
    path('payment/confirmation', index),
    path('cancel-reservation/', index),
    # path('payment/<str:user_id>/<str:property_id>', index),

   
]
