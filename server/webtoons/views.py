from ast import keyword
from re import L
<<<<<<< HEAD
# from tkinter import image_types
=======
>>>>>>> 73c744d (fix : profile수정, 비밀번호 변경하기)
from django.shortcuts import render
<<<<<<< HEAD
<<<<<<< HEAD

# Create your views here.
=======
# from matplotlib.image import thumbnail
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests
import csv
from bs4 import BeautifulSoup
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
from webtoons.models import Webtoon, Genre, Author, Tag
=======
from .serializers import WebtoonSerializer
=======
from .serializers import WebtoonSerializer, RatingSerializer
>>>>>>> b8725e9 (feat: 웹툰 로그 / 웹툰 찜 / 웹툰 평점 api 구현)
=======
=======

from tuntun.settings import SWAGGER_SETTINGS
>>>>>>> bf925b8 (fix: webtoon search url 변경)
=======
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> dab37c5 (fix: webtoon search  좌우공백제거, 덮어씌우는 버그 수정, 가나다순 정렬 추가)
from .serializers import WebtoonSerializer, RatingSerializer, WebtoonListSerializer
>>>>>>> 9f3add1 (fix: 웹툰 전체 페이지 성능개선(WebtoonListSerializer 수정))
=======
=======
from accounts.models import Member_View_Webtoons

>>>>>>> 70f416e (fix : log남기기 수정)
from .serializers import WebtoonSerializer, RatingSerializer, WebtoonListSerializer, SearchWebtoonSerializer
>>>>>>> c4b2854 (feat: 웹툰 이미지 검색 api 구현)
from webtoons.models import Webtoon, Genre, Author, Tag, Day, Platform
from django.shortcuts import get_object_or_404, get_list_or_404
from django.core.paginator import Paginator
<<<<<<< HEAD
>>>>>>> 5965471 (feat: 웹툰 상세,  전체 목록, 검색(제목, 작성자) API 개발)
=======
from django.db.models import Q
import random
import requests
# import requests
# import csv
# from bs4 import BeautifulSoup
# from matplotlib.image import thumbnail
# import statistics

>>>>>>> 4681354 (feat: 웹툰 필터 api 구현 / 검색 기능 대소문자 구분 제거)
# webtoon 데이터가공-Naver API : http://localhost:8000/webtoons/naver/week
# Author -> Genre -> Tag -> Webtoon 순으로
# @api_view(['GET'])
# def webtoonsResponse(request,platfrom,type):
#     url = 'https://korea-webtoon-api.herokuapp.com/'   
#     params = platfrom + "/" +type
#     webtoons = requests.get(url+params).json()
#     # print(webtoons)
#     webtoon_list = []
#     for webtoon in webtoons:
#         webtoon_list.append(webtoon['title'])
#         if(Webtoon.objects.filter(title=webtoon['title']).exists()):
#             continue
#         my_author_list = []
#         my_genre_list = []

<<<<<<< HEAD
        insert_authors = []
        insert_genres = []
        insert_tags = []
        # insert_days = []
        
        if(webtoon['author'].find(",")):
            for name in webtoon['author'].split(","):
                my_author_list.append(name.replace("\n","").replace("\t",""))
        else:
            my_author_list.append(webtoon['author'].replace("\n","").replace("\t",""))
=======
#         insert_authors = []
#         insert_genres = []
#         insert_tags = []
#         insert_days = []
#         insert_platforms = []

#         platform = webtoon['service']
#         if(Platform.objects.filter(name=platform).exists()):
#             pass
#         else:
#             Platform.objects.create(name=platform)
#         insert_platforms.append(Platform.objects.get(name=platform))

#         if(webtoon['author'].find(",")):
#             for name in webtoon['author'].split(","):
#                 my_author_list.append(name.replace("\n","").replace("\t",""))
#         else:
#             my_author_list.append(webtoon['author'].replace("\n","").replace("\t",""))
>>>>>>> b8725e9 (feat: 웹툰 로그 / 웹툰 찜 / 웹툰 평점 api 구현)

