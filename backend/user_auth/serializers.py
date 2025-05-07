from rest_framework import serializers
from django.core.mail import EmailMessage
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings

from django.contrib.auth import get_user_model
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_active=False  # User will be inactive until email verification
        )

        # Send verification email
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        verification_link = f'http://localhost:8000/auth/verify-email/{uid}/{token}/'

        # Email subject
        subject = 'Email Verification'

        # HTML content
        html_content = f"""
        <html>
            <body>
                <h2>Hi {user.username},</h2>
                <p>Thank you for registering on our website!</p>
                <p>Please click the link below to verify your email address:</p>
                <a href="{verification_link}" style="display:inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
                <p>If you did not request this, please ignore this email.</p>
                <p>Best regards,<br>The Team</p>
            </body>
        </html>
        """

        # Create email message
        email = EmailMessage(
            subject=subject,
            body=html_content,
            from_email=settings.EMAIL_HOST_USER,
            to=[user.email],
        )
        # Set the email content type to HTML
        email.content_subtype = 'html'

        # Send the email
        try:
            email.send()
            print(f'Verification email sent to {user.email}')
        except Exception as e:
            print(f'Error sending email: {str(e)}')

        return user
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)



    def validate(self, data):
        from django.contrib.auth import authenticate
        user = authenticate(**data)
        if user and user.is_active:
            refresh = RefreshToken.for_user(user)
            return {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        raise serializers.ValidationError('Invalid credentials or unverified account')





User = get_user_model()

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']  # include the fields you want to update

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
