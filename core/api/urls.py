from django.urls import path
from . import views 
from .views import MyTokenObtainPairView,customUserCreate
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns=[
    path('',views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('create/', customUserCreate.as_view(), name="create_user"),
    path('imageresize/',views.saveimage),
    path('images/',views.getimages)
]

