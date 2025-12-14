from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('bookings', views.booking_calendar_view, name='booking_calendar_view'),
]