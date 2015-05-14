from django.contrib import auth 
from django.contrib.auth.decorators import user_passes_test
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
# from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import TemplateView
from django.utils.decorators import method_decorator

from app_website.func_module.processor import Processor 
from app_website.models import Info
      
# Create your views here.
class IndexView(TemplateView):
    template_name = "front_page/index.html"

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        curr_user = self.request.user
        Processor().append_user_info(context, curr_user)
        return context

class RegisterView(TemplateView):
    template_name = "front_page/register.html"

    # @csrf_exempt
    def dispatch(self, *args, **kwargs):
        return super(RegisterView, self).dispatch(*args, **kwargs)

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            infos = Info.objects.filter(user=request.user)
            if infos.count() > 0:
                curr_info = infos[0]
                if curr_info.veri_state == '0':
                    return HttpResponseRedirect("/veri-await/")
                elif curr_info.veri_state == '2':
                    return HttpResponseRedirect("/veri-fail/")
                else:
                    return HttpResponseRedirect("/index/")
            else:                
                return HttpResponseRedirect("/complete-info/")
        else:
            return super(RegisterView, self).get(request, *args, **kwargs)            

    def post(self, request, *args, **kwargs):
        post_data = request.POST
        if "password1" in post_data:
            form = UserCreationForm(post_data)
            if form.is_valid():
                new_user = form.save()
                username = post_data['username']
                password = post_data['password1']
                user = authenticate(username=username, password=password)
                if user is not None:
                    login(request, user)
                    return HttpResponseRedirect("/user-info/")
            else:
                return HttpResponse("Error") #########
        else:
            data_array = post_data["array_str"].split('|')
            response_str = ""
            if data_array[0] == "0":
                response_str = "false"
                if not User.objects.filter(username=data_array[1]).exists():
                    response_str = "true"
            else:
                response_str = "true"
                if not User.objects.filter(username=data_array[1]).exists():
                    response_str = "false"
            return HttpResponse("%s" % response_str)
         
class LoginView(TemplateView):
    template_name = "front_page/login.html"

    def get_context_data(self, **kwargs):
        context = super(LoginView, self).get_context_data(**kwargs)
        if "alias" in self.request.GET:
            username = self.request.GET["alias"]
            errno = self.request.GET["errno"]
            context.update(username = username)
            context.update(errno = errno)
        return context

    # @csrf_exempt
    def dispatch(self, *args, **kwargs):
        return super(LoginView, self).dispatch(*args, **kwargs)

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            infos = Info.objects.filter(user=request.user)
            if infos.count() > 0:
                curr_info = infos[0]
                if curr_info.veri_state == '0':
                    return HttpResponseRedirect("/veri-await/")
                elif curr_info.veri_state == '2':
                    return HttpResponseRedirect("/veri-fail/")
                else:
                    return HttpResponseRedirect("/index/")
            else:                
                return HttpResponseRedirect("/complete-info/")
        else:
            return super(LoginView, self).get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        post_data = request.POST
        username = post_data['username']
        password = post_data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            infos = Info.objects.filter(user=user)
            if infos.count() > 0:
                curr_info = infos[0]
                if curr_info.veri_state == '0':
                    return HttpResponseRedirect("/veri-await/")
                elif curr_info.veri_state == '2':
                    return HttpResponseRedirect("/veri-fail/")
                else:
                    return HttpResponseRedirect("/index/")
            else:                
                return HttpResponseRedirect("/complete-info/")
        else:
            return HttpResponseRedirect("/login?alias=" + username + "&errno=11")
 
class LogoutView(TemplateView):

    @method_decorator(user_passes_test(Processor().user_login_check, login_url='/login/'))
    def dispatch(self, *args, **kwargs):
        auth.logout(self.request)
        return super(LogoutView, self).dispatch(*args, **kwargs)

    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect("/login/")

