# Generated by Django 5.0.3 on 2024-04-03 07:14

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Category",
            fields=[
                ("_id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=200, unique=True)),
                ("description", models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "_id",
                    models.AutoField(editable=False, primary_key=True, serialize=False),
                ),
                ("name", models.CharField(max_length=200, null=True)),
                ("image", models.ImageField(blank=True, null=True, upload_to="")),
                ("description", models.TextField(blank=True, null=True)),
                ("brand", models.CharField(blank=True, max_length=200, null=True)),
                (
                    "rating",
                    models.DecimalField(
                        blank=True, decimal_places=2, max_digits=3, null=True
                    ),
                ),
                ("numReviews", models.IntegerField(blank=True, default=0, null=True)),
                (
                    "price",
                    models.DecimalField(
                        blank=True, decimal_places=2, max_digits=9, null=True
                    ),
                ),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                (
                    "category",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to="api.category",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]