# Generated by Django 4.0.4 on 2022-05-12 22:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('airbnb_app', '0011_alter_booking_options_alter_city_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Highlights',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('highlght', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'verbose_name_plural': 'Highlights',
            },
        ),
        migrations.RemoveField(
            model_name='property',
            name='highlights',
        ),
        migrations.AddField(
            model_name='property',
            name='highlights',
            field=models.ManyToManyField(to='airbnb_app.highlights'),
        ),
    ]