from .models import User
from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
# from django.utils.translation import ugettext_lazy as _
from rest_framework_simplejwt.settings import api_settings
# from rest_framework.permissions import IsAuthenticated
# from PIL import Image

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'firstname',
            'lastname',
            'avatar',
            'is_active',
            'is_staff',
            'created_at',
            'updated_at'
        ]
        read_only_field = [
            'is_active',
            'created_at',
            'updated_at'
        ]
    

class UserRegisterSerializer(RegisterSerializer):
    username = None
    firstname = serializers.CharField(required=True)
    lastname = serializers.CharField(required=True)
    avatar = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = User

    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.firstname = self.data.get('firstname')
        user.lastname = self.data.get('lastname')
        user.avatar = request.FILES.get('avatar')
        user.save()
        return user


class UserDetailsSerializer(UserDetailsSerializer):

    class Meta:
        model = User
        fields = '__all__'
        # read_only_fields = ('id', 'email', 'firstname', 'lastname', 'avatar')
        # permission_classes = (IsAuthenticated,)


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'email', 'password')

# class Profile(serializers.ModelSerializer):
#     user = UserDetailsSerializer()
#     class Meta:
#         model = userProfileModel
#         fields = ('user',)