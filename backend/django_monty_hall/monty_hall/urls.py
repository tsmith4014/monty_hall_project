# project_urls.py
from django.urls import path, include
from .views import GameRunViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'gameruns', GameRunViewSet)

urlpatterns = [

    path('', include(router.urls)),
]
