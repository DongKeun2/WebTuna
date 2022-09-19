from webtoons.models import Author, Tag, Webtoon
from .models import Member
from rest_framework import serializers
from django.contrib.auth import get_user_model

class MemberSignupSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = Member.objects.create_user(
            email = validated_data['email'],
            nickname = validated_data['nickname'],
            gender = validated_data['gender'],
            birth = validated_data['birth'],
            password = validated_data['password']
        )
        return user
    class Meta:
        model = Member
        fields = ('nickname', 'email', 'birth', 'gender', 'password')


class ProfileSerializer(serializers.ModelSerializer):
    

    class LikeWebtoonSerializer(serializers.ModelSerializer):

        class AuthorSerializer(serializers.ModelSerializer):

            class Meta:
                model = Author
                fields = ('name')

        class Meta:
            model = Webtoon
            fields = ('webtoon_id', 'title', 'thumbnail', 'image_type1', 'image_type2', 'image_type3', 'image_type4', 'image_type5', 'image_type6')

    
    class LookWebtoonSerializer(serializers.ModelSerializer):

        class AuthorSerializer(serializers.ModelSerializer):

            class Meta:
                model = Author
                fields = ('name')

        class Meta:
            model = Webtoon
            fields = ('webtoon_id', 'title', 'thumbnail', 'image_type1', 'image_type2', 'image_type3', 'image_type4', 'image_type5', 'image_type6')

    
    class TagSerializer(serializers.ModelSerializer):

        class Meta:
            model = Tag
            fields = ('tag_id', 'name')

    class Meta:
        model = get_user_model()
        fields = ('member_id', 'nickname', 'profile_image_url', 'liked_thumbnail', 'resigned_time', 'password', 'tags', 'view_webtoons', 'liked_webtoons')


class ProfileUpdateSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = get_user_model()
        fields = ('member_id', 'nickname', 'password' )