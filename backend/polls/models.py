from django.db import models

# Create your models here.

class Courses(models.Model):
    CourseCode = models.CharField(max_length=500)
    CourseID = models.AutoField(primary_key=True)
    CourseProf = models.CharField(max_length=500)
    CourseDesc = models.CharField(max_length=500)   
