# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_website', '0005_info_invalid_desc'),
    ]

    operations = [
        migrations.AlterField(
            model_name='info',
            name='company_name',
            field=models.CharField(max_length=30),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='info',
            name='invalid_desc',
            field=models.CharField(default=b'', max_length=60),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='info',
            name='real_name',
            field=models.CharField(max_length=10),
            preserve_default=True,
        ),
    ]
