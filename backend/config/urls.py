
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    # Product APIs
    path("api/", include("products.urls")),

    # Authentication APIs
    path("api/auth/", include("accounts.urls")),
]