class CompleteInfoView(TemplateView):
    template_name = "front_page/complete_info.html"

    def get_context_data(self, **kwargs):
        context = super(CompleteInfoView, self).get_context_data(**kwargs)
        curr_user = self.request.user
        Processor().append_user_info(context, curr_user)
        return context

    # @csrf_exempt
    @method_decorator(user_passes_test(Processor().user_login_check, login_url='/login/'))
    def dispatch(self, *args, **kwargs):
        return super(CompleteInfoView, self).dispatch(*args, **kwargs)

    def get(self, request, *args, **kwargs):
        infos = Info.objects.filter(user=request.user)
        if infos.count() > 0:
            curr_info = infos[0]
            if curr_info.veri_state == '0':
                return HttpResponseRedirect("/veri-await/")
            elif curr_info.veri_state == '2':
                return HttpResponseRedirect("/veri-fail/")
            else:
                return HttpResponseRedirect("/index/")
        else:
            return super(CompleteInfoView, self).get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        post_data = request.POST
        real_name = post_data['real-name']
        company_name = post_data['company-name']
        phone_number = post_data['phone-number']
        info = Info(user=request.user, real_name=real_name, company_name=company_name, phone_number=phone_number)
        info.save()
        return HttpResponseRedirect("/veri-await/")

class VeriAwaitView(TemplateView):
    template_name = "front_page/veri_await.html"

    def get_context_data(self, **kwargs):
        context = super(VeriAwaitView, self).get_context_data(**kwargs)
        curr_user = self.request.user
        Processor().append_user_info(context, curr_user)
        return context

    @method_decorator(user_passes_test(Processor().user_login_check, login_url='/login/'))
    def dispatch(self, *args, **kwargs):
        return super(VeriAwaitView, self).dispatch(*args, **kwargs)

    def get(self, request, *args, **kwargs):
        infos = Info.objects.filter(user=request.user)
        if infos.count() > 0:
            curr_info = infos[0]
            if curr_info.veri_state == '0':
                return super(VeriAwaitView, self).get(request, *args, **kwargs)
            elif curr_info.veri_state == '2':
                return HttpResponseRedirect("/veri-fail/")
            else:
                return HttpResponseRedirect("/index/")
        else:                
            return HttpResponseRedirect("/complete-info/")

class VeriFailView(TemplateView):
    template_name = "front_page/veri_fail.html"

    def get_context_data(self, **kwargs):
        context = super(VeriFailView, self).get_context_data(**kwargs)
        curr_user = self.request.user
        Processor().append_user_info(context, curr_user)
        return context

    # @csrf_exempt
    @method_decorator(user_passes_test(Processor().user_login_check, login_url='/login/'))
    def dispatch(self, *args, **kwargs):
        return super(VeriFailView, self).dispatch(*args, **kwargs)

    def get(self, request, *args, **kwargs):
        infos = Info.objects.filter(user=request.user)
        if infos.count() > 0:
            curr_info = infos[0]
            if curr_info.veri_state == '0':
                return HttpResponseRedirect("/veri-await/")
            elif curr_info.veri_state == '2':
                return super(VeriFailView, self).get(request, *args, **kwargs)
            else:
                return HttpResponseRedirect("/index/")
        else:                
            return HttpResponseRedirect("/complete-info/")

    def post(self, request, *args, **kwargs):
        infos = Info.objects.filter(user=request.user)

        post_data = request.POST
        real_name = post_data['real-name']
        company_name = post_data['company-name']
        phone_number = post_data['phone-number']
        infos.update(real_name=real_name, company_name=company_name, phone_number=phone_number, veri_state="0", invalid_desc="")
        return HttpResponseRedirect("/veri-await/")

class FaqView(TemplateView):
    template_name = "front_page/faq.html"

    def get_context_data(self, **kwargs):
        context = super(FaqView, self).get_context_data(**kwargs)
        curr_user = self.request.user
        Processor().append_user_info(context, curr_user)
        return context

class ContactUsView(TemplateView):
    template_name = "front_page/contact_us.html"

    def get_context_data(self, **kwargs):
        context = super(ContactUsView, self).get_context_data(**kwargs)
        curr_user = self.request.user
        Processor().append_user_info(context, curr_user)
        return context

class UserInfoView(TemplateView):
    template_name = "front_page/user_info.html"

    def get_context_data(self, **kwargs):
        context = super(UserInfoView, self).get_context_data(**kwargs)
        curr_user = self.request.user
        Processor().append_user_info(context, curr_user)
        return context

    @method_decorator(user_passes_test(Processor().user_login_check, login_url='/login/'))
    def dispatch(self, *args, **kwargs):
        return super(UserInfoView, self).dispatch(*args, **kwargs)

    def get(self, request, *args, **kwargs):
        infos = Info.objects.filter(user=request.user)
        if infos.count() > 0:
            curr_info = infos[0]
            if curr_info.veri_state == '0':
                return HttpResponseRedirect("/veri-await/")
            elif curr_info.veri_state == '2':
                return HttpResponseRedirect("/veri-fail/")
            else:
                return super(UserInfoView, self).get(request, *args, **kwargs) 
        else:                
            return HttpResponseRedirect("/complete-info/")

