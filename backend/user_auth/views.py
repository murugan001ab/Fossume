from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import HttpResponse
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serializers import RegisterSerializer, LoginSerializer
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator

from .serializers import UserUpdateSerializer

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully. Please verify your email.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyEmailView(APIView): 
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)

            if default_token_generator.check_token(user, token):
                user.is_active = True
                user.save()
                return HttpResponse({'message Email verified successfully.'}, status=status.HTTP_200_OK)
            return Response({'message': 'Invalid or expired token.'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'message': 'Invalid user.'}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            tokens = serializer.validated_data
            return Response(tokens, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


class UserDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user 
        print(user)
         # Django automatically gets user from the token
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            # Add more fields if you added custom fields
        })



class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UserUpdateSerializer(instance=request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User updated successfully', 'user': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

