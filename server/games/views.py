from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Question
from webtoons.models import Webtoon
from .serializers import QuestionSerializer, WebtoonSerializer

# Create your views here.

@api_view(['GET', 'POST'])
def question(request):
    questions = Question.objects.all()
    serializer = QuestionSerializer(questions, many=True)

    if request.method == 'GET':
        return Response({'question':serializer.data})
    
    elif request.method == 'POST':
        user_answer = request.data['answer']

        if user_answer == [1, 0, 0, 1]:
            webtoon = get_object_or_404(Webtoon, pk=1115)
        
        elif user_answer == [1, 0, 0, 0]:
            webtoon = get_object_or_404(Webtoon, pk=64)
            
        elif user_answer == [1, 0, 1, 1]:
            webtoon = get_object_or_404(Webtoon, pk=167)
            
        elif user_answer == [1, 0, 1, 0]:
            webtoon = get_object_or_404(Webtoon, pk=1613)
        
        elif user_answer == [1, 1, 1, 1]:
            webtoon = get_object_or_404(Webtoon, pk=12)
        
        elif user_answer == [1, 1, 1, 0]:
            webtoon = get_object_or_404(Webtoon, pk=234)
            
        elif user_answer == [1, 1, 0, 1]:
            webtoon = get_object_or_404(Webtoon, pk=732)
            
        elif user_answer == [1, 1, 0, 0]:
            webtoon = get_object_or_404(Webtoon, pk=1592)
            
        elif user_answer == [0, 1, 1, 1]:
            webtoon = get_object_or_404(Webtoon, pk=275)
            
        elif user_answer == [0, 1, 1, 0]:
            webtoon = get_object_or_404(Webtoon, pk=280)
            
        elif user_answer == [0, 1, 0, 1]:
            webtoon = get_object_or_404(Webtoon, pk=23)
            
        elif user_answer == [0, 1, 0, 0]:
            webtoon = get_object_or_404(Webtoon, pk=502)
            
        elif user_answer == [0, 0, 1, 1]:
            webtoon = get_object_or_404(Webtoon, pk=49)
            
        elif user_answer == [0, 0, 1, 0]:
            webtoon = get_object_or_404(Webtoon, pk=193)
        
        elif user_answer == [0, 0, 0, 1]:
            webtoon = get_object_or_404(Webtoon, pk=632)
            
        elif user_answer == [0, 0, 0, 0]:
            webtoon = get_object_or_404(Webtoon, pk=244)

        serializer = WebtoonSerializer(webtoon)
        return Response(serializer.data)