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
from django.urls import path, re_path, include
from django.conf.urls.static import static
from django.conf import settings
from accounts.views import *
from airbnb_app import views
from django.contrib.auth.views import LogoutView
from dj_rest_auth.registration.views import VerifyEmailView, ConfirmEmailView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# urlpatterns = router.urls + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# handler404 = 'airbnb_app.views.handler404'
# handler500 = 'airbnb_app.views.my_custom_error_view'


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(('airbnb.routers', 'airbnb'), namespace='airbnb_api')),
    path('', include('frontend.urls')),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/v1/users/', include('accounts.urls')),
    # path('accounts/', include('django.contrib.auth.urls')),
    path('tight/', include('allauth.urls')),
    
    path('dj-rest-auth/registration/account-confirm-email/<str:key>/',ConfirmEmailView.as_view(),), # Needs to be defined before the registration path

    path('verify-email/', VerifyEmailView.as_view(), name='rest_verify_email'),
    path('account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(), name='account_confirm_email'),

    path('dj-rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('dj-rest-auth/twitter/', TwitterLogin.as_view(), name='twitter_login'),
    path('dj-rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('logout', LogoutView.as_view()),



    path('airbnb/', include('airbnb_app.urls')),
    path('amenities/', include('amenities.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# ]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
#     urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
