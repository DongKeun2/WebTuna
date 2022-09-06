from django.urls import path
from . import views

app_name = 'webtoons'

urlpatterns = [
    path('<platfrom>/<type>',views.webtoonsResponse)
]
