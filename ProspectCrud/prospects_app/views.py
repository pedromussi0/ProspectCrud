from django.shortcuts import render
from rest_framework import viewsets, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import Lead
from .serializers import LeadSerializer, UserSerializer

# Create your views here.



class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

class LeadListCreateView(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]

class LeadRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]

class LoginView(APIView):
    def post(self, request):
        form = AuthenticationForm(data=request.data)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return Response({"detail": "Successfully logged in."})
        return Response(form.errors, status=400)

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"detail": "Successfully logged out."})

class UserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        return Response({
            "id": request.user.id,
            "username": request.user.username,
            "email": request.user.email
        })

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        try:
            # Extract data from request
            username = request.data.get('username')
            email = request.data.get('email')
            password = request.data.get('password')
            
            # Validate required fields
            if not all([username, email, password]):
                return Response(
                    {"message": "Please provide username, email and password"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Check if username already exists
            if User.objects.filter(username=username).exists():
                return Response(
                    {"message": "Username already exists"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Check if email already exists
            if User.objects.filter(email=email).exists():
                return Response(
                    {"message": "Email already exists"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Create new user without password validation
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password  # Django will hash this automatically
            )
            
            return Response(
                {
                    "message": "User registered successfully",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email
                    }
                },
                status=status.HTTP_201_CREATED
            )
            
        except Exception as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        if user == request.user:
            return Response(
                {"message": "Cannot delete your own account"},
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().destroy(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        
        # Prevent users from modifying their own admin status
        if instance == request.user and 'is_staff' in request.data:
            return Response(
                {"message": "Cannot modify your own admin status"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        self.perform_update(serializer)
        return Response(serializer.data)
