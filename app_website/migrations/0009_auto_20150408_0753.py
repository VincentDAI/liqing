# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_website', '0008_auto_20150408_0749'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='price',
            field=models.CharField(default=b'0', max_length=10),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='order',
            name='score',
            field=models.CharField(default=b'0', max_length=10),
            preserve_default=True,
        ),
    ]
