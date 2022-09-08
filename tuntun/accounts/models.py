from django.db import models
from django.contrib.auth.models import AbstractUser
from webtoons.models import Genre, Tag, Webtoon

class Member(AbstractUser):
    member_id = models.AutoField(primary_key=True)
    nickname = models.CharField(max_length=50)
    gender = models.TextChoices('gender', 'M F')
    age = models.IntegerField()
    profile_image_url = models.TextField(blank=True)
    created_time = models.DateTimeField(auto_now_add=True)
    is_removed = models.BooleanField(default=False)
    resigned_time = models.DateTimeField(auto_now = True)
    tags = models.ManyToManyField(Tag,related_name="tag_users")
    fav_genres = models.ManyToManyField(Genre,related_name="genres")
    view_webtoons = models.ManyToManyField(Webtoon,related_name="clicked_webtoons")
    liked_webtoons = models.ManyToManyField(Webtoon,related_name="fav_webtoons")
    followings = models.ManyToManyField('self', symmetrical=False, related_name="follwers")
    


