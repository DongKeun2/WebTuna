<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
from ast import keyword
from re import L
<<<<<<< HEAD
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
=======
from urllib import response
from django.shortcuts import render, redirect
>>>>>>> ae5d972 (feat: 날씨, 유저가 좋아하는 장르 기반 추천)
=======
>>>>>>> cf96830 (fix: 웹툰 상세보기 페이지 api 수정 - 그림체 비슷한 웹툰 추가)
=======
from ast import keyword
from re import L
from urllib import response
=======
>>>>>>> 1b0b37b (fix: 웹툰 추천 페이지 api 수정 - 한번에 다보내기 / db 설정 부분 scripts.py로 이전)
from django.shortcuts import render, redirect
>>>>>>> aad57af (fix : 추천 중복 막음)
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

<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 70f416e (fix : log남기기 수정)
=======
from django.http import HttpResponseRedirect, HttpRequest
<<<<<<< HEAD
>>>>>>> ae5d972 (feat: 날씨, 유저가 좋아하는 장르 기반 추천)
from .serializers import WebtoonSerializer, RatingSerializer, WebtoonListSerializer, SearchWebtoonSerializer
>>>>>>> c4b2854 (feat: 웹툰 이미지 검색 api 구현)
=======
from .serializers import WebtoonSerializer, RatingSerializer, WebtoonListSerializer, SearchWebtoonSerializer, TagSerializer
>>>>>>> 09ecf40 (feat: 전체 태그 요청 api 구현)
from webtoons.models import Webtoon, Genre, Author, Tag, Day, Platform
=======
from django.http import HttpResponseRedirect
from .serializers import WebtoonSerializer, RatingSerializer, WebtoonListSerializer, SearchWebtoonSerializer, TagSerializer
from webtoons.models import Webtoon, Genre, Tag
>>>>>>> 1b0b37b (fix: 웹툰 추천 페이지 api 수정 - 한번에 다보내기 / db 설정 부분 scripts.py로 이전)
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.core.paginator import Paginator
<<<<<<< HEAD
>>>>>>> 5965471 (feat: 웹툰 상세,  전체 목록, 검색(제목, 작성자) API 개발)
=======
from django.db.models import Q
import random
import requests
<<<<<<< HEAD
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
=======
>>>>>>> 1b0b37b (fix: 웹툰 추천 페이지 api 수정 - 한번에 다보내기 / db 설정 부분 scripts.py로 이전)

@api_view(['GET'])
def mainPage(request):
    webtoon1 = Webtoon.objects.filter(image_type1__gte = 90).order_by('-rating')[:6]
    webtoon2 = Webtoon.objects.filter(image_type2__gte = 90).order_by('-rating')[:6]
    webtoon3 = Webtoon.objects.filter(image_type3__gte = 90).order_by('-rating')[:6]
    webtoon4 = Webtoon.objects.filter(image_type4__gte = 90).order_by('-rating')[:6]
    webtoon5 = Webtoon.objects.filter(image_type5__gte = 90).order_by('-rating')[:6]
    webtoon6 = Webtoon.objects.filter(image_type6__gte = 90).order_by('-rating')[:6]

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

    similar_webtoon_id_list = list(map(int, webtoon.similar_webtoons.split(',')))

    sample_list = random.sample(similar_webtoon_id_list, 4)

    similar_webtoon_list = Webtoon.objects.filter(webtoon_id__in = sample_list)

    similar_webtoon = WebtoonListSerializer(similar_webtoon_list, many= True)

    webtoon.view_count += 1
    webtoon.save()

    webtoon_info = WebtoonSerializer(webtoon)
    return Response({'data':webtoon_info.data, 'is_rated':flag, 'author_webtoons':author_webtoons.data, 'similar_webtoon': similar_webtoon.data}, status.HTTP_200_OK)


page_cut = 20

@api_view(['GET'])
def webtoonList(request,pageNum):
    webtoon_list = Webtoon.objects.order_by('title')
    paginator = Paginator(webtoon_list, page_cut)
    webtoons = paginator.get_page(int(pageNum))
    webtoons_list = WebtoonListSerializer(webtoons, many = True)
    return Response(webtoons_list.data, status.HTTP_200_OK)

