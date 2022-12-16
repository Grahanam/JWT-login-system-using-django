from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model 
from base.serializers import UserSerializer,ImageSerializer
from base.models import Imageresize

# Create your views here.
User=get_user_model()

class customUserCreate(GenericAPIView):
    serializer_class=UserSerializer

    def post(self,request):
        user=request.data
        userdata=user.get('email')
        print(userdata)
        # formdata=request.POST.dict()
        # usert=formdata.get('usertype')
        # print(usert)
        serializer=self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.email
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes=[
        '/token',
        '/token/refresh'
    ]
    return Response(routes)




# @api_view(['POST'])
# def saveimage(request):
#     print(request.data)
#     serializer=ImageSerializer(data=request.data)
#     print(request.data)
#     if  serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data) 

@api_view(['POST'])
def saveimage(request):
        image=request.FILES.get('file')
        print(image)
        new_post=Imageresize.objects.create(thumbnail=image,medium=image,large=image,grayscale=image)
        new_post.save()
        return Response('done') 


@api_view(['GET'])
def getimages(request):
    image=Imageresize.objects.all()
    serializer=ImageSerializer(image,many=True)
    return Response(serializer.data)
    