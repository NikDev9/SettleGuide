# Generated by Django 4.0.2 on 2022-02-23 23:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_home'),
    ]

    operations = [
        migrations.AddField(
            model_name='home',
            name='info',
            field=models.CharField(default='djhfskdhf', max_length=100),
        ),
    ]
