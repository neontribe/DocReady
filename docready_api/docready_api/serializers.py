from docready_api.models import Advice, AdviceCategory
from rest_framework import serializers


class AdviceCategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AdviceCategory
        fields = ('url', 'name')


class AdviceSerializer(serializers.HyperlinkedModelSerializer):
    categories = serializers.ManySlugRelatedField(
        slug_field='name',
        queryset=AdviceCategory.objects.all()
    )

    class Meta:
        model = Advice
        fields = ('url', 'title', 'body', 'categories')
