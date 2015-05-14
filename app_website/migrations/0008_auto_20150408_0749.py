# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('app_website', '0007_auto_20150408_0702'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='user',
            field=models.ForeignKey(related_name='user_client', to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
    ]
