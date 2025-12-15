export interface BookingFormData {
  fullName: string;
  email: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  purpose: string;
  studentIdCard: File | null;
}

export interface BookingEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  organizer: string;
  status: "approved" | "pending" | "rejected";
}

export type TabType = "booking" | "calendar";

