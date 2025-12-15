from django.http import HttpResponse

# Create your views here.

def index(request):
    html_content = "<h1>Hello, Django!</h1><p>This is a direct HTML response.</p>"
    return HttpResponse(html_content)

import calendar
from django.shortcuts import render
from django.utils.safestring import mark_safe
import datetime
from django.urls import reverse
from .models import Booking
from django.contrib.admin.views.decorators import staff_member_required
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_POST
import json
from django.contrib import messages

@staff_member_required
@require_POST
def update_booking_status(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id)
    
    try:
        data = json.loads(request.body)
        new_status = data.get('status')

        valid_statuses = [choice[0] for choice in Booking.STATUS_CHOICES]
        if new_status in valid_statuses:
            booking.status = new_status
            booking.save()
            return JsonResponse({'success': True, 'message': 'Status updated successfully', 'new_status': new_status})
        else:
            return JsonResponse({'success': False, 'message': 'Invalid status provided'}, status=400)
            
    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Invalid JSON data'}, status=400)
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=500)


@staff_member_required
def booking_detail_json(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id)
    
    edit_url = 'admin/HallBook/booking/1/change/'.replace('1', str(booking_id))

    data = {
        'id': booking.id,
        'eventName': booking.event_name,
        'organizationName': booking.organization_name or 'N/A',
        'bookerName': booking.booker_name,
        'email': booking.email,
        'phone': booking.phone_number or 'N/A',
        'date': str(booking.date),
        'startTime': str(booking.start_time),
        'endTime': str(booking.end_time),
        'status': booking.status,
        'description': booking.event_description,
        'editUrl': edit_url,
    }
    return JsonResponse(data)


@staff_member_required
def booking_calendar_view(request):
    today = datetime.date.today()
    year = int(request.GET.get('year', today.year))
    month = int(request.GET.get('month', today.month))
    day = int(request.GET.get('day', today.day))
    view_type = request.GET.get('view', 'month')

    try:
        prev_month = datetime.date(year, month, 1) - datetime.timedelta(days=1)
        next_month = datetime.date(year, month, 1) + datetime.timedelta(days=32)
    except OverflowError:
        prev_month = datetime.date(year, month, 1).replace(month=month-1 if month > 1 else 12, year=year if month > 1 else year-1)
        next_month = datetime.date(year, month, 1).replace(month=month+1 if month < 12 else 1, year=year if month < 12 else year+1)

    cal = calendar.HTMLCalendar(calendar.MONDAY)
    bookings = Booking.objects.filter(date__year=year, date__month=month)
    bookings_dict = {}
    for booking in bookings:
        d_day = booking.date.day
        if d_day not in bookings_dict:
            bookings_dict[d_day] = []
        bookings_dict[d_day].append(booking)

    def style_day(day_num, weekday):
        if day_num == 0:
            return '<td class="day is-empty">&nbsp;</td>'
        
        is_today = (
            day_num == today.day and 
            month == today.month and 
            year == today.year
        )

        cell_classes = "day"
        if is_today:
            cell_classes += " today-highlight"
        
        cell_html = f'<td class="{cell_classes}"><span class="day-number">{day_num}</span><div class="events">'
        if day_num in bookings_dict:
            for booking in bookings_dict[day_num]:
                status_class = f"status-{booking.status.lower()}"
                cell_html += f'<a href="#" onclick="openBookingModal(event, {booking.pk})" class="event-item {status_class}" data-booking-id="{booking.pk}">{booking.event_name}</a>'

        cell_html += '</div></td>'
        return cell_html

    cal.formatday = style_day
    calendar_html = cal.formatmonth(year, month)
    add_booking_url = '/admin/HallBook/booking/add/'

    context = {
        'calendar': mark_safe(calendar_html),
        'month_name': datetime.date(year, month, 1).strftime('%B %Y'),
        'prev_month_url': f"?year={prev_month.year}&month={prev_month.month}&view={view_type}",
        'next_month_url': f"?year={next_month.year}&month={next_month.month}&view={view_type}",
        'today_url': f"?year={today.year}&month={today.month}&view={view_type}",
        'month_view_url': f"?year={year}&month={month}&view=month",
        'week_view_url': f"?year={year}&month={month}&view=week",
        'day_view_url': f"?year={year}&month={month}&view=day",
        'add_booking_url': add_booking_url,
        'calendar': mark_safe(calendar_html),
    }
    return render(request, 'admin/booking_calendar.html', context)
