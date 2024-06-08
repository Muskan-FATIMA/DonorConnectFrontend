from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RequestViewSet

router = DefaultRouter()
router.register('request', RequestViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
