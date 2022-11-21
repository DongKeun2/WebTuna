from django.db import models
<<<<<<< HEAD
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from webtoons.models import Tag, Webtoon
=======
from django.contrib.auth.models import AbstractUser
from webtoons.models import Genre, Tag, Webtoon
>>>>>>> b984062 (feat: db-kakao)

  
class UserManager(BaseUserManager):
    # 일반 user 생성
    def create_user(self, email, nickname, birth, gender, liked_thumbnail, password=None):
        if not email:
            raise ValueError('must have user email')
        if not nickname:
            raise ValueError('must have user nickname')
        user = self.model(
            email = self.normalize_email(email),
            nickname = nickname,
            birth = birth,
            gender = gender,
            liked_thumbnail= liked_thumbnail
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    # 관리자 user 생성
    def create_superuser(self, email, nickname, birth, gender, liked_thumbnail, password=None):
        user = self.create_user(
            email,
            password = password,
            nickname = nickname,
            birth = birth,
            gender = gender,
            liked_thumbnail = liked_thumbnail
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class Member(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(default='', max_length=255, null=False, blank=False, unique=True)
    nickname = models.CharField(default='', max_length=100, null=False, blank=False, unique=True)
    gender = models.CharField(default='', max_length=100, null=False, blank=False,)
    birth = models.IntegerField(default = 0, blank=False)
<<<<<<< HEAD
    profile_image_url = models.TextField(blank=True)
<<<<<<< HEAD
    count = models.IntegerField(default=0)
=======
    profile_image_id = models.IntegerField(default = 0, blank=True)
>>>>>>> 611a376 (feat: 비밀번호 확인/ 닉네임,이메일 중복확인)
    liked_thumbnail = models.CharField(max_length=100, null=False)
    resigned_time = models.DateTimeField(blank=True, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag,related_name="tag_users")
    view_webtoons = models.ManyToManyField(Webtoon, through='Member_View_Webtoons')
    liked_webtoons = models.ManyToManyField(Webtoon,related_name="liked_webtoon_users")
=======
    created_time = models.DateTimeField(auto_now_add=True)
    is_removed = models.BooleanField(default=False)
    resigned_time = models.DateTimeField(auto_now = True)
    tag = models.ManyToManyField(Tag,related_name="tag_users")
    fav_genres = models.ManyToManyField(Genre,related_name="genres")
    view_webtoon = models.ManyToManyField(Webtoon,related_name="clicked_webtoons")
    liked_webtoon = models.ManyToManyField(Webtoon,related_name="fav_webtoons")
    followings = models.ManyToManyField('self', symmetrical=False, related_name="follwers")
>>>>>>> b984062 (feat: db-kakao)
    
    # User 모델의 필수 field
    is_active = models.BooleanField(default=True)    
    is_admin = models.BooleanField(default=False)
    
    # 헬퍼 클래스 사용
    objects = UserManager()

    # 사용자의 username field는 email로 설정
    USERNAME_FIELD = 'email'
    # 필수로 작성해야하는 field
    REQUIRED_FIELDS = ['nickname', 'gender', 'birth', 'liked_thumbnail']

    def __str__(self):
        return self.email
    

class Member_View_Webtoons(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='member_viewed_webtoons')
    webtoon = models.ForeignKey(Webtoon, on_delete=models.CASCADE)

    class Meta:
        db_table = 'accounts_member_view_webtoons'
        ordering = ['-id']
