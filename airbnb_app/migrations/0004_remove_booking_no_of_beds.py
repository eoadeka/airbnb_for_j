# Generated by Django 4.0.4 on 2022-06-15 14:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('airbnb_app', '0003_alter_booking_no_of_beds_alter_booking_no_of_guests'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='no_of_beds',
        ),
    ]