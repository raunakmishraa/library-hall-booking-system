from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        'event_name', 
        'organization_name',
        'date', 
        'start_time', 
        'status', 
        'booker_name', 
        'email',
        'phone_number',
    )
    
    list_filter = (
        'status', 
        'date',
    )
    
    search_fields = (
        'event_name', 
        'booker_name',
        'organization_name',
        'email',
        'phone_number',
        'event_description'
    )
    
    fieldsets = (
        ('Event Details', {
            'fields': ('event_name', 'event_description', 'status')
        }),
        ('Schedule', {
            'fields': ('date', 'start_time', 'end_time')
        }),
        ('Contact Information', {
            'fields': ('booker_name', 'roll_number' , 'organization_name', 'email', 'phone_number', 'request_letter')
        }),
    )

    date_hierarchy = 'date'

