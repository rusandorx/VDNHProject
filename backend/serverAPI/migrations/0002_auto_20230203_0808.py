# Generated by Django 3.1.4 on 2023-02-03 05:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('serverAPI', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='travelroute',
            name='way',
        ),
        migrations.AddField(
            model_name='travelroute',
            name='way',
            field=models.ManyToManyField(to='serverAPI.PointOfInterest'),
        ),
    ]
