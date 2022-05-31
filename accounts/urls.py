"""john_airbnb accounts URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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

from django.urls import path, include, re_path
from accounts.views import main, current_user, UserList
# from dj_rest_auth.registration.views import RegisterView
# from dj_rest_auth.views import LoginView, LogoutView


urlpatterns = [
    path('', main),
    # path('account-confirm-email/<str:key>/', ConfirmEmailView.as_view()),
    # path('signup/', RegisterView.as_view(), name='register'),
    # path('login/', LoginView.as_view()),
    # path('logout/', LogoutView.as_view()),

    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),

    path('current_user/', current_user),
    path('users/', UserList.as_view()),

    path('accounts', main),
]
