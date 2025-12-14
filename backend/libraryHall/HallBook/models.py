from django.db import models
from django.contrib.auth.models import User
import datetime

class Booking(models.Model):
    booker_name = models.CharField(max_length=150)
    contact_info = models.CharField(max_length=100, help_text="Email or Phone Number for contact")
    
    hall = 'library_hall'

    # Booking details
    event_name = models.CharField(max_length=200)
    event_description = models.TextField(blank=True, null=True)

    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    STATUS_CHOICES = [
        ('PENDING', 'Pending Approval'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
        ('CANCELLED', 'Cancelled'),
    ]
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='PENDING',
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['date', 'start_time']
        unique_together = ('date', 'start_time', 'end_time')

    def __str__(self):
        return f"{self.event_name} by {self.booker_name} - {self.hall}"

    def is_past_due(self):
        return self.date < datetime.date.today()
    is_past_due.boolean = True # Makes this display nicely in the Django Admin
