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
    # path('classify/insert/', views.insertClassify),
>>>>>>> ae5d972 (feat: 날씨, 유저가 좋아하는 장르 기반 추천)
    # path('classify/similar/', views.insertSimilarWebtoons),
    # path('classify/insert/', views.insertClassify),
]
