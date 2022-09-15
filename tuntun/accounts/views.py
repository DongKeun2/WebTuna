from django.shortcuts import render
from rest_framework import generics 
from .serializers import *
from .models import *

# Create your views here.

# 회원가입
class UserCreate(generics.CreateAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSignupSerializer