from django.db import models

from accounts.models import Member
from webtoons.models import Webtoon

# Create your models here.
class Quiz(models.Model):
    quiz_id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=200)
    answer = models.CharField(max_length=100)
    image_url = models.CharField(max_length=1000)
    select1 = models.CharField(max_length=100)
    select2 = models.CharField(max_length=100)
    select3 = models.CharField(max_length=100)
    select4 = models.CharField(max_length=100)
    level = models.IntegerField()
    validation = models.BooleanField(default = False)
    members = models.ManyToManyField(Member, related_name='member_quizzes')
    webtoon = models.ForeignKey(Webtoon, on_delete=models.CASCADE, related_name='webtoon_quizzes')
    

class Character(models.Model):
    character_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    image_url = models.CharField(max_length=1000)
    character_type = models.IntegerField()
    selected_count = models.IntegerField(default=0)
    webtoon = models.ForeignKey(Webtoon, on_delete=models.CASCADE, related_name='webtoon_characters')
    members = models.ManyToManyField(Member, related_name="member_characters")
    
    