from django.shortcuts import render
from .models import Newsletter
from .serializers import NewsletterSerializer
from rest_framework import viewsets

class NewsletterViewSet(viewsets.ModelViewSet):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer
