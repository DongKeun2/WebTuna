from django.urls import path, include
from . import views
from rest_framework import urls

urlpatterns =[
    path('user/signup/', views.UserCreate.as_view()),
    path('user/', include('rest_framework.urls')),
    path('user/update/', views.ProfileUpdate.as_view()),
    path('user/profile/', views.Profile),
 ]