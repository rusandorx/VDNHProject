"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from serverAPI.views import *
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/getPOI/', POIView.as_view()),
    path('api/createUser/', CreateUserAPI.as_view()),
    path('api/getHistory/', HistoryView.as_view()),
    path('api/addHistory/', AddHistoryView.as_view()),
    path('api/getReadyRoutes/', ReadyRotesView.as_view()),
]