@api_view(['GET'])
def getTag(request):
    tags = Tag.objects.all()
    tags_list = TagSerializer(tags, many = True)

    return Response(tags_list.data, status.HTTP_200_OK)

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
=======
    
    webtoons_list = WebtoonListSerializer(webtoons, many = True)
    return Response(webtoons_list.data, status.HTTP_200_OK)
>>>>>>> 1b0b37b (fix: 웹툰 추천 페이지 api 수정 - 한번에 다보내기 / db 설정 부분 scripts.py로 이전)


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
    
    webtoons_list = WebtoonListSerializer(webtoons, many = True)
    return Response(webtoons_list.data, status.HTTP_200_OK)


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

        ratings = webtoon.webtoon_ratings.all()
        num = 0

        for rating in ratings:
            num += rating.rating

        rating_num = round(num/len(ratings), 2)
        webtoon.rating = rating_num
        webtoon.save()

        webtoons_info = WebtoonSerializer(webtoon)
        return Response(webtoons_info.data, status.HTTP_200_OK)


@api_view(['POST'])
def webtoonLog(request, webtoonId):
    if Member_View_Webtoons.objects.filter(member_id=request.user.id, webtoon_id=webtoonId).exists():
        Member_View_Webtoons.objects.filter(
            member_id = request.user.id,
            webtoon_id = webtoonId 
        ).delete()
        
        Member_View_Webtoons.objects.create(
            member_id = request.user.id,
            webtoon_id = webtoonId 
        )
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
<<<<<<< HEAD
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
        recommended_webtoons = recommended_webtoons[:20]
        
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
                
        recommended_webtoons = []
        for idx in similar_webtoons:
            # 내가 찜한 애들은 제외
            if int(idx.replace(" ","")) not in user_liked_list:
                recommended_webtoons.append(int(idx.replace(" ","")))

        if(len(recommended_webtoons)>=5):
            recommended_webtoons = random.sample(recommended_webtoons,5)
        
        
        webtoons = Webtoon.objects.filter(webtoon_id__in = recommended_webtoons)
        serializer = WebtoonListSerializer(webtoons, many=True)
        return Response(serializer.data)
=======
def recommendWebtoon(request):
    user_id = int(request.user.pk)
    
    # CF 기반 추천
    cf_recommend =  cfRecommend(user_id)
    
    # 선호 그림체 기반 추천
    draw_recommend = drawRecommend(user_id)
    
>>>>>>> 1b0b37b (fix: 웹툰 추천 페이지 api 수정 - 한번에 다보내기 / db 설정 부분 scripts.py로 이전)
    # 날씨 기반 추천
    weather_recommend = weatherRecommend(user_id)
    
    # 유저가 좋아하는 장르 기반 추천
    genre_recommend = genreRecommend(user_id)
    
    # 유저가 좋아하는 태그 기반 추천
    tag_recommend = tagRecommend(user_id)

    # # 유저가 좋아하는 태그 기반 추천
    # elif typeId == 6:
        
<<<<<<< HEAD
        return HttpResponseRedirect('http://127.0.0.1:8000/api/webtoons/tag/recommend/')

    elif typeId == 5:
        return HttpResponseRedirect('http://127.0.0.1:8000/api/webtoons/draw/recommend/')


# tb_draw_classify 삽입
@api_view(['GET'])
def insertClassify(request):
    webtoons = Webtoon.objects.all()

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

        # modeling 후 insert 
        webtoon.classify_id.add(type)

    return Response(status.HTTP_201_CREATED)


