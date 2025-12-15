from django.urls import path
from . import views
from django.contrib import admin

urlpatterns = [
    path('', views.index, name='index'),
    path('bookings', views.booking_calendar_view, name='booking_calendar_view'),
    path('bookings/api/<int:booking_id>/', views.booking_detail_json, name='booking_detail_json'),
    path('bookings/update-status/<int:booking_id>/', views.update_booking_status, name='update_booking_status'),
]