from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum
from .models import User, Revenue
from .serializers import UserSerializer, RevenueSerializer

# User ViewSet for handling CRUD operations
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Revenue ViewSet for handling CRUD operations
class RevenueViewSet(viewsets.ModelViewSet):
    queryset = Revenue.objects.all()
    serializer_class = RevenueSerializer

    @action(detail=False, methods=['get'])
    def total_revenue(self, request):
        total_revenue = Revenue.objects.aggregate(total=Sum('amount'))['total']
        return Response({'total_revenue': total_revenue})

    @action(detail=False, methods=['get'])
    def revenue_breakdown(self, request):
        revenues = Revenue.objects.all()
        serializer = self.get_serializer(revenues, many=True)
        return Response({'revenue_breakdown': serializer.data})

# System Alerts View (no model, only for demonstration purposes)
class SystemAlertsView(viewsets.ViewSet):
    def list(self, request):
        return Response({
            'alerts': [
                'New user registration spike detected',
                'Course enrollment limit reached',
                'Server response time slowing down'
            ]
        })
