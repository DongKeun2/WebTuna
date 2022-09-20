from django.utils import timezone
from django.contrib.auth import authenticate
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
            password = validated_data['password'],
            liked_thumbnail = validated_data['liked_thumbnail']
        )
        return user
    
    class Meta:
        model = Member
        fields = ('nickname', 'email', 'birth', 'gender', 'password', 'liked_thumbnail')


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)
    last_login = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)

        if email is None:
            raise serializers.ValidationError(
                'An email address is required to log in.'
            )
        
        if password is None:
            raise serializers.ValidationError(
                'A password is required to log in.'
            )
        
        user = authenticate(email = email, password = password)

        if user is None:
            raise serializers.ValidationError(
                'A user with this email and password was not found'
            )
        
        if not user.is_active:
            raise serializers.ValidationError(
                'This user has been deactivated.'
            )

        user.last_login = timezone.now()
        user.save(update_fields = ['last_login'])

        return {
            'email': user.email,
            'last_login': user.last_login
        }



class ProfileSerializer(serializers.ModelSerializer):
    

    class LikeWebtoonSerializer(serializers.ModelSerializer):

        class AuthorSerializer(serializers.ModelSerializer):

            class Meta:
                model = Author
                fields = ('author_id', 'name')

        class Meta:
            model = Webtoon
            fields = ('webtoon_id', 'title', 'thumbnail', 'image_type1', 'image_type2', 'image_type3', 'image_type4', 'image_type5', 'image_type6', 'authors')

    
    class LookWebtoonSerializer(serializers.ModelSerializer):

        class AuthorSerializer(serializers.ModelSerializer):

            class Meta:
                model = Author
                fields = ('author_id', 'name')

        class Meta:
            model = Webtoon
            fields = ('webtoon_id', 'title', 'thumbnail', 'image_type1', 'image_type2', 'image_type3', 'image_type4', 'image_type5', 'image_type6', 'authors')

    
    class TagSerializer(serializers.ModelSerializer):

        class Meta:
            model = Tag
            fields = ('tag_id', 'name')

    class Meta:
        model = get_user_model()
        fields = ('member_id', 'nickname', 'profile_image_id', 'liked_thumbnail', 'resigned_time', 'password', 'tags', 'view_webtoons', 'liked_webtoons')


class ProfileUpdateSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = get_user_model()
        fields = ('member_id', 'nickname', 'password' )
        

class ProfileMainSerializer(serializers.ModelSerializer):
    

    class LikeWebtoonSerializer(serializers.ModelSerializer):

        class AuthorSerializer(serializers.ModelSerializer):

            class Meta:
                model = Author
                fields = ('name')

        class Meta:
            model = Webtoon
            fields = ('webtoon_id', 'title', 'thumbnail', 'image_type1', 'image_type2', 'image_type3', 'image_type4', 'image_type5', 'image_type6', 'authors')

    
    class TagSerializer(serializers.ModelSerializer):

        class Meta:
            model = Tag
            fields = ('tag_id', 'name')

    class Meta:
        model = get_user_model()
        fields = ('member_id', 'nickname', 'profile_image_id', 'tags', 'liked_webtoons')
        
        
class MyLikedWebtoon(serializers.ModelSerializer):
    
    class LikeWebtoonSerializer(serializers.ModelSerializer):

        class AuthorSerializer(serializers.ModelSerializer):

            class Meta:
                model = Author
                fields = ('name')

        class Meta:
            model = Webtoon
            fields = ('webtoon_id', 'title', 'thumbnail', 'image_type1', 'image_type2', 'image_type3', 'image_type4', 'image_type5', 'image_type6', 'authors')
        
    class Meta:
        model = Member
        fields = ('member_id', 'liked_webtoons')