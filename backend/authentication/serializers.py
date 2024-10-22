from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser, OTP, Course

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'confirm_password', 'role']

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords must match"})
        return data

    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data.pop('confirm_password', None)
        user = CustomUser.objects.create_user(**validated_data, password=password)
        return user

class OTPSerializer(serializers.ModelSerializer):
    class Meta:
        model = OTP
        fields = ['otp_code']
        
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        user = authenticate(email=email, password=password)
        if user is None:
            raise serializers.ValidationError("Invalid login credentials")
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username', 'role']

class UpdateRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['role']
        

class CourseSerializer(serializers.ModelSerializer):
    instructor = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.filter(role='instructor'))
    users = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.filter(role='user'), many=True, required=False)
    
    instructor_name = serializers.CharField(source='instructor.username', read_only=True)
    user_names = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'duration', 'prerequisites', 'instructor', 'instructor_name', 'users', 'user_names']

    def get_user_names(self, obj):
        return [{"id": user.id, "name": user.username} for user in obj.users.all()]





























# from rest_framework import serializers
# from django.contrib.auth import authenticate
# from .models import CustomUser, OTP, Course
# from django.utils import timezone

# class RegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)
#     confirm_password = serializers.CharField(write_only=True)
#     otp = serializers.CharField(write_only=True)  # Add OTP field in the serializer

#     class Meta:
#         model = CustomUser
#         fields = ['username', 'email', 'password', 'confirm_password', 'role', 'otp']

#     def validate(self, data):
#         # Check if passwords match
#         if data['password'] != data['confirm_password']:
#             raise serializers.ValidationError({"confirm_password": "Passwords must match"})
        
#         # OTP validation
#         email = data.get('email')
#         otp = data.get('otp')
#         otp_record = OTP.objects.filter(user_email=email, otp=otp).first()
#         if not otp_record or not otp_record.is_valid():
#             raise serializers.ValidationError({"otp": "Invalid or expired OTP"})

#         return data

#     def create(self, validated_data):
#         # OTP verified successfully, create user
#         password = validated_data.pop('password')
#         validated_data.pop('confirm_password', None)
#         validated_data.pop('otp', None)  # Remove OTP from user creation data
#         user = CustomUser.objects.create_user(**validated_data, password=password)

#         # Clean up OTP
#         OTP.objects.filter(user_email=validated_data['email']).delete()

#         return user

# class LoginSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     password = serializers.CharField()

#     def validate(self, data):
#         email = data.get('email')
#         password = data.get('password')
#         user = authenticate(email=email, password=password)
#         if user is None:
#             raise serializers.ValidationError("Invalid login credentials")
#         return user

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['id', 'email', 'username', 'role']

# class UpdateRoleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['role']

# class CourseSerializer(serializers.ModelSerializer):
#     instructor = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.filter(role='instructor'))
#     users = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.filter(role='user'), many=True, required=False)
    
#     instructor_name = serializers.CharField(source='instructor.username', read_only=True)
#     user_names = serializers.SerializerMethodField()

#     class Meta:
#         model = Course
#         fields = ['id', 'name', 'description', 'duration', 'prerequisites', 'instructor', 'instructor_name', 'users', 'user_names']

#     def get_user_names(self, obj):
#         return [{"id": user.id, "name": user.username} for user in obj.users.all()]










# from rest_framework import serializers
# from django.contrib.auth import authenticate  # Import the authenticate function
# from .models import CustomUser

# class RegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)
#     confirm_password = serializers.CharField(write_only=True)

#     class Meta:
#         model = CustomUser
#         fields = ['username', 'email', 'password', 'confirm_password', 'role']

#     def validate(self, data):
#         if data['password'] != data['confirm_password']:
#             raise serializers.ValidationError({"confirm_password": "Passwords must match"})
#         return data

#     def create(self, validated_data):
#         password = validated_data.pop('password')
#         validated_data.pop('confirm_password', None)
#         user = CustomUser.objects.create_user(**validated_data, password=password)
#         return user

# class LoginSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     password = serializers.CharField()

#     def validate(self, data):
#         email = data.get('email')
#         password = data.get('password')
#         user = authenticate(email=email, password=password)  # Authenticate user based on email and password
#         if user is None:
#             raise serializers.ValidationError("Invalid login credentials")
#         return user

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['id', 'email', 'username', 'role']

# class UpdateRoleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['role']