# webtoon마다 similar_webtoons id string으로 넣어주기
@api_view(['GET'])
def insertSimilarWebtoons(request):
    webtoon_list = Webtoon.objects.all()
    
    # 각 이미지 타입 비율 불러와 차이 계산 후 ((1순위 그림체 *1.1) + (2순위 그림체)) 낮은순으로 top30을 similar에 넣는다
    for webtoon in webtoon_list:
        # 같은 타입애들을 불러오기
        classify_list = webtoon.draw_classifies.all()
        original_webtoon = Webtoon.objects.filter(pk=webtoon.webtoon_id)

        # 그림체 분류 id로 불러오기
        classify_id_list = []
        for classify in classify_list:
            classify_id_list.append(classify.classify_id)

        # 그림체 정보가 1개 넘을 때는 대분류 정했던 로직처럼 similar에 넣어주기
        if len(classify_id_list) > 1:
            if classify_id_list[0] == 1:
                similar_list = Webtoon.objects.filter(image_type1__gte = 95)[:31]
                
            elif classify_id_list[0] == 6:
                similar_list = Webtoon.objects.filter(image_type2__gte = 100)[:31]

            elif classify_id_list[0] == 11:
                similar_list = Webtoon.objects.filter(image_type3__gte = 99.99)[:31]

            elif classify_id_list[0] == 16:
                similar_list = Webtoon.objects.filter(image_type4__gte = 95)[:31]

            elif classify_id_list[0] == 21:
                similar_list = Webtoon.objects.filter(image_type5__gte = 99.8)[:31]

            elif classify_id_list[0] == 26:
                similar_list = Webtoon.objects.filter(image_type6__gte = 98)[:31]

            similar_id_list = []
            for similar in similar_list:
                similar_id_list.append(similar.webtoon_id)
            
            # 자기 자신 빼주기
            if webtoon.webtoon_id in similar_id_list:
                similar_id_list.remove(webtoon.webtoon_id)
            
            insert_similar_webtoons = ','.join(str(item) for item in similar_id_list)

        else:
            type_list = Webtoon.objects.filter(draw_classifies__in = classify_id_list)
            
            similar_list = []
            for comparsion in type_list:
                if(original_webtoon==comparsion):
                    continue

                diffResult = typeToDifference(classify_id_list[0], webtoon, comparsion)
                similar_list.append(diffResult)
            
            # 그림체 차이 순으로 정렬
            newlist = sorted(similar_list, key = lambda idx: (idx['diff']))

            # 자기 자신 빼주기
            if {"webtoon_id" : webtoon.webtoon_id , "diff" : 0} in newlist:
                newlist.remove({"webtoon_id" : webtoon.webtoon_id , "diff" : 0})
                
            insert_similar_webtoons = ','.join([str(item['webtoon_id']) for item in newlist[:30]])
        
        # insert to similar 그림체
        original_webtoon.update(similar_webtoons=insert_similar_webtoons)
            
    return Response(status.HTTP_201_CREATED)


# 그림체 차이 계산
def typeToDifference(type, original, comparsion):
    first_diff = 0
    second_diff = 0

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

    diff = first_diff * 1.1 + second_diff

    difference = {"webtoon_id" : comparsion.webtoon_id , "diff" : diff}
    return difference
<<<<<<< HEAD
>>>>>>> 09b2f2b (feat: 그림체 기반 추천 알고리즘 구현중)
=======
=======
    return Response({'0': cf_recommend.data, '1': draw_recommend.data, '2': weather_recommend.data, '3': genre_recommend.data, '4':tag_recommend.data}, status.HTTP_200_OK)
>>>>>>> 1b0b37b (fix: 웹툰 추천 페이지 api 수정 - 한번에 다보내기 / db 설정 부분 scripts.py로 이전)


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
    
    search_webtoons = SearchWebtoonSerializer(min_webtoon)

<<<<<<< HEAD
    return Response(serializer.data, status.HTTP_200_OK)
<<<<<<< HEAD
>>>>>>> c4b2854 (feat: 웹툰 이미지 검색 api 구현)
=======
=======
    return Response(search_webtoons.data, status.HTTP_200_OK)
>>>>>>> 1b0b37b (fix: 웹툰 추천 페이지 api 수정 - 한번에 다보내기 / db 설정 부분 scripts.py로 이전)

# CF(Collaborate Filtering) 추천
def cfRecommend(user):
    my_webtoons = Webtoon.objects.filter(liked_webtoon_users = user)
        
    user_list = []
    
    for my_webtoon in my_webtoons:
        now_users = my_webtoon.liked_webtoon_users.all()
        
        for now_user in now_users:
            if now_user not in user_list and now_user.id != user:
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
    recommended_webtoons = recommended_webtoons[:20]
    
    recommended_webtoon_ids = []
    
    for recommended_webtoon in recommended_webtoons:
        recommended_webtoon_ids.append(recommended_webtoon.webtoon_id)
    
    webtoons = Webtoon.objects.filter(webtoon_id__in = recommended_webtoon_ids)
    webtoons_list = WebtoonListSerializer(webtoons, many=True)
    
    return webtoons_list

