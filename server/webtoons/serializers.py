from platform import platform
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Genre, Author, Tag, Webtoon, Platform, Day

class WebtoonSerializer(serializers.ModelSerializer):

    class DaySerializer(serializers.ModelSerializer):
        class Meta:
            model = Day
            fields= ('day_id','name')

    class GenreSerializer(serializers.ModelSerializer):
        class Meta:
            model = Genre
            fields= ('genre_id','genre_type')

    class AuthorSerializer(serializers.ModelSerializer):
        class Meta:
            model = Author
            fields = ('author_id','name')

    class TagSerializer(serializers.ModelSerializer):
        class Meta:
            model = Tag
            fields = ('tag_id','name')

    class PlatformSerializer(serializers.ModelSerializer):
        class Meta:
            model = Platform
            fields = ('platform_id','name')
    
    days = AuthorSerializer(many=True, read_only=True)
    genres = GenreSerializer(many=True, read_only=True)
    authors = AuthorSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    platforms = PlatformSerializer(many=True, read_only=True)
    
    class Meta:
            model = Webtoon
            fields= ('webtoon_id','title','summary','thumbnail','page','adult','view_count','days','genres','authors','tags','platforms')