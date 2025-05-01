from django.contrib import admin
from django.urls import path
from .views import RegisterView, LoginView, VerifyEmailView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UserDataView
from .views import UpdateUserView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('verify-email/<uidb64>/<token>/', VerifyEmailView.as_view(), name='verify_email'),
    path('api/user-data/', UserDataView.as_view(), name='user-data'),
    path('update-user/', UpdateUserView.as_view(), name='update-user'),

]