#         # Author insert
#         for author in my_author_list:
#             if(Author.objects.filter(name=author).exists()):
#                 pass
#             else:
#                 Author.objects.create(name = author)
#             insert_authors.append(Author.objects.get(name=author))

#         page_url = webtoon['url'].replace("m.","")
#         headers = {'User-Agent':'mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/101.0.4951.67 safari/537.36'}
#         data = requests.get(page_url, headers=headers)
#         soup = BeautifulSoup(data.text, 'html.parser')
#         genres = soup.select_one('#content > div.comicinfo > div.detail > p.detail_info > span.genre').get_text()
#         summary = soup.select_one('#content > div.comicinfo > div.detail > p:nth-child(2)').get_text()
       
#         if(genres.find(",")!=-1):
#             for genre in genres.split(","):
#                 genre_type = genre.replace(" ","")
#                 my_genre_list.append(genre_type)
        

#         # Genre insert
#         for genre in my_genre_list:
#             if(Genre.objects.filter(genre_type=genre).exists()):
#                 pass
#             else:
#                 Genre.objects.create(genre_type = genre)
#             insert_genres.append(Genre.objects.get(genre_type=genre))

#         # tag 얻기위한 페이지로 이동
#         page_url = page_url.replace("&weekday","&no=1&weekday").replace("list","detail")
#         data = requests.get(page_url, headers=headers)
#         soup = BeautifulSoup(data.text, 'html.parser')

<<<<<<< HEAD
        #Tag Insert
        for i in range(1,21):
            tag = soup.select_one(f'#comic_view_area > div.view_sub > div.tag > a:nth-child({i})')
            if tag == None:
                break
            tagName = tag.get_text().replace(",","").replace(" ","")
            if(Tag.objects.filter(name=tagName).exists()):
                pass
            else:
                Tag.objects.create(name=tagName)
            insert_tags.append(Tag.objects.get(name=tagName))
        # Day insert
        week = { 0: "Mon", 1: "Tue", 2: "Wed", 3:"Thu",4:"Fri",5:"Sat",6:"Sun", 7: "Fin"}
        # for i in webtoon['week']:
        #     insert_days.append(Day.objects.get(day=week[webtoon['week']]))
        
        # DB에 webtoon 데이터 삽입
        toon = Webtoon.objects.create(
            title=webtoon['title'], 
            summary = summary, 
            day=week[webtoon['week'][0]],
            thumbnail=webtoon['img'],
<<<<<<< HEAD
            page=page_url,
            adult=webtoon['additional']['adult'],
            image_type = 0,
            service = webtoon['service'])
=======
            page=webtoon['url'].replace("m.",""),
            adult=webtoon['additional']['adult'])
>>>>>>> 5965471 (feat: 웹툰 상세,  전체 목록, 검색(제목, 작성자) API 개발)

        for i in insert_genres:
            toon.genres.add(i)
        for i in insert_authors:
            toon.authors.add(i)
        for i in insert_tags:
            toon.tags.add(i)
        # day도 추가
        # for i in insert_days:
        #     toon.days.add(i)
=======
#         #Tag Insert
#         for i in range(1,21):
#             tag = soup.select_one(f'#comic_view_area > div.view_sub > div.tag > a:nth-child({i})')
#             if tag == None:
#                 break
#             tagName = tag.get_text().replace(",","").replace(" ","")
#             if(Tag.objects.filter(name=tagName).exists()):
#                 pass
#             else:
#                 Tag.objects.create(name=tagName)
#             insert_tags.append(Tag.objects.get(name=tagName))
#         # Day insert
#         week = { 0: "Mon", 1: "Tue", 2: "Wed", 3:"Thu",4:"Fri",5:"Sat",6:"Sun", 7: "Fin"}
#         for i in webtoon['week']:
#             insert_days.append(Day.objects.get(name=week[i]))
        
