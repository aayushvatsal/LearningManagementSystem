# Generated by Django 5.1 on 2024-09-25 11:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0004_contenttype_remove_content_content_type_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='content',
            name='file',
        ),
        migrations.CreateModel(
            name='ContentFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='uploads/')),
                ('content', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='files', to='library.content')),
                ('file_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='library.contenttype')),
            ],
        ),
    ]
