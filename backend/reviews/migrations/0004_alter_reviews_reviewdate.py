# Generated by Django 5.0.4 on 2024-05-10 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0003_reviews_reviewauthor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviews',
            name='ReviewDate',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]