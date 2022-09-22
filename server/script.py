import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tuntun.settings")

import django
django.setup()

<<<<<<< HEAD
<<<<<<< HEAD
=======
import json
>>>>>>> 97b8855 (feat : 카카오페이지 db 업데이트)
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
# platforms = ["kakao", "kakao-page"]
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
# path = '/kakao-page'
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

# ## 카카오 줄거리 넣기

# Base_URL = 'https://korea-webtoon-api.herokuapp.com'
# path = '/kakao'
# response = requests.get(Base_URL+path)
# webtoons_popular = response.json()
# webtoons = Webtoon.objects.filter(summary='')
# for webtoon in webtoons:
#     webtoon_url = webtoon.page
#     try: 
#         headers = {'User-Agent':'mozilla/5.0'}
#         data = requests.get(f'{webtoon_url}', headers=headers)
#         soup = BeautifulSoup(data.text, 'html.parser')
#         webtoon_summary = soup.select_one('head > meta:nth-child(6)')['content']
#     except:
#         webtoon_summary = ''
#     webtoon.summary = webtoon_summary
#     webtoon.save()


# ## 카카오 줄거리 넣기
# Base_URL = 'https://korea-webtoon-api.herokuapp.com'
# path = '/kakao'
# response = requests.get(Base_URL+path)
# webtoons_popular = response.json()
# webtoons = Webtoon.objects.filter(summary='')
# headers = {'User-Agent':'mozilla/5.0'}
# for webtoon in webtoons:
#     webtoon_url = webtoon.page
#     webtoon_data_url = webtoon_url.split("/")
#     webtoon_id = webtoon_data_url[-1]
#     data = requests.get(f'https://gateway-kw.kakao.com/decorator/v1/decorator/contents/{webtoon_id}/profile', headers=headers)
#     webtoon_summary = data.json()['data']['synopsis']
#     webtoon.summary = webtoon_summary
#     webtoon.save()


# if __name__ == '__main__':
#     weeks = { 0: "Mon", 1: "Tue", 2: "Wed", 3:"Thu",4:"Fri",5:"Sat",6:"Sun", 7: "Fin"}

#     genre_change = {
#         '학원': '일상',
#         '무협': '무협/사극',
#         '코믹': '개그',
#     }

#     Base_URL = 'https://korea-webtoon-api.herokuapp.com'
#     path = '/kakao-page'
#     response = requests.get(Base_URL+path)
#     webtoons_popular = response.json()
#     i = 0
#     for webtoon in webtoons_popular:
#         webtoon_title = webtoon['title']
#         webtoon_author = webtoon['author']
#         webtoon_url = webtoon['url']
#         webtoon_img = webtoon['img']
#         webtoon_platform = webtoon['service']
#         webtoon_adult = webtoon['additional']['adult']
#         webtoon_day = webtoon['week']


#         webtoon_author = webtoon_author.split(",")


#         ## 카카오 줄거리 크롤링
#         try: 
#             headers = {'User-Agent':'mozilla/5.0'}
#             data = requests.get(f'{webtoon_url}', headers=headers)
#             soup = BeautifulSoup(data.text, 'html.parser')
#             webtoon_summary = soup.select_one('head > meta:nth-child(4)')['content']
#         except:
#             webtoon_summary = ''


#         ## 카카오 장르 크롤링
#         try:
#             webtoon_genres = soup.select_one('#root > main > div > div > div > div.h-full.overflow-hidden.w-full.z-1.fixed.inset-0.bg-dark-background > div.w-full.left-0.top-0.relative > div.content-main-wrapper.opacity-0.invisible.relative.current-content-main.opacity-100.\!visible.z-1 > div.pb-20.pt-96.relative.z-1 > div.relative.mx-auto.my-0.w-full.lg\:w-default-max-width > div.mx-20.flex.justify-between.relative.z-1.pointer-events-auto.pt-12 > div > div > p.whitespace-pre-wrap.break-all.break-words.support-break-word.s12-regular-white.ml-3.opacity-85').text
#             if webtoon_genres == '공포/스릴러':
#                 webtoon_genres = '스릴러'
#                 webtoon_genres = webtoon_genres.split()

#             elif webtoon_genres.find('/') != -1:
#                 webtoon_genres = webtoon_genres.split('/')
#                 for idx in range(2):
#                     if webtoon_genres[idx] in ['학원', '무협', '코믹']:
#                         webtoon_genres[idx] = genre_change[webtoon_genres[idx]]
            
#             else:
#                 webtoon_genres = webtoon_genres.split()
#         except:
#             webtoon_genres = []


