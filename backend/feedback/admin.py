from django.contrib import admin
from .models import Feedback

class FeedbackAdmin(admin.ModelAdmin):
    list_display = ['id', 'recipient', 'donor', 'thanksmsg']

admin.site.register(Feedback, FeedbackAdmin)