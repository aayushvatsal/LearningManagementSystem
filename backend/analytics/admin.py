from django.contrib import admin
from .models import User, Revenue

# Check if the User model is already registered
if not admin.site.is_registered(User):
    @admin.register(User)
    class UserAdmin(admin.ModelAdmin):
        list_display = ['id', 'username']
        search_fields = ['username']
        ordering = ['id']

# Register Revenue model
@admin.register(Revenue)
class RevenueAdmin(admin.ModelAdmin):
    list_display = ['id', 'amount', 'date']
    list_filter = ['date']
    search_fields = ['amount']
    ordering = ['date']
    date_hierarchy = 'date'
