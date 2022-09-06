from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator

class Genre(models.Model):
    genre_type = models.CharField(max_length=50)
    

class Author(models.Model):
    name = models.CharField(max_length=10)


class Tag(models.Model):
    name = models.CharField(max_length=100)
    validation = models.BooleanField()


class Webtoon(models.Model):
    title = models.CharField(max_length=100)
    summary = models.TextField(blank=True)
    day = models.CharField(max_length=10)
    thumbnail = models.CharField(max_length=100)
    page = models.CharField(max_length=100)
    adult = models.BooleanField()
    image_type = models.IntegerField()
    service = models.CharField(max_length=10)
    view_count = models.IntegerField()
    authors = models.ManyToManyField('Author', related_name='MyWebtoons' )
    genres = models.ManyToManyField('Genre', related_name='Webtoons')
    tags = models.ManyToManyField('Tag', related_name='Webtoons')
    

class Review(models.Model):
    content = models.TextField()
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews_user')
    webtoon = models.ForeignKey(Webtoon, on_delete=models.CASCADE, related_name='reviews_webtoon')