#         ## 카카오 태그 크롤링
#         webtoon_data_url = webtoon_url.split("/")
#         webtoon_id = webtoon_data_url[-1]
#         data = requests.get(f'https://gateway-kw.kakao.com/decorator/v1/decorator/contents/{webtoon_id}/profile', headers=headers)
#         webtoon_tags = data.json()['data']['seoKeywords']

#         if Webtoon.objects.filter(title = webtoon_title).exists():
#             pass
#         else:
#             webtoon_data = Webtoon.objects.create(
#                 title = webtoon_title,
#                 thumbnail = webtoon_img,
#                 page = webtoon_url,
#                 adult = webtoon_adult,
#                 view_count = 0,
#                 summary = webtoon_summary,
#             )

#             for author in webtoon_author:
#                 webtoon_data.authors.add(Author.objects.get(name = author).author_id)

#             for week in webtoon_day:
#                 webtoon_data.days.add(week+1)

#             if webtoon_genres:
#                 for genre in webtoon_genres:
#                     webtoon_data.genres.add(Genre.objects.get(genre_type=genre).genre_id)

#             for tag in webtoon_tags:
#                 tag = tag.replace('#','')
#                 webtoon_data.tags.add(Tag.objects.get(name=tag).tag_id)
            
#             webtoon_data.platforms.add(Platform.objects.get(name=webtoon_platform).platform_id)



    
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
    
    
=======
import requests
import json
from webtoons.models import Author, Webtoon, Genre
from bs4 import BeautifulSoup

headers = {'User-Agent':'mozilla/5.0'}
data = requests.get('https://webtoon.kakao.com/content/트레이스/1047', headers=headers)
soup = BeautifulSoup(data.text, 'html.parser')
genre = soup.select_one('#root > main > div > div > div > div.h-full.overflow-hidden.w-full.z-1.fixed.inset-0.bg-dark-background > div.w-full.left-0.top-0.relative > div.content-main-wrapper.opacity-0.invisible.relative.current-content-main.opacity-100.\!visible.z-1 > div.pb-20.pt-96.relative.z-1 > div.relative.mx-auto.my-0.w-full.lg\:w-default-max-width > div.mx-20.flex.justify-between.relative.z-1.pointer-events-auto.pt-12 > div > div > p.whitespace-pre-wrap.break-all.break-words.support-break-word.s12-regular-white.ml-3.opacity-85').text
print(genre.split("/"))
# if __name__ == '__main__':
#     Base_URL = 'https://korea-webtoon-api.herokuapp.com'
#     path = '/kakao/week'


#     response = requests.get(Base_URL+path)
#     webtoons_popular = response.json()
#     kakao_genre = set()
#     for webtoon in webtoons_popular:
#         try:
#             webtoon_url = webtoon['url']
#             # 카카오 장르 크롤링
#             headers = {'User-Agent':'mozilla/5.0'}
#             data = requests.get(f'{webtoon_url}', headers=headers)
#             soup = BeautifulSoup(data.text, 'html.parser')
#             genre = soup.select_one('#root > main > div > div > div > div.h-full.overflow-hidden.w-full.z-1.fixed.inset-0.bg-dark-background > div.w-full.left-0.top-0.relative > div.content-main-wrapper.opacity-0.invisible.relative.current-content-main.opacity-100.\!visible.z-1 > div.pb-20.pt-96.relative.z-1 > div.relative.mx-auto.my-0.w-full.lg\:w-default-max-width > div.mx-20.flex.justify-between.relative.z-1.pointer-events-auto.pt-12 > div > div > p.whitespace-pre-wrap.break-all.break-words.support-break-word.s12-regular-white.ml-3.opacity-85').text
#             kakao_genre.add(genre)
#         except:
#             pass
#     print(kakao_genre)
>>>>>>> b984062 (feat: db-kakao)

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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======



# if __name__ == '__main__':
#     for j in range(45, 60):
#         Base_URL = 'https://korea-webtoon-api.herokuapp.com'
#         path = '/naver/week'
#         params = {
#             'api_key' : 'e73cf3371bb27a97420ed90450a7bbce',
#             'language' : 'ko-KR',
#             'page' : j,
#         }

#         response = requests.get(Base_URL+path, params = params)
#         movie_popular = response.json()

#         for movie in movie_popular['results']:
#             movie_title = movie['title']
#             movie_releasedate = movie['release_date']
#             movie_voteaverage = movie['vote_average']
#             movie_votecount = movie['vote_count']
#             movie_posterpath = movie['poster_path']
#             movie_popularity = int(movie['popularity']*1000)
#             movie_id = movie['id']
#             movie_overview = movie['overview']
#             movie_genre = movie['genre_ids']

#             path=f'/movie/{movie_id}'
#             params = {
#             'api_key' : 'e73cf3371bb27a97420ed90450a7bbce',
#             'language' : 'ko-KR',
#             }
#             response2 = requests.get(Base_URL+path, params = params)
#             movie_detail = response2.json()
#             movie_runtime = movie_detail['runtime']

