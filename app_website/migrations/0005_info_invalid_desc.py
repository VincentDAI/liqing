# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app_website', '0004_auto_20150327_0500'),
    ]

    operations = [
        migrations.AddField(
            model_name='info',
            name='invalid_desc',
            field=models.CharField(default=b'', max_length=200),
            preserve_default=True,
        ),
    ]
