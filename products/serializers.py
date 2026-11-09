
from rest_framework import serializers
from .models import Category, Product


# Category Serializer
class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "description",
            "created_at",
        ]


# Product Serializer
class ProductSerializer(serializers.ModelSerializer):

    # Display category details when retrieving products
    category = CategorySerializer(read_only=True)

    # Accept category ID when creating or updating products
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source="category",
        write_only=True,
    )

    class Meta:
        model = Product

        fields = [
            "id",
            "category",
            "category_id",
            "name",
            "description",
            "price",
            "original_price",
            "image",
            "stock",
            "rating",
            "reviews_count",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]

    # Validate product price
    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Product price must be greater than zero."
            )
        return value

    # Validate rating
    def validate_rating(self, value):
        if value < 0 or value > 5:
            raise serializers.ValidationError(
                "Rating must be between 0 and 5."
            )
        return value

    # Validate original price
    def validate(self, data):
        price = data.get(
            "price",
            getattr(self.instance, "price", None)
        )

        original_price = data.get(
            "original_price",
            getattr(self.instance, "original_price", None)
        )

        if (
            original_price is not None
            and price is not None
            and original_price < price
        ):
            raise serializers.ValidationError({
                "original_price":
                    "Original price must be greater than or equal to selling price."
            })

        return data
