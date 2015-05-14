from django.conf import settings
from django.db import models

from django.contrib.auth.models import User

class Info(models.Model):
    user = models.ForeignKey(User, related_name='user_info')
    real_name = models.CharField(max_length=10)
    company_name = models.CharField(max_length=30)
    phone_number = models.CharField(max_length=20)
    veri_state = models.CharField(max_length=1, default='0')
    invalid_desc = models.CharField(max_length=60, default='')

class Client(models.Model):
    name = models.CharField(max_length=10)
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=60)
    user = models.ForeignKey(User, related_name='user_client', null=True)

class Order(models.Model):
    type = models.CharField(max_length=1, default='0')
    price = models.CharField(max_length=10, default='0')
    status = models.CharField(max_length=1, default='0')
    score = models.CharField(max_length=10, default='0')
    user = models.ForeignKey(User, related_name='user_order') 
    client = models.ForeignKey(Client, related_name='client_order')   

class Goods(models.Model):
    name = models.CharField(max_length=10)
    desc = models.CharField(max_length=60)

class Order_Goods(models.Model):
    order = models.ForeignKey(Order)
    goods = models.ForeignKey(Goods)
    quantity = models.CharField(max_length=8)

class Repairs(models.Model):
    name = models.CharField(max_length=10)
    reason = models.CharField(max_length=60)

class Order_Repairs(models.Model):
    order = models.ForeignKey(Order)
    repairs = models.ForeignKey(Repairs)
    quantity = models.CharField(max_length=8)
