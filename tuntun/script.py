import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tuntun.settings")

import django
django.setup()

import urllib
import requests
import json
from webtoons.models import Author, Platform, Webtoon, Genre, Day, Tag
from bs4 import BeautifulSoup

# ##이미지 저장
# Base_URL = 'https://korea-webtoon-api.herokuapp.com'
# path = '/all'
# response = requests.get(Base_URL+path)
# webtoons_popular = response.json()
# i = 0
# for webtoon in webtoons_popular:
#     urllib.request.urlretrieve(webtoon['img'], f"kakaopage{i}.png")
#     i += 1


# ## 플랫폼 데이터 넣기
# platforms = ["naver", "kakao", "kakao-page"]
# for platform in platforms:
#     Platform.objects.create(
#         name = platform
#     )


# ## 날짜 데이터 넣기
# weeks = { 0: "Mon", 1: "Tue", 2: "Wed", 3:"Thu",4:"Fri",5:"Sat",6:"Sun", 7: "Fin"}
# for i in range(8):
#     Day.objects.create(
#         name = weeks[i]
#     )

# ## 장르 데이터 넣기

# genres = ["감성","개그","드라마","로맨스","무협/사극","스릴러","스포츠","액션","일상","판타지","스토리","에피소드","옴니버스"]

# for genre in genres:
#     genre_create = Genre.objects.create(
#         genre_type = genre
#     )

# ## 태그 데이터 넣기
# Base_URL = 'https://korea-webtoon-api.herokuapp.com'
# path = '/kakao'
# response = requests.get(Base_URL+path)
# webtoons_popular = response.json()
# headers = {'User-Agent':'mozilla/5.0'}
# webtoon_tag = set()

# for webtoon in webtoons_popular:
#     try:
#         webtoon_url = webtoon['url'].split('/')
#         webtoon_id = webtoon_url[-1]
#         data = requests.get(f'https://gateway-kw.kakao.com/decorator/v1/decorator/contents/{webtoon_id}/profile', headers=headers)
#         webtoon_tags = data.json()['data']['seoKeywords']

#         for tag in webtoon_tags:
#             webtoon_tag.add(tag)
    
#     except:
#         print(webtoon['url'])
#         print(data.json())

# for tag in webtoon_tag:
#     tag = tag.replace('#', '')
#     if Tag.objects.filter(name = tag).exists():
#         pass
#     else:
#         Tag.objects.create(
#             name = tag
#         )

# ## 카카오 작가 데이터 넣기
# Base_URL = 'https://korea-webtoon-api.herokuapp.com'
# path = '/kakao'
# response = requests.get(Base_URL+path)
# webtoons_popular = response.json()
# authors = set()

# for webtoon in webtoons_popular:
#     webtoon_author = webtoon['author'].split(",")

#     for author in webtoon_author:
#         authors.add(author)

# for author in authors:
#     if Author.objects.filter(name = author).exists():
#         pass
#     else:
#         Author.objects.create(
#             name = author
#         )


