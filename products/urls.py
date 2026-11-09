from django.urls import path
from .views import (
    CategoryListCreateAPIView,
    ProductListCreateAPIView,
    ProductDetailAPIView,
)

urlpatterns = [
    path("categories/", CategoryListCreateAPIView.as_view(), name="category-list-create"),
    path("products/", ProductListCreateAPIView.as_view(), name="product-list-create"),
    path("products/<int:pk>/", ProductDetailAPIView.as_view(), name="product-detail"),
]