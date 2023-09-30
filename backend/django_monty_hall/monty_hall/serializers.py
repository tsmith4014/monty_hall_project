# serializers.py
from rest_framework import serializers
from .models import GameRun

class GameRunSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameRun
        fields = '__all__'
