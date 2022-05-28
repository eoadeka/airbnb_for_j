from cgitb import lookup
from django.shortcuts import render
from django.http import HttpResponse
from .serializers import *
from .models import User
from .forms import *
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
# from rest_auth.registration.views import RegisterView
# Facebook
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter

# Twitter
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from dj_rest_auth.social_serializers import TwitterLoginSerializer

# Google
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView, RegisterView

# from john_airbnb.accounts import serializers

# Create your views here.
def main(request):
    return HttpResponse("<h1>Accounts</h1>")

class UserViewSet(viewsets.ModelViewSet):
    http_method_names = ['get']
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    # ordering_fields = ['email']
    ordering = ['email']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]

        obj = User.objects.get(lookup_field_value)
        self.check_object_permissions(self.request, obj)

        return obj

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

class TwitterLogin(SocialLoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter

# class GoogleLogin(SocialLoginView): # if you want to use Authorization Code Grant, use this
#     adapter_class = GoogleOAuth2Adapter
#     callback_url = CALLBACK_URL_YOU_SET_ON_GOOGLE eg localhost link
#     client_class = OAuth2Client

    # url
    # https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=<CALLBACK_URL_YOU_SET_ON_GOOGLE>&prompt=consent&response_type=code&client_id=<YOUR CLIENT ID>&scope=openid%20email%20profile&access_type=offline


class GoogleLogin(SocialLoginView): # if you want to use Implicit Grant, use this
    adapter_class = GoogleOAuth2Adapter
    
    # url
    # https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=<CALLBACK_URL_YOU_SET_ON_GOOGLE>&prompt=consent&response_type=token&client_id=<YOUR CLIENT ID>&scope=openid%20email%20profile

class RegisterView(RegisterView):
    serializer_class = UserRegisterSerializer
    form = UserRegisterForm