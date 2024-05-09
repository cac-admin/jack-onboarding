from django.shortcuts import render
from .models import Users
from .serializers import UserSerializer
from rest_framework import viewsets
# Create your views here.

class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UserSerializer