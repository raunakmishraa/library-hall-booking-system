"use client";

import { useState, useRef } from "react";
import { BookingFormData } from "@/types/booking";

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    email: "",
    bookingDate: "",
    startTime: "",
    endTime: "",
    purpose: "",
    studentIdCard: null,
  });

  const [fileName, setFileName] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image file (JPEG, PNG, or WebP)");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }

      setFormData((prev) => ({ ...prev, studentIdCard: file }));
      setFileName(file.name);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, studentIdCard: null }));
    setFileName("");
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For now, just log the data and show success
    console.log("Booking submitted:", formData);
    setSubmitStatus("success");
    setIsSubmitting(false);

    // Reset form after success
    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        bookingDate: "",
        startTime: "",
        endTime: "",
        purpose: "",
        studentIdCard: null,
      });
      removeFile();
      setSubmitStatus("idle");
    }, 3000);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#1a1a1b] rounded-3xl border border-[#2a2a2b] overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-[#48D0FF]/10 to-[#26A8C8]/10 border-b border-[#2a2a2b] px-6 sm:px-8 py-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#F2F3F4]">
              Book the Library Hall
            </h2>
            <p className="mt-1 text-sm text-[#F2F3F4]/60">
              Fill in the details below to submit your booking request
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-[#F2F3F4] mb-2"
              >
                Full Name <span className="text-[#CF1020]">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-[#1e1e1f] border border-[#3a3a3b] rounded-xl text-[#F2F3F4] placeholder-[#F2F3F4]/40 focus:outline-none focus:border-[#48D0FF] focus:ring-2 focus:ring-[#48D0FF]/20 transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#F2F3F4] mb-2"
              >
                Email Address <span className="text-[#CF1020]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 bg-[#1e1e1f] border border-[#3a3a3b] rounded-xl text-[#F2F3F4] placeholder-[#F2F3F4]/40 focus:outline-none focus:border-[#48D0FF] focus:ring-2 focus:ring-[#48D0FF]/20 transition-all duration-200"
              />
            </div>

            {/* Booking Date */}
            <div>
              <label
                htmlFor="bookingDate"
                className="block text-sm font-semibold text-[#F2F3F4] mb-2"
              >
                Booking Date <span className="text-[#CF1020]">*</span>
              </label>
              <input
                type="date"
                id="bookingDate"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleInputChange}
                required
                min={getTodayDate()}
                className="w-full px-4 py-3 bg-[#1e1e1f] border border-[#3a3a3b] rounded-xl text-[#F2F3F4] focus:outline-none focus:border-[#48D0FF] focus:ring-2 focus:ring-[#48D0FF]/20 transition-all duration-200 [color-scheme:dark]"
              />
            </div>

            {/* Time Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startTime"
                  className="block text-sm font-semibold text-[#F2F3F4] mb-2"
                >
                  Start Time <span className="text-[#CF1020]">*</span>
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-[#1e1e1f] border border-[#3a3a3b] rounded-xl text-[#F2F3F4] focus:outline-none focus:border-[#48D0FF] focus:ring-2 focus:ring-[#48D0FF]/20 transition-all duration-200 [color-scheme:dark]"
                />
              </div>
              <div>
                <label
                  htmlFor="endTime"
                  className="block text-sm font-semibold text-[#F2F3F4] mb-2"
                >
                  End Time <span className="text-[#CF1020]">*</span>
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-[#1e1e1f] border border-[#3a3a3b] rounded-xl text-[#F2F3F4] focus:outline-none focus:border-[#48D0FF] focus:ring-2 focus:ring-[#48D0FF]/20 transition-all duration-200 [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label
                htmlFor="purpose"
                className="block text-sm font-semibold text-[#F2F3F4] mb-2"
              >
                Purpose of Booking <span className="text-[#CF1020]">*</span>
              </label>
              <textarea
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Describe the event or purpose for booking the hall..."
                className="w-full px-4 py-3 bg-[#1e1e1f] border border-[#3a3a3b] rounded-xl text-[#F2F3F4] placeholder-[#F2F3F4]/40 focus:outline-none focus:border-[#48D0FF] focus:ring-2 focus:ring-[#48D0FF]/20 transition-all duration-200 resize-none"
              />
            </div>

            {/* Student ID Card Upload */}
            <div>
              <label className="block text-sm font-semibold text-[#F2F3F4] mb-2">
                Student ID Card (Photo) <span className="text-[#CF1020]">*</span>
              </label>
              <div
                className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
                  fileName
                    ? "border-[#32CD32] bg-[#32CD32]/5"
                    : "border-[#3a3a3b] hover:border-[#48D0FF] hover:bg-[#48D0FF]/5"
                }`}
              >
                {!fileName ? (
                  <label className="flex flex-col items-center justify-center py-8 px-4 cursor-pointer">
                    <svg
                      className="w-12 h-12 text-[#48D0FF] mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-[#F2F3F4]">
                      Click to upload your Student ID
                    </span>
                    <span className="text-xs text-[#F2F3F4]/50 mt-1">
                      JPEG, PNG or WebP (max. 5MB)
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleFileChange}
                      className="hidden"
                      required={!formData.studentIdCard}
                    />
                  </label>
                ) : (
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      {previewUrl && (
                        <img
                          src={previewUrl}
                          alt="ID Preview"
                          className="w-20 h-20 object-cover rounded-lg border border-[#3a3a3b]"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-[#32CD32] flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-sm font-medium text-[#F2F3F4] truncate">
                            {fileName}
                          </span>
                        </div>
                        <p className="text-xs text-[#F2F3F4]/50 mt-1">
                          File uploaded successfully
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-2 text-[#CF1020] hover:bg-[#CF1020]/10 rounded-lg transition-colors"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "success"}
                className={`w-full py-4 px-6 rounded-xl font-bold text-base transition-all duration-300 ${
                  submitStatus === "success"
                    ? "bg-[#32CD32] text-white cursor-default"
                    : isSubmitting
                    ? "bg-[#48D0FF]/50 text-[#121213] cursor-wait"
                    : "bg-gradient-to-r from-[#48D0FF] to-[#26A8C8] text-[#121213] hover:shadow-lg hover:shadow-[#48D0FF]/30 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {submitStatus === "success" ? (
                  <span className="flex items-center justify-center gap-2">
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Booking Request Submitted!
                  </span>
                ) : isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Submit Booking Request"
                )}
              </button>
            </div>

            {/* Info Note */}
            <div className="flex items-start gap-3 p-4 bg-[#E7AF36]/10 border border-[#E7AF36]/30 rounded-xl">
              <svg
                className="w-5 h-5 text-[#E7AF36] flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-[#E7AF36]">
                  Important Notice
                </p>
                <p className="text-xs text-[#F2F3F4]/60 mt-1">
                  Your booking request will be reviewed by the admin. You will
                  receive an email confirmation once approved.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

