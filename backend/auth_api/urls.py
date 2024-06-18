from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
urlpatterns = [
    path('gettoken/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refreshtoken/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='register'),
]