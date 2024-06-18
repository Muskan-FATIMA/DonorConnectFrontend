from django.db import models

class Feedback(models.Model):
    recipient = models.CharField(max_length=50)
    donor = models.CharField(max_length=50)
    thanksmsg = models.TextField()

def __str__(self):
        return f"Feedback from {self.recipient} to {self.donor.acceptedBy.username}"