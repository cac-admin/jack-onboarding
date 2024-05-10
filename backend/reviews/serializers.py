from rest_framework import serializers
from reviews.models import Reviews

class ReviewSerializer(serializers.ModelSerializer):
   # ReviewDate = serializers.DateTimeField(format="%m-%d-&y %H:%M:%S")

    class Meta:
        model=Reviews
        fields=('__all__')