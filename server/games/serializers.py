from dataclasses import field
from rest_framework import serializers

from .models import Question
from webtoons.models import Webtoon

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Question
        fields = ('question_id', 'question', 'option1', 'option2')

class WebtoonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Webtoon
        fields = ('webtoon_id','title','summary','thumbnail', 'page')