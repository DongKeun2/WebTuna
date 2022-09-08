from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator

class Genre(models.Model):
    genre_id = models.AutoField(primary_key=True)
    genre_type = models.CharField(max_length=50)
    

class Author(models.Model):
    author_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)


class Tag(models.Model):
    tag_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    validation = models.BooleanField()


class Day(models.Model):
    day_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)


class Platform(models.Model):
    platform_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)


class Webtoon(models.Model):
    webtoon_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    summary = models.TextField(blank=True)
    thumbnail = models.CharField(max_length=1000)
    page = models.CharField(max_length=1000)
    adult = models.BooleanField()
    image_type = models.IntegerField()
    view_count = models.IntegerField(default=0)
    days = models.ManyToManyField('Day', related_name='day_webtoons')
    authors = models.ManyToManyField('Author', related_name='author_webtoons' )
    genres = models.ManyToManyField('Genre', related_name='genre_webtoons')
    tags = models.ManyToManyField('Tag', related_name='tag_webtoons')
    platforms = models.ManyToManyField('Platform', related_name='platform_webtoons')


class Review(models.Model):
    review_id = models.AutoField(primary_key=True)
    content = models.TextField()
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)
    rating = models.FloatField(validators=[MinValueValidator(0.5), MaxValueValidator(5)])
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_reviews')
    webtoon = models.ForeignKey(Webtoon, on_delete=models.CASCADE, related_name='webtoon_reviews')