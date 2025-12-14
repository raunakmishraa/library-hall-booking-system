from django.http import HttpResponse

# Create your views here.

def index(request):
    html_content = "<h1>Hello, Django!</h1><p>This is a direct HTML response.</p>"
    return HttpResponse(html_content)
# bookings/views.py
import calendar
from django.shortcuts import render
from django.utils.safestring import mark_safe
import datetime
from django.urls import reverse
from .models import Booking

def booking_calendar_view(request):
    today = datetime.date.today()
    # Get current year and month from request parameters
    year = int(request.GET.get('year', today.year))
    month = int(request.GET.get('month', today.month))
    day = int(request.GET.get('day', today.day))
    view_type = request.GET.get('view', 'month') # Default to month view

    # Calculate previous/next month dates for navigation
    try:
        prev_month = datetime.date(year, month, 1) - datetime.timedelta(days=1)
        next_month = datetime.date(year, month, 1) + datetime.timedelta(days=32)
    except OverflowError:
        # Handle edge cases around year boundaries
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
        
        cell_html = f'<td class="day">{day_num}<div class="events">'
        if day_num in bookings_dict:
            for booking in bookings_dict[day_num]:
                cell_html += f'<div class="event-item">{booking.event_name}</div>'
        cell_html += '</div></td>'
        return cell_html

    cal.formatday = style_day
    calendar_html = cal.formatmonth(year, month)

    context = {
        'calendar': mark_safe(calendar_html),
        'month_name': datetime.date(year, month, 1).strftime('%B %Y'),
        'prev_month_url': f"?year={prev_month.year}&month={prev_month.month}&view={view_type}",
        'next_month_url': f"?year={next_month.year}&month={next_month.month}&view={view_type}",
        'today_url': f"?year={today.year}&month={today.month}&view={view_type}",
        # URLs for view type switching (simple reload for now, as we only have month view implemented)
        'month_view_url': f"?year={year}&month={month}&view=month",
        'week_view_url': f"?year={year}&month={month}&view=week", # These require further view implementation
        'day_view_url': f"?year={year}&month={month}&view=day",   # These require further view implementation
    }
    return render(request, 'admin/booking_calendar.html', context)
