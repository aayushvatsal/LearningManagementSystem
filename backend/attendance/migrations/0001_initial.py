# Generated by Django 5.1 on 2024-09-24 10:47

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('instructorcalendar', '0006_delete_attendance'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('PRESENT', 'Present'), ('ABSENT', 'Absent')], max_length=10)),
                ('date', models.DateField(default=django.utils.timezone.now)),
                ('class_schedule', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='instructorcalendar.classschedule')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('student', 'class_schedule', 'date')},
            },
        ),
    ]