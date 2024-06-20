from .models import Request
from .serializers import RequestSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from django.core.mail import EmailMessage
from rest_framework.response import Response
from email.utils import formataddr
from django.contrib.auth.models import User

class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

    # Email to every user of the website (except the creator of that request), on creating a new request 
    def perform_create(self, serializer):
        request = serializer.save()
        users = User.objects.exclude(id=request.user.id)
        for user in users:
            self.send_email_notification(user, request)

    def send_email_notification(self, user, request):
        subject = 'Urgent Blood Donation Request - Your Help Needed'
        message = f'''
        <html>
            <head>
                <style>
                    button {{
                        border: 2px solid #28a745;
                        background-color: #28a745;
                        border-radius: 5px;
                        cursor: pointer;
                        padding: 5px 10px;
                    }}
                </style>
            </head>
            <body>
                <p>Hey,</p>
                <p>A new blood donation request has been added to DonorConnect, and your help is urgently needed.</p>
                <h3>BLOOD REQUEST DETAILS:</h3>
                <div>
                    <span>Blood Grp required: <strong>{request.bldGrp}</strong></span><br>
                    <span>Required Before: <strong>{request.bldRequiredBeforeDate}</strong></span><br>
                    <span>Location: <strong>{request.bldDonationLocation}</strong></span><br>
                </div>
                <p>If you are able to assist, please click on this button to view the request details and accept it 👇🏻</p>
                <button><a href='http://localhost:5173/view-request'  style="color: #fffaf5; text-decoration: none; font-weight: bold;">View and Accept Request</a></button>
                <p><strong>Your timely response can save a life!!</strong></p>
                <p>If you are unable to help, we kindly ask that you share this request with your contacts who might be in a position to assist. Please spread the word about <a href='http://localhost:5173'>Our Website</a>.
                </p>
                <p>Thank you for your compassion and support in making a difference in someone's life.</p>
                <p>Warm regards,<br>Team DonorConnect</p>
            </body>
        </html>
        '''
        from_email = formataddr(('Team DonorConnect', 'donorconnect001@gmail.com'))
        recipient_list = [user.email]
        email = EmailMessage(
                    subject,
                    message,
                    from_email,
                    recipient_list
                )
        email.content_subtype = 'html'  # Important for sending HTML email
        try:
            email.send(fail_silently=False)
        except Exception as e:
            print(f"Error sending email to {user.email}: {e}")

    # Email to donor and recipient the details of each other, on accepting a request
    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        req = self.get_object()
        donor = request.user
        profile = donor.profile 
        req.acceptedBy = donor
        req.save()

        try:
            # Email to the donor
            donor_email_subject = 'You accepted a request'
            donor_email_body = f'''
            <p>Dear {profile.fullname},</p>
            <p>You have just accepted a blood request from our website.</p>
            <p>Here are the details of the recipient, please contact the recipient as soon as possible!!</p>
            <h3>RECIPIENT DETAILS:</h3>
            <div>
                <span>Name: <strong>{req.recipientName}</strong></span><br>
                <span>Age: <strong>{req.recipientAge}</strong></span><br>
                <span>Blood Group Required: <strong>{req.bldGrp}</strong></span><br>
                <span>Required Before: <strong>{req.bldRequiredBeforeDate}</strong></span><br>
                <span>Location: <strong>{req.bldDonationLocation}</strong></span><br>
                <span>Contact: <strong>{req.contact}</strong></span><br>
            </div>
            <p>Thank you for your compassion and support in making a difference in someone's life.</p>
            <p>Warm regards,<br>Team DonorConnect</p>

            '''

            from_email = formataddr(('Team DonorConnect', 'donorconnect001@gmail.com'))
            donor_email = EmailMessage(
                donor_email_subject,
                donor_email_body,
                from_email, 
                [profile.user.email], 
            )
            donor_email.content_subtype = 'html' 
            donor_email.send(fail_silently=False)

            # Email to the recipient
            recipient_email_subject = 'Blood request accepted'
            recipient_email_body = f'''
            <html>
                <head>
                    <style>
                        button {{
                        border: 2px solid #28a745;
                        background-color: #28a745;
                        border-radius: 5px;
                        cursor: pointer;
                        padding: 5px 10px;
                    }}
                    </style>
                </head>
                <body>
                    <p>Dear {req.user.profile.fullname},</p>
                    <p>The blood donation request for <strong>{req.recipientName}</strong> added by you on Our Website has just been accepted by someone.</p>
                    <p>Here are the details of the donor, please contact the donor as soon as possible!!</p>
                    <h3>DONOR DETAILS:</h3>
                    <div>
                        <span>Name: <strong>{profile.fullname}</strong></span><br>
                        <span>Age: <strong>{profile.age}</strong></span><br>
                        <span>Blood Group: <strong>{profile.bldGrp}</strong></span><br>
                        <span>Address: <strong>{profile.address}</strong></span><br>
                        <span>Contact: <strong>{profile.contact}</strong></span><br>
                    </div>
                    <p>We pray for a better health for you and your loved ones.</p>
                    <p>Warm regards,<br>Team DonorConnect</p>
                    <br>
                    <p>Once the blood donation process will get successful, we request you to please give your valuable feedback here 👇🏻</p>
                    <button><a href="http://localhost:5173/feedback" style="color: #fffaf5; text-decoration: none; font-weight: bold;">Give Your Feedback</a></button>
                </body>
            </html>
            '''

            recipient_email = EmailMessage(
                recipient_email_subject,
                recipient_email_body,
                from_email, 
                [req.user.email], 
            )
            recipient_email.content_subtype = 'html'  
            recipient_email.send(fail_silently=False)

        except Exception as e:
            print(f"Error sending email: {e}")

        return Response({'status': 'request accepted'})
