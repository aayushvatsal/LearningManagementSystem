from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Activity, Log, SystemHealth, Settings
from .serializers import ActivitySerializer, LogSerializer, SystemHealthSerializer, SettingsSerializer

class PlatformUsageView(APIView):
    def get(self, request):
        data = {
            'labels': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            'data': [100, 200, 300, 400, 500, 600, 700],
        }
        return Response(data)

class UserActivityView(APIView):
    def get(self, request):
        data = {'labels': ['Active Users', 'Inactive Users'], 'data': [80, 20]}
        return Response(data)

class LogsView(APIView):
    def get(self, request):
        logs = Log.objects.all()
        serializer = LogSerializer(logs, many=True)
        return Response(serializer.data)

    def delete(self, request, log_id):
        Log.objects.filter(id=log_id).delete()
        return Response({'status': 'Log deleted'})

class SystemHealthView(APIView):
    def get(self, request):
        health_data = SystemHealth.objects.first()
        serializer = SystemHealthSerializer(health_data)
        return Response(serializer.data)

class SettingsView(APIView):
    def get(self, request):
        settings = Settings.objects.first()
        serializer = SettingsSerializer(settings)
        return Response(serializer.data)

    def post(self, request):
        settings = Settings.objects.first()
        serializer = SettingsSerializer(settings, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