# 날씨 기반 추천
def weatherRecommend(user):
    member = get_object_or_404(get_user_model(), id=user)
    like_webtoons = member.liked_webtoons.all()

    url = 'http://api.openweathermap.org/data/2.5/weather?lat=37.501317&lon=127.039646&appid=7e625d2f562b1014869529981bd7ee18'
    # request the API data and convert the JSON to Python data types
    city_weather = requests.get(url).json()
    # 필요한 정보들만 가져오기

    weather = {
        'main': city_weather['weather'][0]['main'],
        'temperature': city_weather['main']['temp'],
        'description': city_weather['weather'][0]['description'],
        'icon': city_weather['weather'][0]['icon']
    }
    
    # 로맨스, 판타지, 드라마, 스릴러, 일상, 액션, 무협/사극, 스포츠, 개그, 감성, 소년, BL
    # 일단 딕셔너리로 날씨에 장르들 하나씩을 선택 하도록 함(더 좋은 방법 있으면 그걸로 구현)
    lst = {'clear sky': '로맨스', 'few clouds': '개그', 'overcast clouds': '무협/사극', 'drizzle': '소년', 'rain': '스릴러', 'light rain': '스포츠', 'moderate rain': '개그','shower rain': '판타지', 'thunderstorm': '액션',
           'snow': '드라마', 'broken clouds': '감성', 'scattered clouds': '일상'}
    if weather['description'] not in lst:
        genre = random.choice(['에피소드', '스토리', '옴니버스'])
    else:
        genre = lst[weather['description']]
    # 장르와 같은 영화 정보들 가지고오기

    genre_lst = Genre.objects.get(genre_type = genre)
    webtoon_lst = genre_lst.genre_webtoons.all().order_by('-rating')
    cnt = 0 
    real_cnt = 0
    choice_lst = set()

    if len(webtoon_lst) >= 200:
        while cnt < 15:
            webtoon = random.choice(webtoon_lst[:100])
            if webtoon not in like_webtoons:
                cnt += 1
                choice_lst.add(webtoon)
                
            real_cnt += 1
            if real_cnt >= 50:
                break
        
        real_cnt = 0        
        while cnt < 20:
            webtoon = random.choice(webtoon_lst[100:])
            if webtoon not in like_webtoons:
                cnt += 1
                choice_lst.add(webtoon)
            
            real_cnt += 1
            if real_cnt >= 50:
                break
    
    else:
        while cnt < 20:
            webtoon = random.choice(list(webtoon_lst))
            if webtoon not in like_webtoons:
                cnt += 1
                choice_lst.add(webtoon)
                
            real_cnt += 1
            if real_cnt >= 50:
                break
    
    choice_lst = list(choice_lst)
    choice_lst = sorted(choice_lst, key = lambda x: -x.rating)
    
    webtoons_list = WebtoonListSerializer(choice_lst, many=True)

    return webtoons_list

<<<<<<< HEAD
#     return Response(serializers.data, status.HTTP_200_OK)
<<<<<<< HEAD
>>>>>>> c9803bc (fix : profile 수정, email,nickname 중복확인 수정)
=======
=======

# 유저가 좋아하는 장르 기반 추천
def genreRecommend(user):
    member = get_object_or_404(get_user_model(), id=user)
    webtoons = member.liked_webtoons.all()
    webtoons_length = len(webtoons)
    
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
    
    if webtoons_length == 0:
        return Response(False)
    
    else:
        for webtoon in webtoons:
            genres = webtoon.genres.all()
            for genre in genres:
                genre_type = genre.genre_type
                if genre_type not in ['스토리','옴니버스','에피소드']:
                    genre_types[genre_type] += 1
                    
    sort_genre = sorted(genre_types.items(), key=lambda x:x[1], reverse=True)
    genre_list = []
    for i in range(3):
        genre_list.append(sort_genre[i][0])
    choice_lst = []
    
    for genre in genre_list:
        genre_data = Genre.objects.get(genre_type = genre)
        webtoon_lst = genre_data.genre_webtoons.all().order_by('-rating')
        choice_lst += random.sample(list(webtoon_lst[:100]), 10)
        
    reco_lst = set()
    for choice in choice_lst:
        if choice not in webtoons:
            reco_lst.add(choice)
            
    reco_lst = list(reco_lst)
    reco_lst = sorted(reco_lst, key = lambda x: -x.rating)
    reco_lst = reco_lst[:20]
        
    webtoons_list = WebtoonListSerializer(reco_lst, many=True)

    return webtoons_list


<<<<<<< HEAD
# 유저가 좋아하는 장르 기반 추천
@api_view(['GET'])
def tag_recommend(request):
    member = get_object_or_404(get_user_model(), id=request.user.id)