#         # DB에 webtoon 데이터 삽입
#         toon = Webtoon.objects.create(
#             title=webtoon['title'], 
#             summary = summary, 
#             thumbnail=webtoon['img'],
#             page=webtoon['url'].replace("m.",""),
#             adult=webtoon['additional']['adult'])

#         for i in insert_genres:
#             toon.genres.add(i)
#         for i in insert_authors:
#             toon.authors.add(i)
#         for i in insert_tags:
#             toon.tags.add(i)
#         # day도 추가
#         for i in insert_days:
#             toon.days.add(i)
#         for i in insert_platforms:
#             toon.platforms.add(i)
>>>>>>> b8725e9 (feat: 웹툰 로그 / 웹툰 찜 / 웹툰 평점 api 구현)


#     # C부터 경로 탐색하기 때문에 위치선정 잘해야함 (Csv 활용 코드-안씀)
#     # with open('C:/Users/user/Documents/tuntun/tuntun/webtoons/naver.csv', mode='r', encoding='ANSI') as webtoon_lists:
#     #     reader = csv.reader(webtoon_lists)
#          # author
#     #     for data in reader:
#     #         # print(data)
#     #         # if(data[2].find("/")!=-1):
#     #         #     for str in data[2].split("/"):
#     #         #         my_list.append(str.replace(" ",""))
                    
#     #         # else:
#     #         #     my_list.append(data[2])
#             # genre
#     #         if(data[3].find(",")!=-1):
#     #             for str in data[3].split(","):
#     #                 my_genre_list.append(str.replace(" ",""))
#     #         else:
#     #             if(data[3]!="genre"):
#     #                 my_genre_list.append(data[3])
#     # my_autor_list = list(set(my_autor_list))
#     # my_genre_list = list(set(my_genre_list))
   

<<<<<<< HEAD
    return Response(webtoon_list, status.HTTP_200_OK)
<<<<<<< HEAD
>>>>>>> ad07346 (refactor: Naver 웹툰 데이터 삽입 코드 정리)
=======
=======
#     return Response(webtoon_list, status.HTTP_200_OK)
>>>>>>> b8725e9 (feat: 웹툰 로그 / 웹툰 찜 / 웹툰 평점 api 구현)

@api_view(['GET'])
def mainPage(request):
    webtoon1 = Webtoon.objects.filter(image_type1__gte = 90).order_by('-image_type1')[:6]
    webtoon2 = Webtoon.objects.filter(image_type2__gte = 90).order_by('-image_type2')[:6]
    webtoon3 = Webtoon.objects.filter(image_type3__gte = 90).order_by('-image_type3')[:6]
    webtoon4 = Webtoon.objects.filter(image_type4__gte = 90).order_by('-image_type4')[:6]
    webtoon5 = Webtoon.objects.filter(image_type5__gte = 90).order_by('-image_type5')[:6]
    webtoon6 = Webtoon.objects.filter(image_type6__gte = 90).order_by('-image_type6')[:6]

    webtoon_1 = WebtoonListSerializer(webtoon1, many = True)
    webtoon_2 = WebtoonListSerializer(webtoon2, many = True)
    webtoon_3 = WebtoonListSerializer(webtoon3, many = True)
    webtoon_4 = WebtoonListSerializer(webtoon4, many = True)
    webtoon_5 = WebtoonListSerializer(webtoon5, many = True)
    webtoon_6 = WebtoonListSerializer(webtoon6, many = True)

    return Response({'0': webtoon_1.data, '1':webtoon_2.data, '2':webtoon_3.data, '3':webtoon_4.data, '4':webtoon_5.data, '5':webtoon_6.data})

