# views.py
from django.shortcuts import render
from rest_framework import viewsets
from .models import GameRun
from .serializers import GameRunSerializer

class GameRunViewSet(viewsets.ModelViewSet):
    queryset = GameRun.objects.all()
    serializer_class = GameRunSerializer



def index(request):
    return render(request, 'index.html')