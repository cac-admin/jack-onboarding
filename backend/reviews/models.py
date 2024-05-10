from django.db import models

# Create your models here.

class Reviews(models.Model):
    ReviewID = models.AutoField(primary_key=True)
    ReviewDate = models.DateTimeField(auto_now_add=True)
    ReviewScore = models.IntegerField()
    ReviewDifficulty = models.IntegerField()
    ReviewContent = models.CharField(max_length=2000)

    ReviewCourse = models.CharField(max_length=500)
    ReviewAuthor = models.CharField(max_length=500)