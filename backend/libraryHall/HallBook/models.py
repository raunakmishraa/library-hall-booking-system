from django.db import models
import datetime

class Booking(models.Model):
    booker_name = models.CharField(max_length=150)
    roll_number = models.CharField(max_length=20,default='079bel070', help_text="College Roll Number")
    organization_name = models.CharField(
        max_length=150, 
        blank=True, 
        null=True, 
        help_text="Optional: Name of the club or organization"
    )

    email = models.EmailField(max_length=254, help_text="Required for communication")
    phone_number = models.CharField(
        max_length=20, 
        blank=True, 
        null=True, 
        help_text="Optional phone number"
    )

    request_letter = models.FileField(upload_to='request_letters/%Y/%m/', blank=True, null=True)
    
    hall = 'library_hall'

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
    is_past_due.boolean = True
