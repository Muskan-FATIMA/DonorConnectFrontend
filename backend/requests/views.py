from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Request
from .serializers import RequestSerializer

class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        req = self.get_object()
        user = request.user
        req.acceptedBy = user
        req.save()
        return Response({'status': 'request accepted'})
