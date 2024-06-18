from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')
        extra_kwargs = {
            'password': {'write_only': True},
            'password2': {'write_only': True},
        }

    def validate(self, attrs):
        username = attrs.get('username', '')
        email = attrs.get('email', '')
        password = attrs.get('password', '')
        password2 = attrs.get('password2', '')

        # Check if username already exists
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({'username': 'This username is already taken.'})

        # Check if email already exists
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError({'email': 'This email is already registered.'})

        # Check if passwords match
        if password != password2:
            raise serializers.ValidationError({'password': 'Password fields do not match.'})

        return attrs

    def create(self, validated_data):
        validated_data.pop('password2') 
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user_id'] = user.id
        token['username'] = user.username
        return token
