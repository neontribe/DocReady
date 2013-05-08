from django.conf.urls import patterns, url, include
from rest_framework.urlpatterns import format_suffix_patterns
from docready_api.views import (
    AdviceList,
    AdviceCategoryList,
    AdviceDetail,
    AdviceCategoryDetail,
)

urlpatterns = patterns(
    'docready_api.views',
    url(r'^$', 'api_root'),
    url(r'^categories/$', AdviceCategoryList.as_view(), name='advicecategory-list'),
    url(r'^categories/(?P<pk>\d+)/$', AdviceCategoryDetail.as_view(), name='advicecategory-detail'),
    url(r'^advice/$', AdviceList.as_view(), name='advice-list'),
    url(r'^advice/(?P<pk>\d+)/$', AdviceDetail.as_view(), name='advice-detail'),
)

# Format suffixes
urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json', 'api'])

# Default login/logout views
urlpatterns += patterns(
    '',
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
)
