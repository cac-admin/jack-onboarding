# Generated by Django 5.0.4 on 2024-05-08 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0002_courses_courseprof'),
    ]

    operations = [
        migrations.AddField(
            model_name='courses',
            name='CourseDesc',
            field=models.CharField(default='default description', max_length=500),
            preserve_default=False,
        ),
    ]