@api_view(['GET'])
def webtoonDetail(request,webtoonId):
    webtoon = get_object_or_404(Webtoon, pk=int(webtoonId))
    flag = 0

    if webtoon.webtoon_ratings.filter(user_id = request.user.pk).exists():
        flag = 1

    author_webtoon_list = []
    now_authors = []
    authors = webtoon.authors.all()
    
    for author in authors:
        now_authors.append(author.author_id)

    now_webtoons = Webtoon.objects.filter(authors__in = now_authors)

    for now_webtoon in now_webtoons:
        if now_webtoon not in author_webtoon_list and now_webtoon.title != webtoon.title:
            author_webtoon_list.append(now_webtoon)

    author_webtoons = WebtoonListSerializer(author_webtoon_list, many= True)

    webtoon.view_count += 1
    webtoon.save()

    serializer = WebtoonSerializer(webtoon)
    return Response({'data':serializer.data, 'is_rated':flag, 'author_webtoons':author_webtoons.data}, status.HTTP_200_OK)


page_cut = 20

@api_view(['GET'])
def webtoonList(request,pageNum):
    webtoon_list = Webtoon.objects.order_by('title')
    paginator = Paginator(webtoon_list, page_cut)
    webtoons = paginator.get_page(int(pageNum))
    serializer = WebtoonListSerializer(webtoons, many = True)
    return Response(serializer.data, status.HTTP_200_OK)


@api_view(['GET'])
def searchWebtoon(request,pageNum):
    webtoon_list = []
    # keyword = request.GET['keyword']
    keyword = request.GET['keyword'].rstrip().lstrip()
    if(keyword != ""):
        search_list = Webtoon.objects.filter(title__icontains=keyword).order_by('title')
        for toon in search_list:
            webtoon_list.append(toon)
        search_list = Webtoon.objects.filter(authors__name__icontains=keyword).order_by('title')
        for toon in search_list:
            webtoon_list.append(toon)
            
    webtoon_list = list(set(webtoon_list))
    webtoon_list.sort(key=lambda webtoon: webtoon.title, reverse=False)
    paginator = Paginator(webtoon_list, page_cut)
    webtoons = paginator.get_page(int(pageNum))
<<<<<<< HEAD
    serializer = WebtoonSerializer(webtoons, many = True)
<<<<<<< HEAD
<<<<<<< HEAD
=======
    serializer = WebtoonListSerializer(webtoons, many = True)
>>>>>>> 09b2f2b (feat: 그림체 기반 추천 알고리즘 구현중)
    return Response(serializer.data, status.HTTP_200_OK)
<<<<<<< HEAD
>>>>>>> 5965471 (feat: 웹툰 상세,  전체 목록, 검색(제목, 작성자) API 개발)
=======
=======
    return Response({'webtoonList':serializer.data}, status.HTTP_200_OK)
>>>>>>> 4681354 (feat: 웹툰 필터 api 구현 / 검색 기능 대소문자 구분 제거)
=======
    return Response(serializer.data, status.HTTP_200_OK)
>>>>>>> de4eb85 (fix: json 파일 형식 변경 (webtoonList 삭제))


@api_view(['POST'])
def filterWebtoon(request, pageNum):
    platform_list = request.data['platform']
    day_list = request.data['day']
    genre_list = request.data['genre']
    tag_list = request.data['tag']
    
    webtoon_list = Webtoon.objects.filter(
        Q(platforms__in = platform_list) &
        Q(days__in = day_list) &
        Q(genres__in = genre_list) &
        Q(tags__in = tag_list)
    ).order_by('title')
    
    paginator = Paginator(webtoon_list, page_cut)
    webtoons = paginator.get_page(int(pageNum))
    serializer = WebtoonListSerializer(webtoons, many = True)
    return Response(serializer.data, status.HTTP_200_OK)


@api_view(['POST'])
def webtoonLike(request, webtoonId):
    webtoon = get_object_or_404(Webtoon, pk=int(webtoonId))
    if webtoon.liked_webtoon_users.filter(id = request.user.pk).exists():
        webtoon.liked_webtoon_users.remove(request.user.pk)
    
        return Response({'data': False})
    else:
<<<<<<< HEAD
        webtoon.liked_webtoon_users.add(request.user)
