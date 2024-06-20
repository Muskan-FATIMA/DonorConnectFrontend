from profiles.models import Profile
from rest_framework import viewsets
from .models import Feedback
from .serializers import FeedbackSerializer
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.response import Response
from email.utils import formataddr
from django.core.mail import EmailMessage

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

@receiver(post_save, sender=Feedback)
def send_thank_you_email(sender, instance, created, **kwargs):
    if created:
        try:
            donor_profile = Profile.objects.get(fullname=instance.donor)
            donor_email = donor_profile.user.email

            subject = "Token of Thanks from DonorConnect!"
            message = f'''
            <html>
                <head>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                        }}
                        .container {{
                            width: 70%;
                            line-height: 1.6;
                            margin: 0 auto;
                            padding: 0 20px;
                            border: 10px solid #840807;
                            background-color: #fffaf5;
                        }}
                        h1 {{
                            color: #840807;
                            text-align: center;
                            font-size: 40px;
                            font-weight: bolder;
                        }}
                        p {{
                            font-size: 18px;
                            color: #333;
                            text-align: center;
                        }}
                        h2 {{
                            color: #840807;
                            text-align: center;
                            font-size: 22px;
                            text-decoration: underline;
                            text-underline-offset: 4px;
                        }}
                        .divider {{
                            width: 20%;
                            height: 1px;
                            background-color: #999;
                            border-radius: 20px;
                            margin: 40px auto 5px auto;
                            text-align: center;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }}
                        .footer {{
                            font-size: 14px;
                            color: #999;
                            text-align: center;
                        }}
                        @media only screen and (max-width: 600px) {{
                            .container {{
                                max-width: 90%;
                                padding: 0 10px;
                            }}
                            h1{{
                                font-size: 28px;
                            }}
                            p {{
                                font-size: 14px;
                            }}
                            h2{{
                                font-size: 18px;
                            }}
                            .footer {{
                                font-size: 12px;
                            }}
                        }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Certificate of Appreciation</h1>
                        <p>This certificate is proudly presented to</p>
                        <h2>{instance.donor}</h2>
                        <p>We, at DonorConnect, extend our deepest gratitude in the heartfelt recognition of your generous and selfless blood donation. Your contribution has made a profound and life-saving difference in the life of <strong>{instance.recipient}</strong>.</p>
                        <p>Thank you for your generosity and compassion ❤️</p>
                        <div class="divider"></div>
                        <p class="footer">Team DonorConnect</p>
                    </div>
                </body>
            </html>
            '''
            from_email = formataddr(('Team DonorConnect', 'donorconnect001@gmail.com'))
            email = EmailMessage(
                subject,
                message,
                from_email,
                [donor_email],
            )
            email.content_subtype = 'html'
            email.send(fail_silently=False)
            return Response({'status': 'query sent'})
        except Exception as e:
            return Response({'status': 'error', 'message': str(e)}, status=500)
