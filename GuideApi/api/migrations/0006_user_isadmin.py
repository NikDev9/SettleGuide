# Generated by Django 4.0.2 on 2022-02-24 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_user_isadmin'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='isAdmin',
            field=models.IntegerField(default=0),
        ),
    ]