

from django.urls import path, re_path
from .views import index
from django.conf.urls.static import static


urlpatterns = [
    # re_path(r".*", index),
    path('', index, name='home'),
    path('about', index),
    path('cities', index),
    path('cities/<slug:slug>', index),
    path('properties', index),
    path('properties/<str:id>/<slug:slug>', index),

    path('login', index),
    path('logout', index),
    path('signup', index),
    path('profile', index)
]
