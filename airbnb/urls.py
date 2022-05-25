"""airbnb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from accounts import views
from airbnb_app import views


# urlpatterns = router.urls + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# handler404 = 'airbnb_app.views.handler404'
# handler500 = 'airbnb_app.views.my_custom_error_view'


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(('airbnb.routers', 'airbnb'), namespace='airbnb_api')),
    path('', include('frontend.urls')),
    path('accounts/', include('accounts.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('airbnb/', include('airbnb_app.urls')),
    path('amenities/', include('amenities.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# ]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
#     urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