<<<<<<< HEAD
        
    serializer = WebtoonSerializer(webtoon)
    return Response(serializer.data, status.HTTP_200_OK)
>>>>>>> 2711023 (feat: 웹툰 찜 기능 구현 (50%))
=======
=======
        webtoon.liked_webtoon_users.add(request.user.pk)
>>>>>>> b432986 (feat: CF 기반 웹툰 추천 api 구현(웹툰 추천 전체 구현은 미완성))
        return Response({'data': True})


@api_view(['POST'])
def tagLike(request, tagId):
    tag = get_object_or_404(Tag, pk=int(tagId))

    print(tag)

    if tag.tag_users.filter(id = request.user.pk).exists():
        tag.tag_users.remove(request.user.pk)
    
        return Response({'data': False})
    else:
        tag.tag_users.add(request.user.pk)
        return Response({'data': True})


@api_view(['POST'])
def webtoonRate(request, webtoonId):
    webtoon = get_object_or_404(Webtoon, pk=int(webtoonId))
    serializer = RatingSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        serializer.save(webtoon=webtoon, user=request.user)

        serializer = WebtoonSerializer(webtoon)
        return Response(serializer.data, status.HTTP_200_OK)


@api_view(['POST'])
def webtoonLog(request, webtoonId):
    if Member_View_Webtoons.objects.filter(member_id=request.user.id, webtoon_id=webtoonId).exists():
        pass
        return Response({'data': True})
    
    else:
        Member_View_Webtoons.objects.create(
            member_id = request.user.id,
            webtoon_id = webtoonId 
        )

    return Response({'data': True})
<<<<<<< HEAD
>>>>>>> b8725e9 (feat: 웹툰 로그 / 웹툰 찜 / 웹툰 평점 api 구현)
=======


@api_view(['GET'])
def recommendWebtoon(request,typeId):
    if typeId == 1:
        my_webtoons = Webtoon.objects.filter(liked_webtoon_users = request.user.pk)
        
        user_list = []
        
        for my_webtoon in my_webtoons:
            now_users = my_webtoon.liked_webtoon_users.all()
            
            for now_user in now_users:
                if now_user not in user_list and now_user != request.user:
                    user_list.append(now_user)
                    
        recommended_webtoons = []
        for webtoon_like_user in user_list:
            now_webtoons = Webtoon.objects.filter(liked_webtoon_users = webtoon_like_user.id)
            
            for now_webtoon in now_webtoons:
                if now_webtoon not in recommended_webtoons:
                    recommended_webtoons.append(now_webtoon)
                    
        for my_webtoon in my_webtoons:
            if my_webtoon in recommended_webtoons:
                recommended_webtoons.remove(my_webtoon)
                
        recommended_webtoons.sort(key=lambda x : -x.view_count)
        recommended_webtoons = recommended_webtoons[:5]
        
        recommended_webtoon_ids = []
        
        for recommended_webtoon in recommended_webtoons:
            recommended_webtoon_ids.append(recommended_webtoon.webtoon_id)
        
        webtoons = Webtoon.objects.filter(webtoon_id__in = recommended_webtoon_ids)
        serializer = WebtoonListSerializer(webtoons, many=True)
        
        return Response(serializer.data)
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> b432986 (feat: CF 기반 웹툰 추천 api 구현(웹툰 추천 전체 구현은 미완성))
=======
    if typeId == 2:
=======
    elif typeId == 2:
