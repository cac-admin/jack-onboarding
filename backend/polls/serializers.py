from rest_framework import serializers
from polls.models import Courses

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=Courses
        fields=('CourseCode','CourseID','CourseProf')