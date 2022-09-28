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
            # 치인트
            webtoon = get_object_or_404(Webtoon, pk=1115)
            info = '완벽한 연애를 원하시나요? 홍설과 유정 커플의 매력에 빠져보세요'
        elif user_answer == [1, 0, 0, 0]:
            # 별이삼샵
            webtoon = get_object_or_404(Webtoon, pk=64)
            info = '응답하라 2006,  L r는 7r끔 눈물을 흘린ㄷr…'
            
        elif user_answer == [1, 0, 1, 1]:
            # 외모지상주의
            webtoon = get_object_or_404(Webtoon, pk=167)
            info = '얼굴이 다는 아니지! 만… 그래도 주인공은 잘생긴게 좋잖아?'
            
        elif user_answer == [1, 0, 1, 0]:
            # 간 떨어지는 동거
            webtoon = get_object_or_404(Webtoon, pk=922)
            info = '이런 남자라면 내 간도 줄 수 있어.'
            
        elif user_answer == [1, 1, 1, 1]:
            # 신의탑
            webtoon = get_object_or_404(Webtoon, pk=12)
            info = '스물다섯번째 밤 쥬 비올레 그레이스 퍼그 슬레이어 후보.. 이게 뭔지 궁금해?'
        
        elif user_answer == [1, 1, 1, 0]:
            # 갓오하
            webtoon = get_object_or_404(Webtoon, pk=234)
            info = '우주가 잠시 꺼진 이유가 궁금하다면?'
            
        elif user_answer == [1, 1, 0, 1]:
            # 하드캐리
            webtoon = get_object_or_404(Webtoon, pk=732)
            info = '캐리 해주실 분?? 이것이 재능인가?'
            
        elif user_answer == [1, 1, 0, 0]:
            # 그린보이
            webtoon = get_object_or_404(Webtoon, pk=1592)
            info = '당신은 사랑을 위해 무엇까지 할 수 있나요? 얘는 다 함 ㅋ'
            
        elif user_answer == [0, 1, 1, 1]:
            # 전독시
            webtoon = get_object_or_404(Webtoon, pk=275)
            info = '평소에 소설을 즐겨 읽으시나요? 소설이 현실이 된다면? '
            
        elif user_answer == [0, 1, 1, 0]:
            # 화산귀환
            webtoon = get_object_or_404(Webtoon, pk=280)
            info = '가문을 부활시키기 위한 소년가장.. 장녀 장남이신분? 공감'
            
        elif user_answer == [0, 1, 0, 1]:
            # 김부장
            webtoon = get_object_or_404(Webtoon, pk=23)
            info = 'I will find you, and i will kill you'
            
        elif user_answer == [0, 1, 0, 0]:
            # 싸움독학
            webtoon = get_object_or_404(Webtoon, pk=502)
            info = '싸움을 유튜브로 배운다고? 이거 실화냐?'
            
        elif user_answer == [0, 0, 1, 1]:
            # 참교육
            webtoon = get_object_or_404(Webtoon, pk=49)
            info = '답답한 일상에 사이다가 필요하다면?'
            
        elif user_answer == [0, 0, 1, 0]:
            # 쿠베라
            webtoon = get_object_or_404(Webtoon, pk=193)
            info = '이것은, 악인은 없으나 패자는 있는 이야기.'
        
        elif user_answer == [0, 0, 0, 1]:
            # 더복서
            webtoon = get_object_or_404(Webtoon, pk=632)
            info = '모두에게는 살아가는 이유가 있다. 당신은 무엇을 위해 사나요?'
            
        elif user_answer == [0, 0, 0, 0]:
            # 뷰티풀군바리
            webtoon = get_object_or_404(Webtoon, pk=244)
            info = '여자가 군대를 가게 된다면?'

        webtoons = WebtoonSerializer(webtoon)
        return Response({'webtoons':webtoons.data, 'info':info})