>>>>>>> bebfc91 (feat: 메인페이지 api 구현)
        # modeling 후 변경
        webtoon =  get_object_or_404(Webtoon, pk=int(request.GET['webtoon_id']))
        similar_webtoons = webtoon.similar_webtoons.split()
        user_liked_list = []
        if(request.user):
            my_webtoons = Webtoon.objects.filter(liked_webtoon_users = request.user.pk)       
            for my_webtoon in my_webtoons:
                user_liked_list.append(my_webtoon.webtoon_id)
        # print("mylist : ",user_liked_list)
        # similar_string = "1,2,3,4,5,6,7,8,9,10,1115"
        # similar_webtoons = similar_string.split(",")
        recommended_webtoons = []
        for idx in similar_webtoons:
            # 내가 찜한 애들은 제외
            if int(idx.replace(" ","")) not in user_liked_list:
                recommended_webtoons.append(int(idx.replace(" ","")))

        # print("최종추천 list : ",recommended_webtoons)
        if(len(recommended_webtoons)>=5):
            recommended_webtoons = random.sample(recommended_webtoons,5)
        
        
        webtoons = Webtoon.objects.filter(webtoon_id__in = recommended_webtoons)
        serializer = WebtoonListSerializer(webtoons, many=True)
        return Response(serializer.data)


# tb_draw_classify 삽입
@api_view(['GET'])
def insertClassify(request):
    # recommended_webtoons = [1,4,23,27]
    # webtoons = Webtoon.objects.filter(webtoon_id__in = recommended_webtoons)
    webtoons = Webtoon.objects.all()
    # webtoon_list = []
    for webtoon in webtoons:
        list = []   
        list.append(webtoon.image_type1)
        list.append(webtoon.image_type2)
        list.append(webtoon.image_type3)
        list.append(webtoon.image_type4)
        list.append(webtoon.image_type5)
        list.append(webtoon.image_type6)
        
        first_max = max(list)
        second_max = 0
        for max_i in list:
            if(first_max > max_i and max_i > second_max):
                second_max = max_i

        first = list.index(first_max)+1
        second = list.index(second_max)+1
        type = 0
        if(first==1 and second == 2):
            type = 1
        elif(first==1 and second == 3):
            type = 2 
        elif(first==1 and second == 4):
            type = 3 
        elif(first==1 and second == 5):
            type = 4 
        elif(first==1 and second == 6):
            type = 5 
        elif(first==2 and second == 1):
            type = 6 
        elif(first==2 and second == 3):
            type = 7 
        elif(first==2 and second == 4):
            type = 8 
        elif(first==2 and second == 5):
            type = 9 
        elif(first==2 and second == 6):
            type = 10 
        elif(first==3 and second == 1):
            type = 11 
        elif(first==3 and second == 2):
            type = 12 
        elif(first==3 and second == 4):
            type = 13 
        elif(first==3 and second == 5):
            type = 14 
        elif(first==3 and second == 6):
            type = 15 
        elif(first==4 and second == 1):
            type = 16 
        elif(first==4 and second == 2):
            type = 17 
        elif(first==4 and second == 3):
            type = 18 
        elif(first==4 and second == 5):
            type = 19 
        elif(first==4 and second == 6):
            type = 20 
        elif(first==5 and second == 1):
            type = 21 
        elif(first==5 and second == 2):
            type = 22 
        elif(first==5 and second == 3):
            type = 23 
        elif(first==5 and second == 4):
            type = 24 
        elif(first==5 and second == 6):
            type = 25 
        elif(first==6 and second == 1):
            type = 26 
        elif(first==6 and second == 2):
            type = 27 
        elif(first==6 and second == 3):
            type = 28 
        elif(first==6 and second == 4):
            type = 29 
        elif(first==6 and second == 5):
            type = 30 
        # webtoon_list.append({"type" : type, "webtoon_id" : webtoon.webtoon_id })
        # modeling 후 insert 
        webtoon.classify_id.add(type)
    # print(webtoon_list)   
    return Response(status.HTTP_201_CREATED)


