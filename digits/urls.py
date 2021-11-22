from django.urls import path
from .views import *

#app_name = 'digits'
urlpatterns = [
    path('', gallery, name='gallery'),
    #path('zoom/', zoom, name='zoom'),
    path('zoom/<int:id>/', zoom, name='zoom'),
]
