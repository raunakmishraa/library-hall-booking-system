"use client";

import { useState, useMemo } from "react";
import { BookingEvent } from "@/types/booking";

// Dummy booking data
const DUMMY_BOOKINGS: BookingEvent[] = [
  {
    id: "1",
    title: "Tech Talk: AI in Education",
    date: "2025-12-18",
    startTime: "10:00",
    endTime: "12:00",
    organizer: "Computer Science Club",
    status: "approved",
  },
  {
    id: "2",
    title: "Literary Workshop",
    date: "2025-12-20",
    startTime: "14:00",
    endTime: "16:00",
    organizer: "English Department",
    status: "approved",
  },
  {
    id: "3",
    title: "Robotics Exhibition",
    date: "2025-12-22",
    startTime: "09:00",
    endTime: "17:00",
    organizer: "Robotics Club",
    status: "approved",
  },
  {
    id: "4",
    title: "Career Fair 2025",
    date: "2025-12-25",
    startTime: "10:00",
    endTime: "15:00",
    organizer: "Placement Cell",
    status: "pending",
  },
  {
    id: "5",
    title: "Music Concert",
    date: "2025-12-28",
    startTime: "18:00",
    endTime: "21:00",
    organizer: "Music Society",
    status: "approved",
  },
  {
    id: "6",
    title: "Hackathon Kickoff",
    date: "2025-12-30",
    startTime: "09:00",
    endTime: "11:00",
    organizer: "LOCUS Team",
    status: "approved",
  },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const days: (number | null)[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  }, [currentMonth, currentYear]);

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatDateString = (day: number) => {
    const month = String(currentMonth + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    return `${currentYear}-${month}-${dayStr}`;
  };

  const getBookingsForDate = (day: number) => {
    const dateString = formatDateString(day);
    return DUMMY_BOOKINGS.filter((booking) => booking.date === dateString);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const selectedDateBookings = useMemo(() => {
    if (!selectedDate) return [];
    return DUMMY_BOOKINGS.filter((booking) => booking.date === selectedDate);
  }, [selectedDate]);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const getStatusColor = (status: BookingEvent["status"]) => {
    switch (status) {
      case "approved":
        return "bg-[#32CD32]/20 text-[#32CD32] border-[#32CD32]/30";
      case "pending":
        return "bg-[#E7AF36]/20 text-[#E7AF36] border-[#E7AF36]/30";
      case "rejected":
        return "bg-[#CF1020]/20 text-[#CF1020] border-[#CF1020]/30";
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-[#1a1a1b] rounded-3xl border border-[#2a2a2b] overflow-hidden">
            {/* Calendar Header */}
            <div className="bg-gradient-to-r from-[#48D0FF]/10 to-[#26A8C8]/10 border-b border-[#2a2a2b] px-4 sm:px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigateMonth("prev")}
                  className="p-2 text-[#F2F3F4]/60 hover:text-[#48D0FF] hover:bg-[#2a2a2b] rounded-xl transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#F2F3F4]">
                  {MONTHS[currentMonth]} {currentYear}
                </h2>
                <button
                  onClick={() => navigateMonth("next")}
                  className="p-2 text-[#F2F3F4]/60 hover:text-[#48D0FF] hover:bg-[#2a2a2b] rounded-xl transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 border-b border-[#2a2a2b]">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="py-3 text-center text-xs sm:text-sm font-semibold text-[#F2F3F4]/60"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 p-2 sm:p-4 gap-1 sm:gap-2">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                const dateString = formatDateString(day);
                const bookings = getBookingsForDate(day);
                const hasBookings = bookings.length > 0;
                const isSelected = selectedDate === dateString;
                const isTodayDate = isToday(day);

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateString)}
                    className={`
                      aspect-square p-1 sm:p-2 rounded-xl transition-all duration-200 relative flex flex-col items-center justify-start
                      ${
                        isSelected
                          ? "bg-[#48D0FF] text-[#121213]"
                          : isTodayDate
                          ? "bg-[#48D0FF]/20 text-[#48D0FF]"
                          : "hover:bg-[#2a2a2b] text-[#F2F3F4]"
                      }
                    `}
                  >
                    <span
                      className={`text-sm sm:text-base font-semibold ${
                        isSelected ? "text-[#121213]" : ""
                      }`}
                    >
                      {day}
                    </span>
                    {hasBookings && (
                      <div className="flex gap-0.5 mt-1">
                        {bookings.slice(0, 3).map((booking, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSelected
                                ? "bg-[#121213]"
                                : booking.status === "approved"
                                ? "bg-[#32CD32]"
                                : "bg-[#E7AF36]"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="px-4 sm:px-6 py-4 border-t border-[#2a2a2b]">
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#32CD32]" />
                  <span className="text-[#F2F3F4]/60">Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E7AF36]" />
                  <span className="text-[#F2F3F4]/60">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#48D0FF]" />
                  <span className="text-[#F2F3F4]/60">Today</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Date Events */}
          <div className="bg-[#1a1a1b] rounded-3xl border border-[#2a2a2b] overflow-hidden h-fit">
            <div className="bg-gradient-to-r from-[#48D0FF]/10 to-[#26A8C8]/10 border-b border-[#2a2a2b] px-6 py-4">
              <h3 className="text-lg font-extrabold text-[#F2F3F4]">
                {selectedDate
                  ? new Date(selectedDate + "T00:00:00").toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "Select a Date"}
              </h3>
            </div>

            <div className="p-4 sm:p-6">
              {!selectedDate ? (
                <div className="text-center py-8">
                  <svg
                    className="w-12 h-12 mx-auto text-[#F2F3F4]/20 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm text-[#F2F3F4]/50">
                    Click on a date to view events
                  </p>
                </div>
              ) : selectedDateBookings.length === 0 ? (
                <div className="text-center py-8">
                  <svg
                    className="w-12 h-12 mx-auto text-[#F2F3F4]/20 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-[#F2F3F4]/50">
                    No bookings on this date
                  </p>
                  <p className="text-xs text-[#48D0FF] mt-2">
                    Hall is available!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDateBookings.map((booking, index) => (
                    <div
                      key={booking.id}
                      className="p-4 bg-[#1e1e1f] rounded-xl border border-[#3a3a3b] animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-bold text-[#F2F3F4] text-sm sm:text-base">
                          {booking.title}
                        </h4>
                        <span
                          className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <div className="space-y-1.5 text-xs sm:text-sm text-[#F2F3F4]/60">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>
                            {formatTime(booking.startTime)} -{" "}
                            {formatTime(booking.endTime)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <span>{booking.organizer}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Events List */}
        <div className="mt-6 bg-[#1a1a1b] rounded-3xl border border-[#2a2a2b] overflow-hidden">
          <div className="bg-gradient-to-r from-[#48D0FF]/10 to-[#26A8C8]/10 border-b border-[#2a2a2b] px-6 py-4">
            <h3 className="text-lg font-extrabold text-[#F2F3F4]">
              Upcoming Bookings
            </h3>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DUMMY_BOOKINGS.filter((b) => b.status === "approved")
                .sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                )
                .map((booking, index) => (
                  <div
                    key={booking.id}
                    className="group p-4 bg-[#1e1e1f] rounded-xl border border-[#3a3a3b] hover:border-[#48D0FF]/50 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#48D0FF]/20 to-[#26A8C8]/20 flex items-center justify-center group-hover:from-[#48D0FF]/30 group-hover:to-[#26A8C8]/30 transition-all duration-300">
                        <span className="text-lg font-extrabold text-[#48D0FF]">
                          {new Date(booking.date + "T00:00:00").getDate()}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-[#F2F3F4]/50">
                          {new Date(booking.date + "T00:00:00").toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              weekday: "short",
                            }
                          )}
                        </p>
                        <p className="text-sm font-semibold text-[#48D0FF]">
                          {formatTime(booking.startTime)}
                        </p>
                      </div>
                    </div>
                    <h4 className="font-bold text-[#F2F3F4] mb-1 line-clamp-1">
                      {booking.title}
                    </h4>
                    <p className="text-xs text-[#F2F3F4]/50">
                      by {booking.organizer}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

