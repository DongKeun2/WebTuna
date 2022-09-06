from django.shortcuts import render
from matplotlib.image import thumbnail
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
import requests
import csv
from bs4 import BeautifulSoup
from webtoons.models import Webtoon, Genre, Author
# webtoon 데이터가공-Naver API : http://localhost:8000/webtoons/naver/week
# genre -> Author -> tag(예정) -> Webtoon 순으로
@api_view(['GET'])
def webtoonsResponse(request,platfrom,type):
    url = 'https://korea-webtoon-api.herokuapp.com/'   
    params = platfrom + "/" +type
    webtoons = requests.get(url+params).json()
    # print(webtoons)
    my_genre_list = []
    my_autor_list = []

    for webtoon in webtoons:
        webtoon_author_list = []
        if(webtoon['author'].find(",")):
            for name in webtoon['author'].split(","):
                my_autor_list.append(name.replace("\n","").replace("\t",""))
                webtoon_author_list.append(name.replace("\n","").replace("\t",""))
        else:
            my_autor_list.append(webtoon['author'].replace("\n","").replace("\t",""))
            webtoon_author_list.append(webtoon['author'].replace("\n","").replace("\t",""))
        # print(webtoon['week'][0])
        week = { 0: "Mon", 1: "Tue", 2: "Wed", 3:"Thu",4:"Fri",5:"Sat",6:"Sun", 7: "Fin"}

        page_url = webtoon['url'].replace("m.","")
        # print(week[webtoon['week'][0]])
        # summary & genre 삽입
        headers = {'User-Agent':'mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/101.0.4951.67 safari/537.36'}
        data = requests.get(page_url, headers=headers)
        soup = BeautifulSoup(data.text, 'html.parser')
        genres = soup.select_one('#content > div.comicinfo > div.detail > p.detail_info > span.genre').get_text()
        summary = soup.select_one('#content > div.comicinfo > div.detail > p:nth-child(2)').get_text()
        gen_list=[]
        if(genres.find(",")!=-1):
            for genre in genres.split(","):
                gen_type = genre.replace(" ","")
                gen_list.append(Genre.objects.get(genre_type=gen_type))

        # print(gen_list)
        # print(summary)
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

        for i in gen_list:
            toon.genres.add(i)
        for i in webtoon_author_list:
            toon.authors.add(i)
        # day도 추가


    # C부터 경로 탐색하기 때문에 위치선정 잘해야함
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
    my_autor_list = list(set(my_autor_list))
    my_genre_list = list(set(my_genre_list))
    # Genre insert
    # for genre in my_genre_list:
    #     Genre.objects.create(genre_type = genre)

    # Author insert
    # for author in my_autor_list:
    #     if(Author.objects.filter(name=author).exists()):
    #         pass
    #     else:
    #         Author.objects.create(name = author)

    return Response(my_genre_list, status.HTTP_200_OK)
