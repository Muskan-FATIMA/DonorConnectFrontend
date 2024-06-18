from django.contrib import admin
from .models import Request

class RequestAdmin(admin.ModelAdmin):
    list_display =['user', 'id', 'recipientName', 'recipientAge', 'bldDonationLocation', 'bldRequiredBeforeDate', 'bldGrp', 'contact',  'acceptedBy']

admin.site.register(Request, RequestAdmin)