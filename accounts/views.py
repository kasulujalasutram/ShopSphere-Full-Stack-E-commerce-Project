
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Profile
from .serializers import (
    RegisterSerializer,
    ProfileSerializer,
)


# Customer Registration API
class RegisterAPIView(generics.CreateAPIView):

    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


# Customer Profile API
class ProfileAPIView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get_profile(self, user):
        profile, created = Profile.objects.get_or_create(
            user=user
        )
        return profile

    # GET customer profile
    def get(self, request):

        profile = self.get_profile(request.user)

        serializer = ProfileSerializer(profile)

        return Response(serializer.data)

    # UPDATE customer profile
    def put(self, request):

        profile = self.get_profile(request.user)

        serializer = ProfileSerializer(
            profile,
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data)

    # PARTIAL UPDATE customer profile
    def patch(self, request):

        profile = self.get_profile(request.user)

        serializer = ProfileSerializer(
            profile,
            data=request.data,
            partial=True
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(serializer.data)
