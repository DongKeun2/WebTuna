from django.shortcuts import render
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
from webtoons.models import Webtoon, Genre, Author, Tag
# webtoon 데이터가공-Naver API : http://localhost:8000/webtoons/naver/week
# Author -> Genre -> Tag -> Webtoon 순으로
@api_view(['GET'])
def webtoonsResponse(request,platfrom,type):
    url = 'https://korea-webtoon-api.herokuapp.com/'   
    params = platfrom + "/" +type
    webtoons = requests.get(url+params).json()
    # print(webtoons)
    webtoon_list = []
    for webtoon in webtoons:
        webtoon_list.append(webtoon['title'])
        if(Webtoon.objects.filter(title=webtoon['title']).exists()):
            continue
        my_author_list = []
        my_genre_list = []

        insert_authors = []
        insert_genres = []
        insert_tags = []
        # insert_days = []
        
        if(webtoon['author'].find(",")):
            for name in webtoon['author'].split(","):
                my_author_list.append(name.replace("\n","").replace("\t",""))
        else:
            my_author_list.append(webtoon['author'].replace("\n","").replace("\t",""))

        # Author insert
        for author in my_author_list:
            if(Author.objects.filter(name=author).exists()):
                pass
            else:
                Author.objects.create(name = author)
            insert_authors.append(Author.objects.get(name=author))

        page_url = webtoon['url'].replace("m.","")
        headers = {'User-Agent':'mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/101.0.4951.67 safari/537.36'}
        data = requests.get(page_url, headers=headers)
        soup = BeautifulSoup(data.text, 'html.parser')
        genres = soup.select_one('#content > div.comicinfo > div.detail > p.detail_info > span.genre').get_text()
        summary = soup.select_one('#content > div.comicinfo > div.detail > p:nth-child(2)').get_text()
       
        if(genres.find(",")!=-1):
            for genre in genres.split(","):
                genre_type = genre.replace(" ","")
                my_genre_list.append(genre_type)
        

        # Genre insert
        for genre in my_genre_list:
            if(Genre.objects.filter(genre_type=genre).exists()):
                pass
            else:
                Genre.objects.create(genre_type = genre)
            insert_genres.append(Genre.objects.get(genre_type=genre))

        # tag 얻기위한 페이지로 이동
        page_url = page_url.replace("&weekday","&no=1&weekday").replace("list","detail")
        data = requests.get(page_url, headers=headers)
        soup = BeautifulSoup(data.text, 'html.parser')

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
            page=page_url,
            adult=webtoon['additional']['adult'],
            image_type = 0,
            service = webtoon['service'])

        for i in insert_genres:
            toon.genres.add(i)
        for i in insert_authors:
            toon.authors.add(i)
        for i in insert_tags:
            toon.tags.add(i)
        # day도 추가
        # for i in insert_days:
        #     toon.days.add(i)


    # C부터 경로 탐색하기 때문에 위치선정 잘해야함 (Csv 활용 코드-안씀)
    # with open('C:/Users/user/Documents/tuntun/tuntun/webtoons/naver.csv', mode='r', encoding='ANSI') as webtoon_lists:
    #     reader = csv.reader(webtoon_lists)
         # author
    #     for data in reader:
    #         # print(data)
    #         # if(data[2].find("/")!=-1):
    #         #     for str in data[2].split("/"):
    #         #         my_list.append(str.replace(" ",""))
                    
    #         # else:
    #         #     my_list.append(data[2])
            # genre
    #         if(data[3].find(",")!=-1):
    #             for str in data[3].split(","):
    #                 my_genre_list.append(str.replace(" ",""))
    #         else:
    #             if(data[3]!="genre"):
    #                 my_genre_list.append(data[3])
    # my_autor_list = list(set(my_autor_list))
    # my_genre_list = list(set(my_genre_list))
   

    return Response(webtoon_list, status.HTTP_200_OK)
>>>>>>> ad07346 (refactor: Naver 웹툰 데이터 삽입 코드 정리)
