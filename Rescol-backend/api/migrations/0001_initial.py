# Generated by Django 4.1.11 on 2025-03-19 21:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='comunas',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='usuarios',
            fields=[
                ('id', models.CharField(max_length=40, primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=40, unique=True)),
                ('password', models.CharField(max_length=100)),
                ('nombre', models.CharField(max_length=40)),
                ('apellido', models.CharField(max_length=40)),
                ('correo', models.CharField(max_length=40)),
                ('admin', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='redesViales',
            fields=[
                ('id', models.CharField(max_length=40, primary_key=True, serialize=False, unique=True)),
                ('colaborativo', models.BooleanField()),
                ('nombre', models.CharField(max_length=100, unique=True)),
                ('comunas', models.ManyToManyField(to='api.comunas')),
            ],
        ),
        migrations.CreateModel(
            name='modelos',
            fields=[
                ('id', models.CharField(max_length=40, primary_key=True, serialize=False, unique=True)),
                ('nombre', models.CharField(max_length=40)),
                ('residuos', models.DecimalField(decimal_places=2, max_digits=5)),
                ('costo', models.IntegerField()),
                ('capacidad', models.IntegerField()),
                ('jornada', models.IntegerField()),
                ('frecuencia', models.IntegerField()),
                ('fecha', models.CharField(max_length=8)),
                ('hora', models.CharField(max_length=8)),
                ('red', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.redesviales')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.usuarios')),
            ],
        ),
    ]
