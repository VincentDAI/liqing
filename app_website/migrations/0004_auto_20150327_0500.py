# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_website', '0003_auto_20150327_0209'),
    ]

    operations = [
        migrations.AddField(
            model_name='info',
            name='veri_state',
            field=models.CharField(default=b'0', max_length=1),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='info',
            name='company_name',
            field=models.CharField(max_length=60),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='info',
            name='phone_number',
            field=models.CharField(max_length=20),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='info',
            name='real_name',
            field=models.CharField(max_length=20),
            preserve_default=True,
        ),
    ]
