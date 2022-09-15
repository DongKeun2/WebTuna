from .models import Member
from rest_framework import serializers


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
        fields = ['nickname', 'email', 'birth', 'gender', 'password']