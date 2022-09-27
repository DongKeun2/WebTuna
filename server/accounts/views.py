from django.shortcuts import render
from rest_framework import generics
from webtoons.models import Genre

from webtoons.serializers import WebtoonListSerializer 
from .serializers import *
from .models import *
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator

# Create your views here.

# 회원가입
class UserCreate(generics.CreateAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSignupSerializer


# 비밀번호 수정하기
@api_view(['PUT'])
def ProfileUpdate(request):
    member = get_object_or_404(get_user_model(), id=request.user.id)
    new_password = request.data['password']
    member.set_password(new_password)
    member.save()
    return Response(True)


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
    webtoons = member.liked_webtoons.all()
    webtoons_length = len(webtoons)
    image_types = {
        'image_type1':0,
        'image_type2':0,
        'image_type3':0,
        'image_type4':0,
        'image_type5':0,
        'image_type6':0
    }
    
    genre_types = {
        '로맨스':0,
        '판타지':0,
        '드라마':0,
        '스릴러':0,
        '일상':0,
        '액션':0,
        '무협/사극':0,
        '스포츠':0,
        '개그':0,
        '감성':0,
        '소년':0,
        'BL':0
    }

    if webtoons_length:
        for webtoon in webtoons:
            image_types['image_type1'] += webtoon.image_type1
            image_types['image_type2'] += webtoon.image_type2
            image_types['image_type3'] += webtoon.image_type3
            image_types['image_type4'] += webtoon.image_type4
            image_types['image_type5'] += webtoon.image_type5
            image_types['image_type6'] += webtoon.image_type6
            genres = webtoon.genres.all()
            for genre in genres:
                genre_type = genre.genre_type
                if genre_type not in ['스토리','옴니버스','에피소드']:
                    genre_types[genre_type] += 1
    
    else:
        webtoons = member.liked_thumbnail.split(",")
        webtoons_length = len(webtoons)
        for i in webtoons:
            webtoon = Webtoon.objects.get(webtoon_id=i)
            image_types['image_type1'] += webtoon.image_type1
            image_types['image_type2'] += webtoon.image_type2
            image_types['image_type3'] += webtoon.image_type3
            image_types['image_type4'] += webtoon.image_type4
            image_types['image_type5'] += webtoon.image_type5
            image_types['image_type6'] += webtoon.image_type6
            
    
    for i in range(1,7):
        image_types[f'image_type{i}'] = round(image_types[f'image_type{i}'] / webtoons_length , 2)
    
    sort_genre = sorted(genre_types.items(), key=lambda x:x[1], reverse=True)
    genre_list = {}
    for i in range(3):
        if sort_genre[i][1]:
            genre_list[sort_genre[i][0]] = sort_genre[i][1]
    
        
    serializer = ProfileSerializer(member)
    return Response({'data':serializer.data, 'image_type':image_types, 'genre_list':genre_list}, status.HTTP_200_OK)


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
    if user_email == '':
        return Response(False)
    
    if Member.objects.filter(email=user_email).exists():
        return Response(False)

    return Response(True)
    

# 닉네임 중복 체크하기
@api_view(['POST'])
def NicknameCheck(request):
    user_nickname = request.data['nickname']
    if user_nickname == '':
        return Response(False)
                        
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


# @api_view(['GET'])
# def TestUser(request):
#     Webtoon
    
<<<<<<< HEAD
#     serializer = TestUserSerializer(member)
#     # member_lst = Member_View_Webtoons.objects.filter(member_id=request.user.id).order_by('id')
#     # print(member_lst)
    
<<<<<<< HEAD
<<<<<<< HEAD
# @api_view(['POST'])
=======
@api_view(['GET'])
def Test_req(request):
    print(request.user)
>>>>>>> 2ee8aa1 (fix: profile 수정)
=======
#     return Response(serializer.data)
>>>>>>> c9803bc (fix : profile 수정, email,nickname 중복확인 수정)
=======
#     return Response(True)
>>>>>>> 70f416e (fix : log남기기 수정)
