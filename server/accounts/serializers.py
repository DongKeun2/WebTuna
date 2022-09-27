from webtoons.models import Author, Tag, Webtoon
from .models import Member, Member_View_Webtoons
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



class ProfileSerializer(serializers.ModelSerializer):
    
    
    class LikeWebtoonSerializer(serializers.ModelSerializer):

        class AuthorSerializer(serializers.ModelSerializer):

            class Meta:
                model = Author
                fields = ('author_id', 'name')
        
        authors = AuthorSerializer(many=True)
        
        class Meta:
            model = Webtoon
            fields = ('webtoon_id', 'title', 'thumbnail', 'authors')

    
    class LookWebtoonSerializer(serializers.ModelSerializer):
        
        class WebtoonSerializer(serializers.ModelSerializer):
            
            class AuthorSerializer(serializers.ModelSerializer):
                
                class Meta:
                    model = Author
                    fields = ('author_id', 'name')
            
            authors = AuthorSerializer(many=True)
                    
            class Meta:
                model = Webtoon
                fields = ('webtoon_id', 'title', 'thumbnail', 'authors')
                
        webtoon = WebtoonSerializer()
                
        class Meta:
            model = Member_View_Webtoons
            fields = ('id', 'webtoon')

    
    class TagSerializer(serializers.ModelSerializer):

        class Meta:
            model = Tag
            fields = ('tag_id', 'name')

    tags = TagSerializer(many=True)
    member_viewed_webtoons = LookWebtoonSerializer(many=True)
    liked_webtoons = LikeWebtoonSerializer(many=True)
    
    class Meta:
        model = get_user_model()
        fields = ('id', 'nickname', 'profile_image_id', 'liked_thumbnail', 'resigned_time', 'tags', 'member_viewed_webtoons', 'liked_webtoons')


class ProfileUpdateSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = get_user_model()
        fields = ('id', 'password' )
        

class ProfileMainSerializer(serializers.ModelSerializer):
    
    class LikeWebtoonSerializer(serializers.ModelSerializer):

        class AuthorSerializer(serializers.ModelSerializer):

            class Meta:
                model = Author
                fields = ('author_id', 'name')

        authors = AuthorSerializer(many=True)
        
        class Meta:
            model = Webtoon
            fields = ('webtoon_id', 'title', 'thumbnail', 'authors')

    
    class TagSerializer(serializers.ModelSerializer):

        class Meta:
            model = Tag
            fields = ('tag_id', 'name')

    
    class Meta:
        model = Member
        fields = ('id', 'nickname', 'profile_image_id', 'tags', 'liked_webtoons')
        
          
# class TestUserSerializer(serializers.ModelSerializer):
    
#     class LookWebtoonSerializer(serializers.ModelSerializer):
        
#         class WebtoonSerializer(serializers.ModelSerializer):
            
#             class AuthorSerializer(serializers.ModelSerializer):
                
#                 class Meta:
#                     model = Author
#                     fields = ('author_id', 'name')
            
#             authors = AuthorSerializer(many=True)
                    
#             class Meta:
#                 model = Webtoon
#                 fields = ('webtoon_id', 'title', 'thumbnail', 'authors')
                
#         webtoon = WebtoonSerializer()
                
#         class Meta:
#             model = Member_View_Webtoons
#             fields = ('id', 'webtoon')
    
#     member_viewed_webtoons = LookWebtoonSerializer(many=True)
    
#     class Meta:
#         model = Member
#         fields = ('__all__')