from django.db import models
from django.contrib.auth.models import User

class Request(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requests')
    recipientName = models.CharField(max_length=50)
    recipientAge=models.IntegerField(default=0)
    bldDonationLocation = models.CharField(max_length=255)
    bldRequiredBeforeDate = models.DateField()
    BLOOD_GROUP_CHOICES = [
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
    ]
    bldGrp = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES)
    contact = models.CharField(max_length=15)
    acceptedBy = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='accepted_requests')

    def __str__(self):
        return f"{self.recipientName} ({self.acceptedBy})"