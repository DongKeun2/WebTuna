# Generated by Django 4.1.1 on 2022-09-16 02:10

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('author_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Day',
            fields=[
                ('day_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('genre_id', models.AutoField(primary_key=True, serialize=False)),
                ('genre_type', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Platform',
            fields=[
                ('platform_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('tag_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Webtoon',
            fields=[
                ('webtoon_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('summary', models.TextField(blank=True)),
                ('thumbnail', models.CharField(max_length=1000)),
                ('page', models.CharField(max_length=1000)),
                ('adult', models.BooleanField()),
                ('image_type1', models.FloatField(null=True)),
                ('image_type2', models.FloatField(null=True)),
                ('image_type3', models.FloatField(null=True)),
                ('image_type4', models.FloatField(null=True)),
                ('image_type5', models.FloatField(null=True)),
                ('image_type6', models.FloatField(null=True)),
                ('view_count', models.IntegerField(default=0)),
                ('authors', models.ManyToManyField(related_name='author_webtoons', to='webtoons.author')),
                ('days', models.ManyToManyField(related_name='day_webtoons', to='webtoons.day')),
                ('genres', models.ManyToManyField(related_name='genre_webtoons', to='webtoons.genre')),
                ('platforms', models.ManyToManyField(related_name='platform_webtoons', to='webtoons.platform')),
                ('tags', models.ManyToManyField(related_name='tag_webtoons', to='webtoons.tag')),
            ],
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('rating_id', models.AutoField(primary_key=True, serialize=False)),
                ('created_time', models.DateTimeField(auto_now_add=True)),
                ('rating', models.FloatField(validators=[django.core.validators.MinValueValidator(0.5), django.core.validators.MaxValueValidator(5)])),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_ratings', to=settings.AUTH_USER_MODEL)),
                ('webtoon', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='webtoon_ratings', to='webtoons.webtoon')),
            ],
        ),
    ]