# Generated by Django 4.1.4 on 2022-12-14 17:07

import base.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_alter_imageresize_thumbnail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imageresize',
            name='thumbnail',
            field=models.ImageField(upload_to=base.models.photo_path),
        ),
    ]
