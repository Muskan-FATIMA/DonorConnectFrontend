from django.contrib import admin
from .models import Contact

class ContactAdmin(admin.ModelAdmin):
    list_display = ['user', 'id', 'fullname', 'email', 'msg']

admin.site.register(Contact, ContactAdmin)