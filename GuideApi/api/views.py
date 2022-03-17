import imp
from telnetlib import STATUS
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

@api_view(['POST'])
@csrf_exempt
def signIn(request):
    email = request.data['email']
    password = request.data['password']
    try:
        user = auth.sign_in_with_email_and_password(email,password)
        uid = user['localId']
        users_ref = dataRef.child('user/'f'{uid}')
        user_data = users_ref.get().val()
        name = user_data['firstname']
        admin = user_data['isAdmin']
        return Response({"userId": uid, "name": name, "isAdmin": admin})
    except:
        return Response({"userId":''})

@api_view(['GET', 'POST'])
@csrf_exempt
def UserData(request):
    if request.method == 'GET':
        users_ref = dataRef.child('user/')
        user_data = users_ref.get().val()
        return Response(user_data)

    elif request.method == 'POST':
        firstname = request.data['firstname']
        lastname = request.data['lastname']
        email = request.data['email']
        password = request.data['password']
        uni = request.data['university']
        dept = request.data['dept']
        major = request.data['major']
        isAdmin = 0
        postdata = {'email': f'{email}', 'isAdmin': isAdmin, 'password': f'{password}', 'firstname': f'{firstname}', 'lastname': f'{lastname}', 'university': f'{uni}', 'dept': f'{dept}', 'major': f'{major}'}
        
        try:
            user = auth.create_user_with_email_and_password(email,password)
            userId = user['localId']
            users_ref = dataRef.child('user/'f'{userId}')
            users_ref.set(postdata)
            return Response({'userId': userId, 'name': firstname, 'isAdmin': 0})
        except:
            return Response({'userId': ''})
        # users_ref.update({
        #     'username': f"{username}",
        #     'email': f"{email}",
        #     'password': f"{password}"
        # }) 
            
@api_view(['GET', 'POST'])
@csrf_exempt
def getHomeData(request):
    if request.method == 'GET':
        home_ref = dataRef.child('home/')
        home_data = home_ref.get().val()

        return Response(home_data)

@api_view(['GET', 'POST'])
@csrf_exempt
def getCommunityData(request):
    if request.method == 'POST':
        userId = request.data['userId']
        comm_ref = dataRef.child('user/'f'{userId}''/community/')
        comm_data = comm_ref.get().val()

        return Response(comm_data)
        
@api_view(['GET', 'POST'])
@csrf_exempt
def getChannelData(request):
    if request.method == 'POST':
        id = request.data['id']
        channel_ref = dataRef.child('community/'f'{id}')
        channel_data = channel_ref.get().val()

        return Response(channel_data)

@api_view(['GET', 'POST'])
@csrf_exempt
def sendMsg(request):
    if request.method == 'POST':
        msg = request.data['msg']
        channelId = request.data['channel']
        msgId = request.data['totalMsg']
        time = request.data['time']
        name = request.data['name']
        userId = request.data['userId']
        postdata = {'msg': msg, 'time': time, 'userId': userId, 'username': name}
        channel_ref = dataRef.child('community/'f'{channelId}''/messages/'f'{msgId}')
        channel_data = channel_ref.set(postdata)

        return Response(channel_data)

@api_view(['GET', 'POST'])
@csrf_exempt
def createCommunity(request):
    if request.method == 'POST':
        msg = request.data['msg']
        name = request.data['name']
        info = request.data['info']
        time = request.data['time']
        userId = request.data['userId']
        postdata = {'adminId': userId, 'name': name, 'lastMsg': msg, 'info': info}
        postdata2 = {'msg': msg, 'time': time, 'userId': userId, 'username': name}
        comm_ref = dataRef.child('community/')
        data1 = comm_ref.get().val()
        len1 = len(data1)
        comm_ref2 = dataRef.child('community/'f'{len1}')
        comm_ref2.set(postdata)
        
        commMsg_ref = dataRef.child('community/'f'{len1}''/messages/0')
        commMsg_ref.set(postdata2)

        userComm_ref = dataRef.child('user/'f'{userId}''/community/')
        data2 = userComm_ref.get().val()
        len2 = len(data2)
        postdata3 = {'info': info, 'channelId': len1, 'name': name}
        userComm_ref2 = dataRef.child('user/'f'{userId}''/community/'f'{len2}')
        userComm_ref2.set(postdata3)

        return Response(STATUS)
    