#             movie = Movie.objects.create(
#                 title = movie_title,
#                 release_date = movie_releasedate,
#                 popularity = movie_popularity,
#                 vote_count = movie_votecount,
#                 vote_average = movie_voteaverage,
#                 overview = movie_overview,
#                 poster_path = movie_posterpath,
#                 runtime = movie_runtime,
#             )
#             for i in movie_genre:
#                 movie.genres.add(i)

# movie = Movie.objects.all()[96]

# title = movie.title
# params = {
#     'key': 'AIzaSyA0ZPLyvp_6Eas5z78e0M9mJXEAxOSsBog',
#     'part': 'snippet',
#     'q': title + ' official trailer',
#     'type': 'video',
#     'maxResults': '1'
# }
# URL = "https://www.googleapis.com/youtube/v3/search"
# response = requests.get(URL, params=params)
# src = 'https://www.youtube.com/embed/' + \
#     json.loads(response.text)['items'][0]['id']['videoId']
# data = {
#     'src': src+'?autoplay=1&mute=0&enablejsapi=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0'
# }
# movie.src = data['src']
# movie.save()


# m = 15814
# C = 6.6366635249764325

# if __name__ == '__main__':
#     for j in range(1, 100):
#         Base_URL = 'https://api.themoviedb.org/3'
#         path = '/movie/popular'
#         params = {
#             'api_key' : 'e73cf3371bb27a97420ed90450a7bbce',
#             'language' : 'ko-KR',
#             'page' : j,
#         }

#         response = requests.get(Base_URL+path, params = params)
#         movie_popular = response.json()

#         for movie in movie_popular['results']:
#             movie_title = movie['title']
#             new_movie = Movie.objects.filter(title=movie_title)
#             movie_original_title = movie['original_title']
#             for i in new_movie:
#                 i.original_title = movie_original_title
#                 i.save()

# m = 15814
# C = 6.6366635249764325
# movies = Movie.objects.all()
# for movie in movies:
#     v = movie.vote_count
#     R = movie.vote_average
#     ans = ((v/(v+m))*R) + ((m/(v+m))*C)
#     movie.wr = ans
#     movie.save()
>>>>>>> b984062 (feat: db-kakao)
=======
webtoon_list = json.load(a)
=======
>>>>>>> 2ee8aa1 (fix: profile 수정)

# a = open('./Webtoon_Label_6.json', encoding='utf-8-sig')

# webtoon_list = json.load(a)

# for webtoons in webtoon_list:

<<<<<<< HEAD
        toon.update(
            image_type1 = img_0,
            image_type2 = img_1,
            image_type3 = img_2,
            image_type4 = img_3,
            image_type5 = img_4,
            image_type6 = img_5,
        )
>>>>>>> 953a554 (Feat: 웹툰 그림체 데이터 DB 반영 / 웹툰 상세정보 API 작성)
=======
#     webtoon_title = webtoons['img_name']
#     img_0 = webtoons['0']
#     img_1 = webtoons['1']
#     img_2 = webtoons['2']
#     img_3 = webtoons['3']
#     img_4 = webtoons['4']
#     img_5 = webtoons['5']

#     if Webtoon.objects.filter(title = webtoon_title).exists():
#         toon = Webtoon.objects.filter(title = webtoon_title)

#         toon.update(
#             image_type1 = img_0,
#             image_type2 = img_1,
#             image_type3 = img_2,
#             image_type4 = img_3,
#             image_type5 = img_4,
#             image_type6 = img_5,
#         )
<<<<<<< HEAD
>>>>>>> 2ee8aa1 (fix: profile 수정)
=======

## 카카오페이지 장르 데이터
# KakaoPageGenreChange = {
#     ' 액션/무협':['액션','무협/사극'],
#     ' 로맨스판타지':['로맨스','판타지'],
#     ' 로맨스':'로맨스',
#     ' 드라마':'드라마',
#     ' 소년':'소년',
#     ' BL': 'BL'
#      }


# Base_URL = 'https://korea-webtoon-api.herokuapp.com'
# path = '/kakao-page'
# response = requests.get(Base_URL+path)
# webtoons_popular = response.json()
# webtoon_genres = set()
# count = 0
# print(len(webtoons_popular))
# for webtoon in webtoons_popular:
#     webtoon_url = webtoon['url']
#     webtoon_id = webtoon_url.split('=')[-1]
#     count += 1
#     print(count)
#     webtoon_except = []

