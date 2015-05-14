from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.core.urlresolvers import reverse_lazy
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.generic import RedirectView

from app_website.views import (IndexView, RegisterView, LoginView, LogoutView, 
                               CompleteInfoView, VeriAwaitView, VeriFailView, FaqView, ContactUsView, 
                               UserInfoView, DeliInstaView, RepairsView, CheckoutDIView, CheckoutRepairsView, 
                               OrdersView, NewOrderReq, 
                               ManageView, ManageLoginView, UserManageView, UserInfoTab, )

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'liqing.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # admin
    url(r'^d033e22ae348aeb5660fc2140aec35850c4da997/', include(admin.site.urls)),

    # manage
    url(r'^gerryhost/$', ManageView.as_view(), name='manage'),
    url(r'^gerryhost/login/$', ManageLoginView.as_view(), name='manage_login'),
    url(r'^gerryhost/usermanage/$', UserManageView.as_view(), name='user_manage'),
    url(r'tab_user_info/(?P<page>\d+)/(?P<count>\d+)/$', UserInfoTab.as_view(), name='tab_user_info'),

    # view
    url(r'index/$', IndexView.as_view(), name='index'),
    url(r'register/$', RegisterView.as_view(), name='register'),
    url(r'login/$', LoginView.as_view(), name='login'),
    url(r'complete-info/$', CompleteInfoView.as_view(), name='complete_info'),
    url(r'veri-await/$', VeriAwaitView.as_view(), name='veri_await'),
    url(r'veri-fail/$', VeriFailView.as_view(), name='veri_fail'),
    url(r'logout/$', LogoutView.as_view(), name='logout'),
    url(r'faq/$', FaqView.as_view(), name='faq'),
    url(r'contact-us/$', ContactUsView.as_view(), name='contact_us'),
    url(r'user-info/$', UserInfoView.as_view(), name='user_info'),
    url(r'deli-insta/$', DeliInstaView.as_view(), name='deli_insta'),
    url(r'repairs/$', RepairsView.as_view(), name='repairs'),
    url(r'deli-insta/checkout/$', CheckoutDIView.as_view(), name='checkout_deli_insta'),
    url(r'repairs/checkout/$', CheckoutRepairsView.as_view(), name='checkout_repairs'),
    url(r'orders/$', OrdersView.as_view(), name='orders'),

    # post
    url(r'new_order_req/$', NewOrderReq.as_view()),

    # default
    url(r'^$', RedirectView.as_view(url=reverse_lazy('index'))),
)