class DeliInstaView(TemplateView):
    template_name = "front_page/deli_insta/intro.html"

    def get_context_data(self, **kwargs):
        context = super(DeliInstaView, self).get_context_data(**kwargs)
        curr_user = self.request.user
        Processor().append_user_info(context, curr_user)
        return context

class RepairsView(TemplateView):
    template_name = "front_page/repairs/intro.html"

    def get_context_data(self, **kwargs):
        context = super(RepairsView, self).get_context_data(**kwargs)
        curr_user = self.request.user
        Processor().append_user_info(context, curr_user)
        return context

class CheckoutDIView(TemplateView):
    template_name = "front_page/deli_insta/checkout.html"

    def get_context_data(self, **kwargs):
        context = super(CheckoutDIView, self).get_context_data(**kwargs)
        curr_user = self.request.user
        Processor().append_user_info(context, curr_user)
        return context

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            infos = Info.objects.filter(user=request.user)
            if infos.count() > 0:
                curr_info = infos[0]
                if curr_info.veri_state == '0':
                    return HttpResponseRedirect("/veri-await/")
                elif curr_info.veri_state == '2':
                    return HttpResponseRedirect("/veri-fail/")
                else:
                    return super(CheckoutDIView, self).get(request, *args, **kwargs) 
            else:                
                return HttpResponseRedirect("/complete-info/")
        else:
            return HttpResponseRedirect("/login/")

class CheckoutRepairsView(TemplateView):
    template_name = "front_page/repairs/checkout.html"

    def get_context_data(self, **kwargs):
        context = super(CheckoutRepairsView, self).get_context_data(**kwargs)
        curr_user = self.request.user
        Processor().append_user_info(context, curr_user)
        return context

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            infos = Info.objects.filter(user=request.user)
            if infos.count() > 0:
                curr_info = infos[0]
                if curr_info.veri_state == '0':
                    return HttpResponseRedirect("/veri-await/")
                elif curr_info.veri_state == '2':
                    return HttpResponseRedirect("/veri-fail/")
                else:
                    return super(CheckoutRepairsView, self).get(request, *args, **kwargs) 
            else:                
                return HttpResponseRedirect("/complete-info/")
        else:
            return HttpResponseRedirect("/login/")

class OrdersView(TemplateView):
    template_name = "front_page/orders.html"

    def get_context_data(self, **kwargs):
        context = super(OrdersView, self).get_context_data(**kwargs)
        curr_user = self.request.user
        Processor().append_user_info(context, curr_user)
        return context

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            infos = Info.objects.filter(user=request.user)
            if infos.count() > 0:
                curr_info = infos[0]
                if curr_info.veri_state == '0':
                    return HttpResponseRedirect("/veri-await/")
                elif curr_info.veri_state == '2':
                    return HttpResponseRedirect("/veri-fail/")
                else:
                    return super(OrdersView, self).get(request, *args, **kwargs) 
            else:                
                return HttpResponseRedirect("/complete-info/")
        else:
            return HttpResponseRedirect("/login/")

### View Manage --Start ###
class ManageView(TemplateView):
    template_name = "manage_page/indexmanage.html"

class ManageLoginView(TemplateView):
    template_name = "manage_page/login.html"

class UserManageView(TemplateView):
    template_name = "manage_page/usermanage.html"

class UserInfoTab(TemplateView):
    template_name = "manage_page/tab_user_info.html"

    def get_context_data(self, **kwargs):
        context = super(UserInfoTab, self).get_context_data(**kwargs)
        page_num = int(kwargs['page'])
        count_per_page = int(kwargs['count'])
        Processor().append_pagination_stuff(context, page_num, count_per_page, Info, "id")
        return context
### View Manage --End ###

### Post --Start ###
class NewOrderReq(TemplateView):

    # @csrf_exempt
    def dispatch(self, *args, **kwargs):
        return super(NewOrderReq, self).dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        ret = Processor().handle_new_order_req(request)
        return HttpResponse(ret)
### Post --End ###