# webtoon마다 similar_webtoons id string으로 넣어주기
@api_view(['GET'])
def insertSimilarWebtoons(request):
    webtoon_list = Webtoon.objects.all()
    # idx_list = [1,4,23,27]
    # webtoon_list = Webtoon.objects.filter(webtoon_id = 1)
    
    # 각 이미지 타입 비율 불러와 차이 계산 후 top30을 similar에 넣는다
    for webtoon in webtoon_list:
        # 같은 타입애들을 불러와
        type_list = Webtoon.objects.filter(classify_id = webtoon.classify_id)
        # type_list = Webtoon.objects.filter(webtoon_id__in = idx_list)
        original_webtoon = get_object_or_404(Webtoon,pk=webtoon.webtoon_id)
        similar_list = []
        for comparsion in type_list:
            if(original_webtoon==comparsion):
                continue
            diffResult = typeToDifference(webtoon.classify_id,original_webtoon, comparsion)
            # diffResult = typeToDifference(1,original_webtoon, comparsion)
            similar_list.append(diffResult)
        
        # print(list)
        # 1순위 -> 2순위 그림체 순으로 정렬
        newlist = sorted(similar_list, key = lambda idx: (idx['first_diff'],idx['second_diff'])) 
        # print(newlist)
        # print(','.join([str(item['webtoon_id']) for item in newlist]))
        insert_similar_webtoons = ','.join([str(item['webtoon_id']) for item in newlist])
        # insert to similar 그림체
        original_webtoon.update(similar_webtoons=insert_similar_webtoons)
        
    return Response(status.HTTP_201_CREATED)


# 그림체 차이 계산
def typeToDifference(type, original, comparsion):
    type1_diff = abs(original.image_type1 - comparsion.image_type1)
    type2_diff = abs(original.image_type2 - comparsion.image_type2)
    type3_diff = abs(original.image_type3 - comparsion.image_type3)
    type4_diff = abs(original.image_type4 - comparsion.image_type4)
    type5_diff = abs(original.image_type5 - comparsion.image_type5)
    type6_diff = abs(original.image_type6 - comparsion.image_type6)

    if(type==1): 
        first_diff = type1_diff
        second_diff = type2_diff
    elif(type==2): 
        first_diff = type1_diff
        second_diff = type3_diff
    elif(type==3): 
        first_diff = type1_diff
        second_diff = type4_diff
    elif(type==4): 
        first_diff = type1_diff
        second_diff = type5_diff
    elif(type==5): 
        first_diff = type1_diff
        second_diff = type6_diff
    elif(type==6): 
        first_diff = type2_diff
        second_diff = type1_diff
    elif(type==7): 
        first_diff = type2_diff
        second_diff = type3_diff
    elif(type==8): 
        first_diff = type2_diff
        second_diff = type4_diff
    elif(type==9): 
        first_diff = type2_diff
        second_diff = type5_diff
    elif(type==10): 
        first_diff = type2_diff
        second_diff = type6_diff
    elif(type==11): 
        first_diff = type3_diff
        second_diff = type1_diff
    elif(type==12): 
        first_diff = type3_diff
        second_diff = type2_diff
    elif(type==13): 
        first_diff = type3_diff
        second_diff = type4_diff
    elif(type==14): 
        first_diff = type3_diff
        second_diff = type5_diff
    elif(type==15): 
        first_diff = type3_diff
        second_diff = type6_diff
    elif(type==16): 
        first_diff = type4_diff
        second_diff = type1_diff
    elif(type==17): 
        first_diff = type4_diff
        second_diff = type2_diff
    elif(type==18): 
        first_diff = type4_diff
        second_diff = type3_diff
    elif(type==19): 
        first_diff = type4_diff
        second_diff = type5_diff
    elif(type==20): 
        first_diff = type4_diff
        second_diff = type6_diff
    elif(type==21): 
        first_diff = type5_diff
        second_diff = type1_diff
    elif(type==22): 
        first_diff = type5_diff
        second_diff = type2_diff
    elif(type==23): 
        first_diff = type5_diff
        second_diff = type3_diff
    elif(type==24): 
        first_diff = type5_diff
        second_diff = type4_diff
    elif(type==25): 
        first_diff = type5_diff
        second_diff = type6_diff
    elif(type==26): 
        first_diff = type6_diff
        second_diff = type1_diff
    elif(type==27): 
        first_diff = type6_diff
        second_diff = type2_diff
    elif(type==28): 
        first_diff = type6_diff
        second_diff = type3_diff
    elif(type==29): 
        first_diff = type6_diff
        second_diff = type4_diff
    elif(type==30): 
        first_diff = type6_diff
        second_diff = type5_diff

    difference = {"webtoon_id" : comparsion.webtoon_id , "first_diff" : first_diff, "second_diff" : second_diff}
    return difference
