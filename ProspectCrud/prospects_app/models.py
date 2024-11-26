from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Lead(models.Model):
    name = models.CharField(max_length=255)  # Name of the lead
    email = models.EmailField()  # Email of the lead
    phone = models.CharField(max_length=15)  # Phone number of the lead
    whatsapp = models.CharField(max_length=15, blank=True, null=True)  # WhatsApp number
    facebook = models.CharField(max_length=255, blank=True, null=True)  

    def __str__(self):
        return self.name
