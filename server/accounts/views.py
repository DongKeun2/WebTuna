from django.shortcuts import render
from rest_framework import generics 
from .serializers import *
from .models import *
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

# Create your views here.

# 회원가입
class UserCreate(generics.CreateAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSignupSerializer


class ProfileUpdate(generics.UpdateAPIView):
    lookup_field = 'member_id'
    queryset = Member.objects.all()
    serializer_class = ProfileUpdateSerializer
    

@api_view(['GET'])
def Profile(request):
    Member = get_user_model()
    member = get_object_or_404(Member, member_id=request.user.member_id)
    serializer = ProfileSerializer(member)
    return Response(serializer.data)