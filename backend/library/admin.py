from django.contrib import admin
from .models import Content, ContentType

class ContentAdmin(admin.ModelAdmin):
    list_display = ['title', 'get_content_types', 'created_by', 'created_at', 'updated_at']
    search_fields = ['title', 'content_type__type_name', 'created_by__username']

    def get_content_types(self, obj):
        return ", ".join([ct.type_name for ct in obj.content_type.all()])

    get_content_types.short_description = 'Content Types'

admin.site.register(Content, ContentAdmin)
admin.site.register(ContentType)
