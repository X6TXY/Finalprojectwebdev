from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Product

from rest_framework import serializers




class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ["id", "username", "password", "email"]

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name', 'description'] 

class ProductSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    category_details = CategorySerializer(source='category', read_only=True)

    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), write_only=True
    )

    image = serializers.ImageField(max_length=None, allow_empty_file=True, required=False)

    class Meta:
        model = Product
        fields = [
            'id', 'user', 'name', 'image', 'description', 'brand',
            'category', 'category_details', 'rating', 'price', 'createdAt'
        ]
        extra_kwargs = {'_id': {'read_only': True}}
