from rest_framework import serializers
from users.models import Users

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=Users
        fields=('__all__')