=======
# 유저가 좋아하는 태그 기반 추천
def tagRecommend(user):
    member = get_object_or_404(get_user_model(), id=user)
>>>>>>> 1b0b37b (fix: 웹툰 추천 페이지 api 수정 - 한번에 다보내기 / db 설정 부분 scripts.py로 이전)
    like_webtoons = member.liked_webtoons.all()
    like_tags = member.tags.all()
    cnt = 0
    reco_lst = set()
    
    while cnt < 20:
        tag = random.choice(list(like_tags))
        tag_data = Tag.objects.get(name = tag.name)
        tag_webtoons = tag_data.tag_webtoons.all()
        
        for _ in range(5):
            webtoon = random.choice(list(tag_webtoons))
            if webtoon not in like_webtoons:
                reco_lst.add(webtoon)
                cnt += 1
                
    reco_lst = list(reco_lst)
    reco_lst = sorted(reco_lst, key = lambda x: -x.rating)
    reco_lst = reco_lst[:20]
        
    webtoons_list = WebtoonListSerializer(reco_lst, many=True)

<<<<<<< HEAD
    return Response(serializers.data, status.HTTP_200_OK)
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> ae5d972 (feat: 날씨, 유저가 좋아하는 장르 기반 추천)

>>>>>>> c5812ab (feat : rating model추가, rating views 수정)
=======
>>>>>>> cf96830 (fix: 웹툰 상세보기 페이지 api 수정 - 그림체 비슷한 웹툰 추가)
=======

# 유저가 좋아하는 그림체 기반 추천
@api_view(['GET'])
def draw_recommend(request):
    member = get_object_or_404(get_user_model(), id=request.user.id)
    webtoons = member.liked_webtoons.all()
=======
    return webtoons_list

# 유저가 좋아하는 그림체 기반 추천
def drawRecommend(user):
    member = get_object_or_404(get_user_model(), id=user)
    member_webtoons = member.liked_webtoons.all()
>>>>>>> 1b0b37b (fix: 웹툰 추천 페이지 api 수정 - 한번에 다보내기 / db 설정 부분 scripts.py로 이전)
    image_types = {f'draw_type{i}':0 for i in range(1, 31)}

    if len(webtoons):

        for webtoon in webtoons:
            # 같은 타입애들을 불러오기
            classify_list = webtoon.draw_classifies.all()

            # 그림체 분류 id로 불러오기
            classify_id_list = []
            for classify in classify_list:
                classify_id_list.append(classify.classify_id)
            
            for classify_id in classify_id_list:
                image_types[f'draw_type{classify_id}'] += 1
    
    else:
        webtoons = member.liked_thumbnail.split(",")

        for i in webtoons:
            # 같은 타입애들을 불러오기
            webtoon = Webtoon.objects.get(webtoon_id = i)
            classify_list = webtoon.draw_classifies.all()

            # 그림체 분류 id로 불러오기
            classify_id_list = []
            for classify in classify_list:
                classify_id_list.append(classify.classify_id)
            
            for classify_id in classify_id_list:
                image_types[f'draw_type{classify_id}'] += 1
    
    sort_image_types = sorted(image_types.items(), key=lambda x:x[1], reverse=True)

    print(sort_image_types[:3])

    # 선호 그림체 타입 top3 id 저장
    like_image_type_id_list = []
    for like_image_type in sort_image_types[:3]:
        like_image_type_id_list.append(like_image_type[0][-2:])

    like_image_type_list = Webtoon.objects.filter(draw_classifies__in = like_image_type_id_list).order_by('-rating')[:10]

    print(like_image_type_list)
>>>>>>> 9015e4e (feat: 선호 그림체 기반 추천 api 작성(미완))
=======

<<<<<<< HEAD
>>>>>>> aad57af (fix : 추천 중복 막음)
=======
    like_image_id_list = like_image_id_list[:15] + random.sample(like_image_id_list[15:], 5)
    recommend_webtoon = Webtoon.objects.filter(webtoon_id__in = like_image_id_list)

    webtoons_list = WebtoonListSerializer(recommend_webtoon, many=True)

    return webtoons_list
>>>>>>> 1b0b37b (fix: 웹툰 추천 페이지 api 수정 - 한번에 다보내기 / db 설정 부분 scripts.py로 이전)
