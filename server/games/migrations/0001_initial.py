<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
# Generated by Django 4.1.1 on 2022-09-16 02:10
=======
# Generated by Django 4.1.1 on 2022-09-16 02:17
>>>>>>> 86fecf2 (Fix game api ver_0.5)
=======
# Generated by Django 4.1 on 2022-09-19 04:41
>>>>>>> f807105 (fix: makemigrations 다시)
=======
# Generated by Django 4.1.1 on 2022-09-16 05:21
>>>>>>> 91db506 (feat : 회원정보수정)
=======
# Generated by Django 4.1.1 on 2022-09-19 04:16
>>>>>>> 5784305 (Add ToonBTI views.py/question definition)

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5784305 (Add ToonBTI views.py/question definition)
    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('question_id', models.AutoField(primary_key=True, serialize=False)),
                ('question', models.CharField(max_length=200)),
                ('option1', models.CharField(max_length=100)),
                ('option2', models.CharField(max_length=100)),
<<<<<<< HEAD
<<<<<<< HEAD
=======
    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Question",
            fields=[
=======
    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Question",
            fields=[
>>>>>>> 91db506 (feat : 회원정보수정)
                ("question_id", models.AutoField(primary_key=True, serialize=False)),
                ("question", models.CharField(max_length=200)),
                ("option1", models.CharField(max_length=100)),
                ("option2", models.CharField(max_length=100)),
<<<<<<< HEAD
>>>>>>> 86fecf2 (Fix game api ver_0.5)
=======
>>>>>>> f807105 (fix: makemigrations 다시)
=======
>>>>>>> 91db506 (feat : 회원정보수정)
=======
>>>>>>> 5784305 (Add ToonBTI views.py/question definition)
            ],
        ),
    ]
