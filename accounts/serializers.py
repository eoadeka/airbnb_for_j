from .models import User
from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer


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
    avatar = serializers.ImageField()

    class Meta:
        model = User

    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.firstname = self.data.get('firstname')
        user.lastname = self.data.get('lastname')
        user.avatar = self.data.get('avatar')
        user.save()
        return user