if __name__ == '__main__':
    weeks = { 0: "Mon", 1: "Tue", 2: "Wed", 3:"Thu",4:"Fri",5:"Sat",6:"Sun", 7: "Fin"}

    genre_change = {
        '학원': '일상',
        '무협': '무협/사극',
        '코믹': '개그',
    }

    Base_URL = 'https://korea-webtoon-api.herokuapp.com'
    path = '/kakao'
    response = requests.get(Base_URL+path)
    webtoons_popular = response.json()
    i = 0
    for webtoon in webtoons_popular:
        webtoon_title = webtoon['title']
        webtoon_author = webtoon['author']
        webtoon_url = webtoon['url']
        webtoon_img = webtoon['img']
        webtoon_platform = webtoon['service']
        webtoon_adult = webtoon['additional']['adult']
        webtoon_day = webtoon['week']


        webtoon_author = webtoon_author.split(",")


        ## 카카오 줄거리 크롤링
        try: 
            headers = {'User-Agent':'mozilla/5.0'}
            data = requests.get(f'{webtoon_url}', headers=headers)
            soup = BeautifulSoup(data.text, 'html.parser')
            webtoon_summary = soup.select_one('head > meta:nth-child(4)')['content']
        except:
            webtoon_summary = ''


        ## 카카오 장르 크롤링
        try:
            webtoon_genres = soup.select_one('#root > main > div > div > div > div.h-full.overflow-hidden.w-full.z-1.fixed.inset-0.bg-dark-background > div.w-full.left-0.top-0.relative > div.content-main-wrapper.opacity-0.invisible.relative.current-content-main.opacity-100.\!visible.z-1 > div.pb-20.pt-96.relative.z-1 > div.relative.mx-auto.my-0.w-full.lg\:w-default-max-width > div.mx-20.flex.justify-between.relative.z-1.pointer-events-auto.pt-12 > div > div > p.whitespace-pre-wrap.break-all.break-words.support-break-word.s12-regular-white.ml-3.opacity-85').text
            if webtoon_genres == '공포/스릴러':
                webtoon_genres = '스릴러'
                webtoon_genres = webtoon_genres.split()

            elif webtoon_genres.find('/') != -1:
                webtoon_genres = webtoon_genres.split('/')
                for idx in range(2):
                    if webtoon_genres[idx] in ['학원', '무협', '코믹']:
                        webtoon_genres[idx] = genre_change[webtoon_genres[idx]]
            
            else:
                webtoon_genres = webtoon_genres.split()
        except:
            webtoon_genres = []


        ## 카카오 태그 크롤링
        webtoon_data_url = webtoon_url.split("/")
        webtoon_id = webtoon_data_url[-1]
        data = requests.get(f'https://gateway-kw.kakao.com/decorator/v1/decorator/contents/{webtoon_id}/profile', headers=headers)
        webtoon_tags = data.json()['data']['seoKeywords']

        if Webtoon.objects.filter(title = webtoon_title).exists():
            pass
        else:
            webtoon_data = Webtoon.objects.create(
                title = webtoon_title,
                thumbnail = webtoon_img,
                page = webtoon_url,
                adult = webtoon_adult,
                view_count = 0,
                summary = webtoon_summary,
            )

            for author in webtoon_author:
                webtoon_data.authors.add(Author.objects.get(name = author).author_id)

            for week in webtoon_day:
                webtoon_data.days.add(week+1)

            if webtoon_genres:
                for genre in webtoon_genres:
                    webtoon_data.genres.add(Genre.objects.get(genre_type=genre).genre_id)

            for tag in webtoon_tags:
                tag = tag.replace('#','')
                webtoon_data.tags.add(Tag.objects.get(name=tag).tag_id)
            
            webtoon_data.platforms.add(Platform.objects.get(name=webtoon_platform).platform_id)




    
    
    # # 카카오 태그 크롤링
    # headers = {'User-Agent':'mozilla/5.0'}
    # data = requests.get('https://gateway-kw.kakao.com/decorator/v1/decorator/contents/1369/profile', headers=headers)
    # print(data.json()['data']['seoKeywords'])


    # # 카카오 줄거리 크롤링
    # soup = BeautifulSoup(data.text, 'html.parser')
    # description = soup.select_one('head > meta:nth-child(4)')['content']
    

    # # 카카오 장르 크롤링
    # kakao_genre = set()
    # genre_change = {
    #     '학원': '일상',
    #     '무협': '무협/사극',
    #     '코믹': '개그',
    # }
    # for webtoon in webtoons_popular:
    #     try:
    #         webtoon_url = webtoon['url']
    #         headers = {'User-Agent':'mozilla/5.0'}
    #         data = requests.get(f'{webtoon_url}', headers=headers)
    #         soup = BeautifulSoup(data.text, 'html.parser')
    #         genres = soup.select_one('#root > main > div > div > div > div.h-full.overflow-hidden.w-full.z-1.fixed.inset-0.bg-dark-background > div.w-full.left-0.top-0.relative > div.content-main-wrapper.opacity-0.invisible.relative.current-content-main.opacity-100.\!visible.z-1 > div.pb-20.pt-96.relative.z-1 > div.relative.mx-auto.my-0.w-full.lg\:w-default-max-width > div.mx-20.flex.justify-between.relative.z-1.pointer-events-auto.pt-12 > div > div > p.whitespace-pre-wrap.break-all.break-words.support-break-word.s12-regular-white.ml-3.opacity-85').text
    #         if genres == '공포/스릴러':
    #             genres = '스릴러'
    #             kakao_genre.add(genres)
    #         elif genres.find('/') != -1:
    #             genres = genres.split('/')
    #             for genre in genres:
    #                 if genre in ['학원', '무협', '코믹']:
    #                     kakao_genre.add(genre_change[f'{genre}'])
    #                 else:
    #                     kakao_genre.add(genre)
    #         else:
    #             genres = genres.split()
    #             for genre in genres:
    #                 kakao_genre.add(genre)
    #     except:
    #         pass
    # print(kakao_genre)
    # {'로맨스', '공포/스릴러', '학원/판타지', '로맨스 판타지', '드라마', '액션/무협', '판타지 드라마', '코믹/일상'}
    
    

    # # author 데이터 넣기
    # authors = set()
    # for webtoon in webtoons_popular:
    #     if webtoon['author'].find(","):
    #         for name in webtoon['author'].split(","):
    #             authors.add(name.replace("\n","").replace("\t",""))
    #     else:
    #         authors.add(webtoon['author'].replace("\n","").replace("\t",""))

    # for author in authors:
    #     if Author.objects.filter(name = author).exists():
    #         pass
    #     else:
    #         Author.objects.create(
    #             name = author
    #         )


# # genre 데이터 넣기

# genres = ["감성","개그","드라마","로맨스","무협/사극","스릴러","스포츠","액션","일상","판타지","스토리","에피소드","옴니버스"]

# for genre in genres:
#     genre_create = Genre.objects.create(
#         genre_type = genre
#     )

