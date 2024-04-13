from django.urls import include, path
from rest_framework import routers
from django.contrib import admin

from api import views  
from rest_framework.authtoken import views as auth_views



router = routers.DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'products', views.ProductViewSet)




urlpatterns = [
    path('api/', include(router.urls)),
    path('', include('rest_framework.urls')),
    path("admin/", admin.site.urls),
    path("login/", views.login),
    path("signup/", views.signup),
    path("test_token/",views.test_token),

]
