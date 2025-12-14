from django.contrib import admin
from .models import Booking
from rangefilter.filters import DateRangeFilter

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        'event_name', 
        'date', 
        'start_time', 
        'status', 
        'booker_name', 
        'contact_info'
    )
    
    list_filter = (
        'status', 
        ('date', DateRangeFilter),
    )
    
    search_fields = (
        'event_name', 
        'booker_name', 
        'contact_info', 
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
            'fields': ('booker_name', 'contact_info')
        }),
    )

    date_hierarchy = 'date'
