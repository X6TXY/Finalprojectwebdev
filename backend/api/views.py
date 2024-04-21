from django.http import JsonResponse, Http404
from django.shortcuts import get_object_or_404
from api.models import Category, Product, Review,User
from rest_framework.parsers import JSONParser

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.views.decorators.csrf import csrf_exempt
from .serializers import CategorySerializer, ProductSerializer,ReviewSerializer,UserSerializer
from rest_framework.permissions import IsAuthenticated

# 3 FBV views
@csrf_exempt
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories,many=True)
        return JsonResponse(serializer.data,safe=False)
    
@csrf_exempt
def category_detail(request,id):
    category = get_object_or_404(Category,id=id)
    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return JsonResponse(serializer.data)
    
@csrf_exempt
def category_prodcuts(request,id):
    category = get_object_or_404(Category,id=id)
    products = category.products.all()
    data = {'products':list(products.values())}
    return JsonResponse(data)



# CBV 5 views

from rest_framework.permissions import IsAuthenticated

class ProductList(APIView):
    

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    


class ProductPost(APIView):

    def post(self, request):
        data = JSONParser().parse(request)
        serializer = ProductSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class ProductDetail(APIView):
    def get_object(self,id):
        try:
            return Product.objects.get(pk=id)
        except Product.DoesNotExist:
            raise Http404
    

    def get(self,request,id):
        product = self.get_object(id)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    
    def put(self,request,id):
        product= self.get_object(id)
        serializer = ProductSerializer(product,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,id):
        product = self.get_object(id)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ReviewList(APIView):

    def get(self,request):
        reviews = Review.objects.all()
        serializer = ReviewSerializer(reviews,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        data = JSONParser().parse(request)
        serializer = ReviewSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class ReviewDetial(APIView):

    def get_object(self,id):
        try:
            return Review.objects.get(pk=id)
        except Review.DoesNotExist:
            raise Http404
        
    def get(self,request,id):
        review = self.get_object(id)
        serializer = ReviewSerializer(review)
        return Response(serializer.data)
    
    def put(self,request,id):
        review = self.get_object(id)
        serializer = ReviewSerializer(review,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,id):
        review  = self.get_object(id)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    


class UserSignUpAPIView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)