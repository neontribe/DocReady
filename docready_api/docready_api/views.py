from django.contrib.auth.models import User, Group
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework.response import Response
from docready_api.models import Advice, AdviceCategory
from docready_api.serializers import (
    AdviceSerializer,
    AdviceCategorySerializer,
)


@api_view(['GET'])
def api_root(request, format=None):
    """
    The entry endpoint of our API.
    """
    return Response({
        'categories': reverse('advicecategory-list', request=request),
        'advice': reverse('advice-list', request=request),
    })


class AdviceList(generics.ListCreateAPIView):
    """
    API endpoint that represents a list of advice entries.
    """
    model = Advice
    serializer_class = AdviceSerializer


class AdviceDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single advice entry.
    """
    model = Advice
    serializer_class = AdviceSerializer


class AdviceCategoryList(generics.ListCreateAPIView):
    """
    API endpoint that represents a list of advice entries.
    """
    model = AdviceCategory
    serializer_class = AdviceCategorySerializer


class AdviceCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that represents a single advice entry.
    """
    model = AdviceCategory
    serializer_class = AdviceCategorySerializer

