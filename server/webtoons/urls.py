from django.urls import path
from . import views
from drf_yasg import openapi

app_name = 'webtoons'

urlpatterns = [
    # path('<platfrom>/<type>',views.webtoonsResponse),
    path('<int:webtoonId>/detail/',views.webtoonDetail),
    path('<int:webtoonId>/like/',views.webtoonLike),
    path('<int:webtoonId>/rating/',views.webtoonRate),
    path('<int:webtoonId>/log/',views.webtoonLog),
    path('list/<int:pageNum>/',views.webtoonList),
    path('filter/<int:pageNum>/', views.filterWebtoon),
    path('search/<int:pageNum>/',views.searchWebtoon),
    path('recommend/<int:typeId>/', views.recommendWebtoon),
]
