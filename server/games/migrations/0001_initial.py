<<<<<<< HEAD
<<<<<<< HEAD
# Generated by Django 4.1.1 on 2022-09-16 02:10
=======
# Generated by Django 4.1.1 on 2022-09-16 02:17
>>>>>>> 86fecf2 (Fix game api ver_0.5)
=======
# Generated by Django 4.1 on 2022-09-19 04:41
>>>>>>> f807105 (fix: makemigrations 다시)

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

<<<<<<< HEAD
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
=======
    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Question",
            fields=[
                ("question_id", models.AutoField(primary_key=True, serialize=False)),
                ("question", models.CharField(max_length=200)),
                ("option1", models.CharField(max_length=100)),
                ("option2", models.CharField(max_length=100)),
>>>>>>> 86fecf2 (Fix game api ver_0.5)
=======
>>>>>>> f807105 (fix: makemigrations 다시)
            ],
        ),
    ]