<<<<<<< HEAD
>>>>>>> 09b2f2b (feat: 그림체 기반 추천 알고리즘 구현중)
=======


@api_view(['POST'])
def searchImageWebtoon(request):
    orginal = request.data['probability']

    webtoons = Webtoon.objects.all()
    min_diff = 1000

    for webtoon in webtoons:
        diff = 0
        
        if webtoon.image_type1 is not None:
            diff += abs(orginal[0] - webtoon.image_type1)
            diff += abs(orginal[1] - webtoon.image_type2)
            diff += abs(orginal[2] - webtoon.image_type3)
            diff += abs(orginal[3] - webtoon.image_type4)
            diff += abs(orginal[4] - webtoon.image_type5)
            diff += abs(orginal[5] - webtoon.image_type6)

            if min_diff > diff:
                min_diff = diff
                min_webtoon = webtoon
    
    serializer = SearchWebtoonSerializer(min_webtoon)

    return Response(serializer.data, status.HTTP_200_OK)
<<<<<<< HEAD
>>>>>>> c4b2854 (feat: 웹툰 이미지 검색 api 구현)
=======


# # 날씨 기반 추천
# @api_view(['GET'])
# def weather_recommend(request):

#     url = 'http://api.openweathermap.org/data/2.5/weather?lat=37.501317&lon=127.039646&appid=7e625d2f562b1014869529981bd7ee18'
#     # request the API data and convert the JSON to Python data types
#     city_weather = requests.get(url).json()
#     # 필요한 정보들만 가져오기

#     weather = {
#         'main': city_weather['weather'][0]['main'],
#         'temperature': city_weather['main']['temp'],
#         'description': city_weather['weather'][0]['description'],
#         'icon': city_weather['weather'][0]['icon']
#     }
    
#     # 로맨스, 판타지, 드라마, 스릴러, 일상, 액션, 무협/사극, 스포츠, 개그, 감성, 소년, BL
#     # 일단 딕셔너리로 날씨에 장르들 하나씩을 선택 하도록 함(더 좋은 방법 있으면 그걸로 구현)
#     lst = {'clear sky': '로맨스', 'few clouds': '개그', 'overcast clouds': '무협/사극', 'drizzle': '소년', 'rain': '스릴러', 'light rain': '스포츠', 'moderate rain': '개그','shower rain': '판타지', 'thunderstorm': '액션',
#            'snow': '드라마', 'mist': 14, 'broken clouds': '감성', 'scattered clouds': '일상'}
#     if weather['description'] not in lst:
#         genre = random.choice(['에피소드', '스토리', '옴니버스'])
#     else:
#         genre = lst[weather['description']]
#     # 장르와 같은 영화 정보들 가지고오기

#     genre_lst = Genre.objects.get(genre_type = genre)
#     webtoon_lst = genre_lst.genre_webtoons.all()
#     choice_webtoons = set()
    
#     if len(movie_list) >= 20:
#         while len(choice_movies) < 20:
#             movie = random.choice(movie_list)
#             choice_movies.add(movie)
#     else:
#         for movie in movie_list:
#             choice_movies.add(movie)
#         movie_list = Movie.objects.order_by('-wr')[:100]
#         while len(choice_movies) < 20:
#             movie = random.choice(movie_list)
#             choice_movies.add(movie)

#     choice_movies = list(choice_movies)
#     serializers = MovieRecommendSerializer(choice_movies, many=True)

#     return Response(serializers.data, status.HTTP_200_OK)
>>>>>>> c9803bc (fix : profile 수정, email,nickname 중복확인 수정)
