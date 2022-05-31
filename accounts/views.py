from cgitb import lookup
from django.shortcuts import render
from django.http import HttpResponse
from .serializers import *
from .models import User
from .forms import *
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
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
    http_method_names = ['post']
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

@api_view(['POST'])
class RegisterView(RegisterView):
    serializer_class = UserRegisterSerializer
    form = UserRegisterForm

    # def post(self,request):
    #     serializer = UserRegisterSerializer(data=request.data, files=request.FILES.get('file', None))
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)
    # http_method_names =  ['get','post','get']

    # def get(self, request, *args, **kwargs):
    #     serializer = UserSerializerWithToken(User.objects.all(), many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):

        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# def getRoutes(request):
#     routes = [
#         '/api/token/',
#         '/api/register/',
#         '/api/token/refresh/'
#     ]
#     return Response(routes)