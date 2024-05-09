from django.db import models

# Create your models here.

class Users(models.Model):
    Username = models.CharField(max_length=500)
    UserID = models.AutoField(primary_key=True)
    Password = models.CharField(max_length=500)