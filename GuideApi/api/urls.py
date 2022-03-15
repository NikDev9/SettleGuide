from django.urls import path, include
from .views import HomeViewSet, UserViewSet
from rest_framework.routers import DefaultRouter
from .views import UserData, ReadData, getHomeData, getCommunityData, signIn

router = DefaultRouter()
# router.register('users', UserViewSet, basename='users')
#router.register('home', HomeViewSet, basename='home')
#router.register('userD', readData, basename='userD')
#router.register('users', UserData, basename='users')

urlpatterns = [
    path('', include(router.urls)),
    path('users/', UserData),
    path('home/', getHomeData),
    path('community/', getCommunityData),
    path('signin/', signIn),
    path('api-auth/', include('rest_framework.urls'))
]