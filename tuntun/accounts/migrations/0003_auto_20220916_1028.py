# Generated by Django 3.2.9 on 2022-09-16 01:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='member',
            options={},
        ),
        migrations.AlterModelManagers(
            name='member',
            managers=[
            ],
        ),
        migrations.RenameField(
            model_name='member',
            old_name='is_removed',
            new_name='is_admin',
        ),
        migrations.RemoveField(
            model_name='member',
            name='age',
        ),
        migrations.RemoveField(
            model_name='member',
            name='created_time',
        ),
        migrations.RemoveField(
            model_name='member',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='member',
            name='groups',
        ),
        migrations.RemoveField(
            model_name='member',
            name='is_staff',
        ),
        migrations.RemoveField(
            model_name='member',
            name='is_superuser',
        ),
        migrations.RemoveField(
            model_name='member',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='member',
            name='user_permissions',
        ),
        migrations.RemoveField(
            model_name='member',
            name='username',
        ),
        migrations.AddField(
            model_name='member',
            name='birth',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='member',
            name='gender',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='member',
            name='date_joined',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='member',
            name='email',
            field=models.EmailField(default='', max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='member',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='member',
            name='nickname',
            field=models.CharField(default='', max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='member',
            name='resigned_time',
            field=models.DateTimeField(blank=True),
        ),
    ]
