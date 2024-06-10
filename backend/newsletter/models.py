from django.db import models
from django.contrib.auth.models import User

class Newsletter(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='newsletter', default=0)
    email = models.EmailField(max_length=50)

    def __str__(self):
        return f"{self.email} "
    