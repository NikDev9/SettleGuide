# Generated by Django 4.0.2 on 2022-02-24 20:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_home_info'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='isAdmin',
        ),
    ]
