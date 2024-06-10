from django.db import models
from django.contrib.auth.models import User

class Contact(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='contact', default=0)
    fullname = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    msg = models.TextField()

    def __str__(self):
        return f"{self.email} ({self.msg})"
    