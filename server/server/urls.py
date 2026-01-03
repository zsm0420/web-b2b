"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponseRedirect
from django.urls import reverse

from server import settings

def redirect_to_frontend(request):
    """重定向到前端网站"""
    return HttpResponseRedirect('https://web-fjzll71iq-mos-projects-e998b3b8.vercel.app')

urlpatterns = [
    path('', redirect_to_frontend),  # 根路径重定向到前端
    path('admin/', admin.site.urls),
    path('myapp/', include('myapp.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
