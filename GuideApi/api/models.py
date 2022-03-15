from distutils.log import info
from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    isAdmin = models.IntegerField(default=0)

class Home(models.Model):
    heading = models.CharField(max_length=100)
    img = models.CharField(max_length=100)
    info = models.CharField(max_length=100, default="djhfskdhf")
    link = models.CharField(max_length=100)

class Community(models.Model):
    channel = models.CharField(max_length=100)
    admin = models.IntegerField(default=0)
