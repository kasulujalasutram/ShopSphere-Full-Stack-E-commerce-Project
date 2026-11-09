from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import RegisterAPIView, ProfileAPIView
from .auth_serializers import EmailTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class EmailLoginAPIView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer


urlpatterns = [
    path("register/", RegisterAPIView.as_view(), name="register"),
    path("login/", EmailLoginAPIView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("profile/", ProfileAPIView.as_view(), name="profile"),
]