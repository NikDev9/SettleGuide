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

#firebase config json data
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

#firebase initialization
firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()
dataRef = firebase.database()

#Login using firebase authentication
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
        province = user_data['province']
        return Response({"userId": uid, "name": name, "isAdmin": admin, "province": province})
    except:
        return Response({"userId":''})

#Get user data or create new user in the database
@api_view(['GET', 'POST'])
@csrf_exempt
def UserData(request):
    #get all users from the database
    if request.method == 'GET':
        users_ref = dataRef.child('user/')
        user_data = users_ref.get().val()
        return Response(user_data)

    #create new user using firebase auth and store in realtime database
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
            
#get home page data according to user's province selection
@api_view(['POST'])
@csrf_exempt
def getHomeData(request):
    if request.method == 'POST':
        province = request.data['prov']
        home_ref = dataRef.child('home/'f'{province}')
        home_data = home_ref.get().val()

        return Response(home_data)

#get all the channels, a user is member of
@api_view(['POST'])
@csrf_exempt
def getCommunityData(request):
    if request.method == 'POST':
        userId = request.data['userId']
        comm_ref = dataRef.child('user/'f'{userId}''/community/')
        comm_data = comm_ref.get().val()

        return Response(comm_data)
        
#get all messages of selected community
@api_view(['POST'])
@csrf_exempt
def getChannelData(request):
    if request.method == 'POST':
        id = request.data['id']
        channel_ref = dataRef.child('community/'f'{id}')
        channel_data = channel_ref.get().val()

        return Response(channel_data)

#save a message sent in a community along with time, userId and username
@api_view(['POST'])
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

#create community by admin
@api_view(['POST'])
@csrf_exempt
def createCommunity(request):
    if request.method == 'POST':
        msg = request.data['msg']
        name = request.data['name']
        info = request.data['info']
        time = request.data['time']
        userId = request.data['userId']
        comm_ref = dataRef.child('community/')
        data1 = comm_ref.get().val()
        len1 = len(data1)

        #community is added to the database
        postdata = {'adminId': userId, 'name': name, 'info': info, 'chId': len1}
        comm_ref2 = dataRef.child('community/'f'{len1}')
        comm_ref2.set(postdata)
        
        #initial message is saved in the messages array of the newly created community
        postdata2 = {'msg': msg, 'time': time, 'userId': userId, 'username': name}
        commMsg_ref = dataRef.child('community/'f'{len1}''/messages/0')
        commMsg_ref.set(postdata2)

        #community is also added to the list of member communities inside that user's object.
        userComm_ref = dataRef.child('user/'f'{userId}''/community/')
        data2 = userComm_ref.get().val()
        len2 = len(data2)
        postdata3 = {'info': info, 'channelId': len1, 'name': name}
        userComm_ref2 = dataRef.child('user/'f'{userId}''/community/'f'{len2}')
        userComm_ref2.set(postdata3)

        return Response(STATUS)

#fetches communities for a user of which the user is not member of and hasn't sent a join request
@api_view(['POST'])
@csrf_exempt
def fetchAllComm(request):
    if request.method == 'POST':
        #get userId
        userId = request.data['userId']
        chId = []
        response = []
        #gets all the communities and stores in an array
        comm_ref = dataRef.child('community/')
        comm_data = comm_ref.get().val()

        for data in comm_data:
            #if value remains 1, then don't add to final array that has to be sent in the response
            addChannel = 1
            #if the user is admin of this community, don't add community to response array
            if data['adminId'] == userId:
                addChannel = 0
                continue
            else:
                chId = data['chId']
                try:
                    #check if the user has already sent a request for this community
                    request_ref = dataRef.child('community/'f'{chId}''/requests')
                    request_data = request_ref.get().val()
                    for data1 in request_data:
                        #don't add community to response array if join request is found 
                        if(data1['userId'] == userId):
                            addChannel = 0
                            break
                except:
                    pass

                try:
                    #check if user is member of the community
                    member_ref = dataRef.child('community/'f'{chId}''/members')
                    member_data = member_ref.get().val()
                    for data2 in member_data:
                        #don't add community to response array if already a member
                        if(data2['memberId'] == userId):
                            addChannel = 0
                            break
                except:
                    pass
                if bool(addChannel):
                    response.append(data)

    return Response(response)

