from platform import platform

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Genre, Author, Tag, Webtoon, Platform, Day, Rating


class WebtoonListSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = Webtoon
        fields = ('webtoon_id', 'title', 'thumbnail', 'author_name')

    def get_author_name(self, obj):
        author_name_list = []

        for author_name in obj.authors.values('name'):
            author_name_list.append(author_name['name'])

        return author_name_list

class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = ('author_id','name')

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('tag_id','name')

class WebtoonSerializer(serializers.ModelSerializer):

    class DaySerializer(serializers.ModelSerializer):
        class Meta:
            model = Day
            fields= ('day_id','name')

    class GenreSerializer(serializers.ModelSerializer):
        class Meta:
            model = Genre
            fields= ('genre_id','genre_type')

    class PlatformSerializer(serializers.ModelSerializer):
        class Meta:
            model = Platform
            fields = ('platform_id','name') 
    
    days = DaySerializer(many=True, read_only=True)
    genres = GenreSerializer(many=True, read_only=True)
    authors = AuthorSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    platforms = PlatformSerializer(many=True, read_only=True)
    webtoon_rate = serializers.SerializerMethodField()
    
    class Meta:
        model = Webtoon
        fields= ('webtoon_id','title','summary','thumbnail','page','adult','days','genres','authors','tags','platforms', 'image_type1', 'image_type2', 'image_type3', 'image_type4', 'image_type5', 'image_type6', 'webtoon_rate', 'liked_webtoon_users', 'rating')

    def get_webtoon_rate(self, obj):
        rate_list = []        

        for rate in obj.webtoon_ratings.values('rating'):
            rate_list.append(rate['rating'])

        ratings = []
        i = 0
        while i <= 5:
            ratings.append(rate_list.count(i))
            i += 0.5

        return ratings

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('rating_id', 'created_time', 'rating', 'webtoon')
        read_only_fields = ('webtoon', )

class SearchWebtoonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Webtoon
        fields = ('webtoon_id','title','summary','thumbnail')