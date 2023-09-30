# urls.py
from django.urls import path, re_path, include
from django.contrib import admin
from monty_hall import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/monty_hall/', include('monty_hall.urls')),  # API routes for our app
    re_path(r'^.*$', views.index),  # Catch-all pattern to serve your React app
]


