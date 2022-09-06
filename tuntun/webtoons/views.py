from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
import requests
# Create your views here.
@api_view(['GET'])
def webtoonsResponse(request,platfrom,type):
    url = 'https://korea-webtoon-api.herokuapp.com/'   
    params = platfrom + "/" +type
    webtoons = requests.get(url+params).json()
    print(webtoons)
    return webtoons
