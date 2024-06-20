from .models import Contact
from .serializers import ContactSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from django.core.mail import EmailMessage
from rest_framework.response import Response
from django.conf import settings
from email.utils import formataddr

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    @action(detail=False, methods=['post'])
    def contactmail(self, request):
        data = request.data
        fullname = data.get('fullname')
        email = data.get('email')
        msg = data.get('msg')

        email_subject = f'New Query from {fullname} <{email}>'
        email_body = f'''
        <p>Dear Team,</p>
        <p>You have received a new query from the DonorConnect website.</p>
        <h3>QUERY DETAILS:</h3>
        <div>
            <span>Name: <strong>{fullname}</strong></span><br>
            <span>Email: <strong>{email}</strong></span><br>
            <span>Query: <strong>{msg}</strong></span><br>
        </div>
        <p>Warm regards,<br>DonorConnect Support Team</p>
        '''

        from_email = formataddr((fullname, email))
        email_message = EmailMessage(
            email_subject,
            email_body,
            from_email,
            [settings.EMAIL_HOST_USER],
        )
        email_message.content_subtype = 'html'

        try:
            email_message.send(fail_silently=False)
            return Response({'status': 'query sent'})
        except Exception as e:
            return Response({'status': 'error', 'message': str(e)}, status=500)
