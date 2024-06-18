from rest_framework import serializers
from .models import Request

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields =  ['user', 'id', 'recipientName', 'recipientAge', 'bldDonationLocation', 'bldRequiredBeforeDate', 'bldGrp', 'contact',  'acceptedBy']