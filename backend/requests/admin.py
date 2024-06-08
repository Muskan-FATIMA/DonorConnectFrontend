from django.contrib import admin
from .models import Request

class RequestAdmin(admin.ModelAdmin):
    list_display = ['user', 'id', 'recipientName', 'bldDonationLocation', 'bldRequiredBeforeDate', 'bldRequiredBeforeTime', 'bldGrp', 'unitsNeeded', 'contact', 'reason', 'acceptedBy']

admin.site.register(Request, RequestAdmin)