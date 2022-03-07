import imp
from django.shortcuts import render, HttpResponse
from .models import User
from .models import Home
from .serializers import UserSerializer
from .serializers import HomeSerializer
from django.http import JsonResponse
import pyrebase
from rest_framework import viewsets, routers
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser
from django.http import JsonResponse

firebaseConfig = {
  "apiKey": "AIzaSyBGov8ncht1cTcLwkGK_GF96OPE9K3ylao",
  "authDomain": "settle-guide.firebaseapp.com",
  "databaseURL": "https://settle-guide-default-rtdb.firebaseio.com/",
  "projectId": "settle-guide",
  "storageBucket": "settle-guide.appspot.com",
  "messagingSenderId": "316706411717",
  "appId": "1:316706411717:web:441b28ef149c7d8668ccac",
  "measurementId": "G-8NM0G9MQ8J"
}

firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()
dataRef = firebase.database()

class UserViewSet(viewsets.ModelViewSet):
        queryset = User.objects.all()
        serializer_class = UserSerializer

class HomeViewSet(viewsets.ModelViewSet):
        queryset = Home.objects.all()
        serializer_class = HomeSerializer

def ReadData(request):
    uda = dataRef.child('user').get().val()
    return JsonResponse(uda, safe=False)

@api_view(['GET', 'POST'])
@csrf_exempt
def UserData(request):
    if request.method == 'GET':
        # udata = User.objects.all()


        # return JsonResponse(serializer.data, safe=False)

        users_ref = dataRef.child('user/')
        user_data = users_ref.get().val()
        #serializer = UserSerializer(user_data, many=True)

        return Response(user_data)

    elif request.method == 'POST':

        username = request.data['username']
        email = request.data['email']
        password = request.data['password']
        isAdmin = 0

        postdata = {'email': f'{email}', 'isAdmin': isAdmin, 'password': f'{password}', 'username': f'{username}'}
        
        users_ref = dataRef.child('user/')
        users_ref.push(postdata)
        # users_ref.update({
        #     'username': f"{username}",
        #     'email': f"{email}",
        #     'password': f"{password}"
        # })
            
        return Response(status=status.HTTP_201_CREATED)
            
        #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@csrf_exempt
def getHomeData(request):
    if request.method == 'GET':
        home_ref = dataRef.child('home/')
        home_data = home_ref.get().val()

        return Response(home_data)

    