#add user's join request in a community
@api_view(['POST'])
@csrf_exempt
def joinRequest(request):
    if request.method == 'POST':
        userId = request.data['userId']
        commId = request.data['commId']
        comm_ref = dataRef.child('community/'f'{commId}''/requests/')
        try:
            #determining the key at which the request will be inserted inside the requests array of the community
            comm_data = comm_ref.get().val()
            length = len(comm_data)
        except:
            length = 0
        userRef = dataRef.child('user/'f'{userId}')
        userdata = userRef.get().val()
        comm_ref2 = dataRef.child('community/'f'{commId}''/requests/'f'{length}')
        postdata = {'firstname': userdata['firstname'], 'lastname': userdata['lastname'], 'dept': userdata['dept'], 'major': userdata['major'], 'uni': userdata['university'], 'userId': userId, 'approved': 0, 'rejected': 0, 'reqId': length}
        comm_ref2.set(postdata)

        return Response(STATUS)

#get admin's communities and corresponding join requests
@api_view(['POST'])
@csrf_exempt
def fetchCommAdmin(request):
    if request.method == 'POST':
        userId = request.data['userId']
        comm_ref = dataRef.child('community/')
        comm_data = comm_ref.get().val()
        adminData = []
        postdata = []
        for data in comm_data:
            if data['adminId'] == userId:
                adminData.append(data)
        for data in adminData:
            try:
                data['requests']
                postdata.append(data)
            except:
                continue

        return Response(postdata)

#fetch only those join requests of a community for the admin which have neither been approved nor been rejected
@api_view(['POST'])
@csrf_exempt
def fetchRequests(request):
    if request.method == 'POST':
        chId = request.data['chId']
        comm_ref = dataRef.child('community/'f'{chId}''/requests/')
        comm_data = comm_ref.get().val()
        senddata = []
        for data in comm_data:
            try:
                if data['approved'] == 0 and data['rejected'] == 0:
                    senddata.append(data)
            except:
                pass

        return Response(senddata)

#approve user's join request
@api_view(['POST'])
@csrf_exempt
def approveUser(request):
    if request.method == 'POST':
        chId = request.data['chId']
        reqId = request.data['reqId']
        userId = request.data['userId']

        #update the 'approved' field where the request is stored
        comm_ref = dataRef.child('community/'f'{chId}/')
        data = comm_ref.get().val()
        chName = data['name']
        info = data['info']
        comm2_ref = dataRef.child('community/'f'{chId}''/requests/'f'{reqId}')
        comm2_ref.update({'approved': 1})

        #add the community to the community array of the user's object 
        postdata = {'channelId': chId, 'info': info, 'name': chName}
        user_ref = dataRef.child('user/'f'{userId}''/community/')
        userdata = user_ref.get().val()
        length = len(userdata)
        user_ref2 = dataRef.child('user/'f'{userId}''/community/'f'{length}')
        user_ref2.set(postdata)

        return Response(STATUS)

#reject user request
@api_view(['POST'])
@csrf_exempt
def rejectUser(request):
    if request.method == 'POST':
        chId = request.data['chId']
        reqId = request.data['reqId']

        #set 'rejected' field to 1 where the request is stored
        comm2_ref = dataRef.child('community/'f'{chId}''/requests/'f'{reqId}')
        comm2_ref.update({'rejected': 1})

        return Response(STATUS)

#save user's province selection after signup
@api_view(['POST'])
@csrf_exempt
def saveProvince(request):
    if request.method == 'POST':
        prov = request.data['prov']
        userId = request.data['userId']

        user_ref = dataRef.child('user/'f'{userId}')
        user_ref.update({'province': prov})

        return Response(STATUS)