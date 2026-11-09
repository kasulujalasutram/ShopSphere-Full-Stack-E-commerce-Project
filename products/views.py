
from rest_framework import generics, permissions
from rest_framework.permissions import SAFE_METHODS

from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer


class ReadOnlyOrAdminPermission(permissions.BasePermission):
    """
    Allow everyone to read.
    Only admin users can create, update or delete.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        return (
            request.user
            and request.user.is_authenticated
            and request.user.is_staff
        )


class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer
    permission_classes = [ReadOnlyOrAdminPermission]


class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.select_related(
        "category"
    ).all().order_by("-created_at")

    serializer_class = ProductSerializer
    permission_classes = [ReadOnlyOrAdminPermission]


class ProductDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.select_related(
        "category"
    ).all()

    serializer_class = ProductSerializer
    permission_classes = [ReadOnlyOrAdminPermission]
