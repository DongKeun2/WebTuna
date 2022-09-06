from django.db import models
from django.contrib.auth.models import AbstractUser
from webtoons.models import Genre, Webtoon

class User(AbstractUser):
    member_id = models.AutoField(primary_key=True)
    nickname = models.CharField(max_length=50)
    gender = models.TextChoices('gender', 'M F')
    age = models.IntegerField()
    profile_image_url = models.TextField(blank=True)
    created_time = models.DateTimeField(auto_now_add=True)
    is_removed = models.BooleanField(default=False)
    resigned_time = models.DateTimeField(auto_now = True)
    fav_genres = models.ManyToManyField(Genre,related_name="genres")
    view_webtoon = models.ManyToManyField(Webtoon,related_name="clicked_webtoons")
    liked_webtoon = models.ManyToManyField(Webtoon,related_name="fav_webtoons")
    followings = models.ManyToManyField('self', symmetrical=False, related_name="follwers")
    

class Badge(models.Model):
    badge_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    acquired_members = models.ManyToManyField(User, related_name='get_badges')
    image_url = models.TextField(blank=True)