#     ## 카카오 페이지 장르 크롤링
#     try: 
#         headers = {'User-Agent':'mozilla/5.0'}
#         data = requests.get(f'{webtoon_url}', headers=headers)
#         soup = BeautifulSoup(data.text, 'html.parser')
#         webtoon_genre_list = json.loads(soup.select_one('body > #__NEXT_DATA__').text)
#         webtoon_genres.add(webtoon_genre_list['props']['pageProps']['initialState']['json']['contentHome']['fetching']['about'][f'{webtoon_id}']['data']['detail']['category'].split('|')[-1])
#     except:
#         webtoon_except.append(webtoon_id)

# print(webtoon_genre_list['props']['pageProps']['initialState']['json']['contentHome']['fetching']['about']['46610003']['data']['detail']['category'].split('|')[-1])



# Base_URL = 'https://korea-webtoon-api.herokuapp.com'
# path = '/kakao-page'
# response = requests.get(Base_URL+path)
# webtoons_popular = response.json()
# count = 0
# webtoon_except = []

# for webtoon in webtoons_popular:
#     webtoon_url = webtoon['url']
#     webtoon_id = webtoon_url.split('=')[-1]
#     count += 1
#     print(count)
#     if count == 10:
#         break
    

#     ## 카카오 페이지 줄거리 크롤링
#     try: 
#         headers = {'User-Agent':'mozilla/5.0'}
#         data = requests.get(f'{webtoon_url}', headers=headers)
#         soup = BeautifulSoup(data.text, 'html.parser')
#         webtoon_summary = soup.select_one('head > meta:nth-child(9)')['content']
#         print(webtoon_summary)
#     except:
#         webtoon_except.append(webtoon_id)


# ## 카카오 페이지 데이터 넣기
# if __name__ == '__main__':
#     weeks = { 0: "Mon", 1: "Tue", 2: "Wed", 3:"Thu",4:"Fri",5:"Sat",6:"Sun", 7: "Fin"}

#     KakaoPageGenreChange = {
#         ' 액션/무협':['액션','무협/사극'],
#         ' 로맨스판타지':['로맨스','판타지'],
#         ' 로맨스':['로맨스'],
#         ' 드라마':['드라마'],
#         ' 소년':['소년'],
#         ' BL': ['BL']
#         }

#     Base_URL = 'https://korea-webtoon-api.herokuapp.com'
#     path = '/kakao-page'
#     response = requests.get(Base_URL+path)
#     webtoons_popular = response.json()

#     for webtoon in webtoons_popular:
#         webtoon_title = webtoon['title']
#         webtoon_author = webtoon['author'].split(',')
#         webtoon_url = webtoon['url']
#         webtoon_img = webtoon['img']
#         webtoon_platform = webtoon['service']
#         webtoon_adult = webtoon['additional']['adult']
#         webtoon_day = webtoon['week']
#         webtoon_id = webtoon_url.split('=')[-1]



#         ## 카카오 페이지 줄거리 크롤링
#         try: 
#             headers = {'User-Agent':'mozilla/5.0'}
#             data = requests.get(f'{webtoon_url}', headers=headers)
#             soup = BeautifulSoup(data.text, 'html.parser')
#             webtoon_summary = soup.select_one('head > meta:nth-child(9)')['content']
#         except:
#             webtoon_summary = ''


#         ## 카카오 페이지 장르 크롤링
#         try:
#             webtoon_genre_list = json.loads(soup.select_one('body > #__NEXT_DATA__').text)
#             webtoon_genres = webtoon_genre_list['props']['pageProps']['initialState']['json']['contentHome']['fetching']['about'][f'{webtoon_id}']['data']['detail']['category'].split('|')[-1]
#             webtoon_genres = KakaoPageGenreChange[webtoon_genres]

#         except:
#             webtoon_genres = []


#         if Webtoon.objects.filter(title = webtoon_title).exists():
#             kakaoWebtoon = Webtoon.objects.filter(title = webtoon_title).get()
#             kakaoWebtoon.platforms.add(Platform.objects.get(name=webtoon_platform).platform_id)
#         else:
#             webtoon_data = Webtoon.objects.create(
#                 title = webtoon_title,
#                 thumbnail = webtoon_img,
#                 page = webtoon_url,
#                 adult = webtoon_adult,
#                 view_count = 0,
#                 summary = webtoon_summary,
#             )

#             for author in webtoon_author:
#                 webtoon_data.authors.add(Author.objects.get(name = author).author_id)

#             for week in webtoon_day:
#                 webtoon_data.days.add(week+1)

#             if webtoon_genres:
#                 for genre in webtoon_genres:
#                     webtoon_data.genres.add(Genre.objects.get(genre_type=genre).genre_id)
            
#             webtoon_data.platforms.add(Platform.objects.get(name=webtoon_platform).platform_id)
>>>>>>> 97b8855 (feat : 카카오페이지 db 업데이트)
