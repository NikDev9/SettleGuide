from rest_framework import serializers
from .models import User
from .models import Home

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'isAdmin']

class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Home
        fields = ['id', 'heading', 'img', 'info', 'link']

    