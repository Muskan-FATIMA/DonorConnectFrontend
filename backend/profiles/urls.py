from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet

profile_router = DefaultRouter()
profile_router.register('profile', ProfileViewSet)

urlpatterns = [
    path('', include(profile_router.urls))
]
