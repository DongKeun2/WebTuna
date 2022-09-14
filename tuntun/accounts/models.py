from django.db import models
from django.contrib.auth.models import AbstractUser
from webtoons.models import Tag, Webtoon

class Member(AbstractUser):
    member_id = models.AutoField(primary_key=True)
    nickname = models.CharField(max_length=50)
    gender = models.TextChoices('gender', 'M F')
    age = models.IntegerField()
    profile_image_url = models.TextField(blank=True)
    created_time = models.DateTimeField(auto_now_add=True)
    is_removed = models.BooleanField(default=False)
    resigned_time = models.DateTimeField(auto_now = True)
    count = models.IntegerField(default=0)
    liked_thumnail = models.CharField(max_length=100)
    tags = models.ManyToManyField(Tag,related_name="tag_users")
    view_webtoons = models.ManyToManyField(Webtoon,related_name="view_webtoon_users")
    liked_webtoons = models.ManyToManyField(Webtoon,related_name="liked_webtoon_users")