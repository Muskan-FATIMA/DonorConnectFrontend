from rest_framework import serializers
from .models import Request

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields =  ['user', 'id', 'recipientName', 'bldDonationLocation', 'bldRequiredBeforeDate', 'bldRequiredBeforeTime', 'bldGrp', 'unitsNeeded', 'contact', 'reason', 'acceptedBy']