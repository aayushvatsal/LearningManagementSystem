from rest_framework import serializers
from .models import Content, ContentType

class ContentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentType
        fields = ['type_name']

class ContentSerializer(serializers.ModelSerializer):
    content_type = ContentTypeSerializer(many=True)  # Handles multiple content types

    class Meta:
        model = Content
        fields = ['id', 'title', 'content_type', 'file', 'text_content', 'created_by', 'created_at', 'updated_at']
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    def create(self, validated_data):
        content_types_data = validated_data.pop('content_type')
        content = Content.objects.create(**validated_data)
        for content_type_data in content_types_data:
            content_type, created = ContentType.objects.get_or_create(**content_type_data)
            content.content_type.add(content_type)
        return content











# from rest_framework import serializers
# from .models import Content

# class ContentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Content
#         fields = ['id', 'title', 'content_type', 'file', 'text_content', 'created_by', 'created_at', 'updated_at']
#         read_only_fields = ['created_by', 'created_at', 'updated_at']
