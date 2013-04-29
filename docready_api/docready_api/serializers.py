from django.contrib.auth.models import User, Group, Permission
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


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    permissions = serializers.ManySlugRelatedField(
        slug_field='codename',
        queryset=Permission.objects.all()
    )

    class Meta:
        model = Group
        fields = ('url', 'name', 'permissions')
