from django.db import models

# Create your models here.
class Question(models.Model):
    question_id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=200)
    option1 = models.CharField(max_length=100)
    option2 = models.CharField(max_length=100)