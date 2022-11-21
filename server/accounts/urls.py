from django.urls import path, include
from . import views
from rest_framework import urls
from dj_rest_auth import urls

urlpatterns =[
    path('user/signup/', views.UserCreate.as_view()),
    path('user/', include('dj_rest_auth.urls')),
    path('user/update/', views.ProfileUpdate),
    path('user/profile/', views.Profile),
    path('user/image/', views.ProfileImage),
    path('user/email/', views.EmailCheck),
    path('user/nickname/', views.NicknameCheck),
    path('user/check/', views.PasswordCheck),
    path('user/info/', views.MainProfile),
    # path('user/test/', views.TestUser),
 ]
