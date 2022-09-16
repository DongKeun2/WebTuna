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

        if user_answer == [0, 1, 1, 0]:
            webtoon = get_object_or_404(Webtoon, pk=201)

            serializer = WebtoonSerializer(webtoon)

            return Response(serializer.data)