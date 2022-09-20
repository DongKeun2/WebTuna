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


# 프로필 수정하기
class ProfileUpdate(generics.UpdateAPIView):
    lookup_field = 'id'
    queryset = Member.objects.all()
    serializer_class = ProfileUpdateSerializer
    

<<<<<<< HEAD
<<<<<<< HEAD
# 프로필 보기
=======
# class UserLogin(LoginView):
#     permission_classes = (AllowAny,)
#     serializer_class = LoginSerializer
    
#     def post(self, request):
#         user = request.data

#         serializer = self.serializer_class(data=user)
#         serializer.is_valid(raise_exception=True)

#         return Response(serializer.data, status=status.HTTP_200_OK)



>>>>>>> 4ad957b (fix:로그인 수정)
=======
# 프로필 정보 받기
>>>>>>> f81c1cd (fix: 회원 로그인/로그아웃 등 수정)
@api_view(['GET'])
def Profile(request):
    member = get_object_or_404(get_user_model(), id=request.user.id)
    serializer = ProfileSerializer(member)
    return Response(serializer.data)


# 메인 프로필 정보 받기
@api_view(['GET'])
def MainProfile(request):
    member = get_object_or_404(get_user_model(), id=request.user.id)
    serializer = ProfileMainSerializer(member)
    return Response(serializer.data)


# 이메일 중복 체크하기
@api_view(['POST'])
def EmailCheck(request):
    user_email = request.data['email']
    if Member.objects.filter(email=user_email).exists():
        return Response(False)

    return Response(True)
    

# 닉네임 중복 체크하기
@api_view(['POST'])
def NicknameCheck(request):
    user_nickname = request.data['nickname']
    if Member.objects.filter(nickname=user_nickname).exists():
        return Response(False)

    return Response(True)


# 회원 수정페이지 비밀번호 확인
@api_view(['POST'])
def PasswordCheck(request):
    user_password = request.data['password']
    member = get_object_or_404(get_user_model(), id=request.user.id)
    
    if not member.check_password(user_password) :
        return Response(False)
    
    return Response(True)


# 찜한 웹툰 목록보기
@api_view(['GET'])
def LikeWebtoon(request, pageNum):
    member = get_object_or_404(get_user_model(), id=request.user.id)
    likewebtoons = member.liked_webtoons[pageNum*10:(pageNum+1)*10]
    serializer = MyLikedWebtoon(likewebtoons)
    return Response(serializer.data)
    
    
# @api_view(['POST'])