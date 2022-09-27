from django.urls import path
from . import views

app_name = 'webtoons'

urlpatterns = [
    path('',views.mainPage),
    path('<int:webtoonId>/detail/',views.webtoonDetail),
    path('<int:webtoonId>/like/',views.webtoonLike),
    path('<int:webtoonId>/rating/',views.webtoonRate),
    path('<int:webtoonId>/log/',views.webtoonLog),
    path('list/<int:pageNum>/',views.webtoonList),
    path('filter/<int:pageNum>/', views.filterWebtoon),
    path('search/<int:pageNum>/',views.searchWebtoon),
    path('search/image/',views.searchImageWebtoon),
    path('recommend/<int:typeId>/', views.recommendWebtoon),
    path('tag/<int:tagId>/like/',views.tagLike),
<<<<<<< HEAD
=======
    path('weather/recommend/', views.weather_recommend),
    path('genre/recommend/', views.genre_recommend),
<<<<<<< HEAD
<<<<<<< HEAD
    # path('classify/insert/', views.insertClassify),
>>>>>>> ae5d972 (feat: 날씨, 유저가 좋아하는 장르 기반 추천)
=======
    path('draw/recommend/', views.draw_recommend),
<<<<<<< HEAD
>>>>>>> 9015e4e (feat: 선호 그림체 기반 추천 api 작성(미완))
=======
    path('tag/recommend/', views.tag_recommend),
>>>>>>> 75cf8f8 (feat : tag기반추천, log남기기 수정)
=======
    path('tag/get/', views.getTag),
>>>>>>> 09ecf40 (feat: 전체 태그 요청 api 구현)
    # path('classify/similar/', views.insertSimilarWebtoons),
    # path('classify/insert/', views.insertClassify),
]
