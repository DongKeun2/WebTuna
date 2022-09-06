from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Genre, Author, Tag, Webtoon, Review

class WebtoonSerializer(serializers.ModelSerializer):

    class GenreSerializer(serializers.ModelSerializer):
        class Meta:
            model = Genre
            fields= ('pk','genre_type')
    class AuthorSerializer(serializers.ModelSerializer):
        class Meta:
            model = Author
            fields = ('pk','name')
    class TagSerializer(serializers.ModelSerializer):
        class Meta:
            model = Tag
            fields = ('pk','name')
    authors = AuthorSerializer(many=True, read_only=True)
    genres = GenreSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    class Meta:
            model = Webtoon
            fields= ('pk','title','summary','day','thumbnail','page','adult','image_type','service','view_count','authors','genres','tags')