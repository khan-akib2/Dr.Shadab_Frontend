"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2, ShieldCheck, Heart, Sparkles } from "lucide-react";
import gsap from "gsap";
import confetti from "canvas-confetti";

function BookingContent() {
  const searchParams = useSearchParams();
  const formRef = useRef(null);

  // States
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    concern: "General Consultation",
    date: "",
    timeSlot: "10:00 AM - 12:00 PM",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Load parameter concern if preset (e.g. from service link)
  useEffect(() => {
    const concernParam = searchParams.get("concern");
    if (concernParam) {
      setFormData((prev) => ({ ...prev, concern: concernParam }));
    }
  }, [searchParams]);

  useEffect(() => {
    // Title fade in
    gsap.fromTo(".fade-in-title",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.2 }
    );
  }, []);

  const timeSlotsList = [
    "09:00 AM - 11:00 AM",
    "11:00 AM - 01:00 PM",
    "03:00 PM - 05:00 PM",
    "05:00 PM - 07:00 PM",
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectSlot = (slot) => {
    setFormData({ ...formData, timeSlot: slot });
  };

  const validateStep1 = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone)) errs.phone = "Provide a valid phone number";

    if (!formData.email.trim()) errs.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Provide a valid email";

    if (!formData.age.trim()) errs.age = "Age is required";
    else if (isNaN(formData.age) || parseInt(formData.age) <= 0) errs.age = "Provide a valid age";

    return errs;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!formData.date) errs.date = "Preferred consultation date is required";
    if (!formData.timeSlot) errs.timeSlot = "Select a preferred time slot";
    return errs;
  };

  const nextStep = () => {
    const errs = validateStep1();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errs = validateStep2();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      } else {
        alert("Unable to process appointment submission. Please check connection parameters.");
      }
    } catch (err) {
      console.error("Booking submit error:", err);
      alert("Something went wrong. Please check your internet connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-ivory min-h-screen flex flex-col justify-center">
      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col items-center gap-3">
          <span className="fade-in-title text-xs uppercase tracking-widest text-teal-accent font-bold">
            Appointment Desk
          </span>
          <h1 className="fade-in-title font-serif text-4xl md:text-5xl font-light text-navy-dark">
            Schedule a Consultation
          </h1>
          <p className="fade-in-title text-navy-muted text-sm font-light">
            Fill in the medical preferences below to request a secure consulting slot with Dr. Shadab.
          </p>
        </div>

        {/* Card Body */}
        <div className="glass-premium p-8 md:p-12 rounded-[40px] shadow-2xl border border-medical-100 bg-white/80 relative overflow-hidden">
          
          {success ? (
            /* SUCCESS PANEL */
            <div className="flex flex-col items-center text-center py-10 px-4 gap-6 animate-fade-in">
              <div className="w-20 h-20 bg-teal-500 text-white rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle2 size={44} />
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-navy-dark">
                  Appointment Request Logged
                </h3>
                <p className="text-xs md:text-sm text-navy-muted font-light leading-relaxed max-w-md">
                  Thank you, <strong className="font-medium text-navy-dark">{formData.name}</strong>. A receipt email has been sent to <strong className="font-medium text-navy-dark">{formData.email}</strong>. Our clinical coordinators will call you shortly to confirm timings.
                </p>
              </div>

              <div className="w-full max-w-md p-6 bg-ivory rounded-2xl border border-medical-50 text-left text-xs flex flex-col gap-3">
                <h4 className="font-semibold text-navy-dark uppercase tracking-wider text-[10px]">Consultation Summary:</h4>
                <div className="grid grid-cols-2 gap-y-2 text-navy-muted">
                  <span>Consultation Focus:</span>
                  <span className="font-medium text-navy-dark">{formData.concern}</span>
                  
                  <span>Preferred Date:</span>
                  <span className="font-medium text-navy-dark">{formData.date}</span>
                  
                  <span>Preferred Slot:</span>
                  <span className="font-medium text-navy-dark">{formData.timeSlot}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setStep(1);
                  setSuccess(false);
                  setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    age: "",
                    concern: "General Consultation",
                    date: "",
                    timeSlot: "10:00 AM - 12:00 PM",
                  });
                }}
                className="px-6 py-2.5 bg-medical-700 hover:bg-medical-800 text-white rounded-full text-xs font-semibold shadow-md transition-colors"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            /* STEPPED FORM */
            <form onSubmit={handleFormSubmit} ref={formRef} className="flex flex-col gap-8">
              
              {/* Progress Indicator */}
              <div className="flex items-center justify-between border-b border-medical-50 pb-6">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === 1 ? "bg-medical-700 text-white shadow" : "bg-teal-500 text-white"
                  }`}>
                    1
                  </div>
                  <span className={`text-xs font-semibold ${step === 1 ? "text-navy-dark" : "text-navy-muted"}`}>
                    Demographics
                  </span>
                </div>
                
                <div className="flex-1 h-px bg-medical-100 mx-4"></div>
                
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === 2 ? "bg-medical-700 text-white shadow" : "bg-medical-50 text-navy-muted border border-medical-200"
                  }`}>
                    2
                  </div>
                  <span className={`text-xs font-semibold ${step === 2 ? "text-navy-dark" : "text-navy-muted"}`}>
                    Schedules & Concern
                  </span>
                </div>
              </div>

              {/* STEP 1: PATIENT DETAILS */}
              {step === 1 && (
                <div className="flex flex-col gap-6 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-navy-muted uppercase tracking-wider flex items-center gap-1.5">
                        <User size={14} className="text-medical-600" /> Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Amit Sharma"
                        className={`w-full px-4 py-3 bg-ivory border ${
                          errors.name ? "border-red-400 focus:ring-red-200" : "border-medical-200 focus:ring-medical-200"
                        } rounded-xl text-sm font-medium focus:outline-none focus:ring-2`}
                      />
                      {errors.name && <span className="text-xs text-red-500 font-semibold">{errors.name}</span>}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-navy-muted uppercase tracking-wider flex items-center gap-1.5">
                        <Phone size={14} className="text-medical-600" /> Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 98765 43210"
                        className={`w-full px-4 py-3 bg-ivory border ${
                          errors.phone ? "border-red-400 focus:ring-red-200" : "border-medical-200 focus:ring-medical-200"
                        } rounded-xl text-sm font-medium focus:outline-none focus:ring-2`}
                      />
                      {errors.phone && <span className="text-xs text-red-500 font-semibold">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-xs font-semibold text-navy-muted uppercase tracking-wider flex items-center gap-1.5">
                        <Mail size={14} className="text-medical-600" /> Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. amit@example.com"
                        className={`w-full px-4 py-3 bg-ivory border ${
                          errors.email ? "border-red-400 focus:ring-red-200" : "border-medical-200 focus:ring-medical-200"
                        } rounded-xl text-sm font-medium focus:outline-none focus:ring-2`}
                      />
                      {errors.email && <span className="text-xs text-red-500 font-semibold">{errors.email}</span>}
                    </div>

                    {/* Age */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-navy-muted uppercase tracking-wider flex items-center gap-1.5">
                        Age
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="e.g. 35"
                        min="1"
                        className={`w-full px-4 py-3 bg-ivory border ${
                          errors.age ? "border-red-400 focus:ring-red-200" : "border-medical-200 focus:ring-medical-200"
                        } rounded-xl text-sm font-medium focus:outline-none focus:ring-2`}
                      />
                      {errors.age && <span className="text-xs text-red-500 font-semibold">{errors.age}</span>}
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-8 py-3.5 bg-medical-700 hover:bg-medical-800 text-white rounded-xl text-sm font-semibold shadow-md transition-colors"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: DATES, TIME SLOTS, CONCERN */}
              {step === 2 && (
                <div className="flex flex-col gap-6 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Concern Dropdown */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-navy-muted uppercase tracking-wider flex items-center gap-1.5">
                        <FileText size={14} className="text-medical-600" /> Consultation Focus
                      </label>
                      <select
                        name="concern"
                        value={formData.concern}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-ivory border border-medical-200 focus:ring-medical-250 rounded-xl text-sm font-medium focus:outline-none focus:ring-2"
                      >
                        <option value="General Consultation">General Medical Consultation</option>
                        <option value="Preventive Health">Preventive Health Guidance</option>
                        <option value="Lifestyle Counseling">Lifestyle & Wellness Counseling</option>
                        <option value="Chronic Care Risk">Chronic Risk Assessment</option>
                        <option value="Online Guidance">Online Medical Guidance</option>
                      </select>
                    </div>

                    {/* Date Picker */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-navy-muted uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar size={14} className="text-medical-600" /> Preferred Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-ivory border ${
                          errors.date ? "border-red-400 focus:ring-red-200" : "border-medical-200 focus:ring-medical-200"
                        } rounded-xl text-sm font-medium focus:outline-none focus:ring-2`}
                      />
                      {errors.date && <span className="text-xs text-red-500 font-semibold">{errors.date}</span>}
                    </div>
                  </div>

                  {/* Time slots grid select */}
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-semibold text-navy-muted uppercase tracking-wider flex items-center gap-1.5">
                      <Clock size={14} className="text-medical-600" /> Preferred Time Range
                    </label>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {timeSlotsList.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => handleSelectSlot(slot)}
                          className={`p-3 text-xs rounded-xl border font-semibold text-center transition-all ${
                            formData.timeSlot === slot
                              ? "bg-medical-700 text-white border-transparent shadow"
                              : "bg-ivory border-medical-200 text-navy-muted hover:bg-medical-50"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {errors.timeSlot && <span className="text-xs text-red-500 font-semibold">{errors.timeSlot}</span>}
                  </div>

                  {/* Submit and Prev controls */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-medical-50">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3.5 bg-white border border-medical-200 text-navy-muted hover:bg-medical-50 rounded-xl text-sm font-semibold transition-colors"
                    >
                      Back
                    </button>
                    
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold shadow-md transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <span>Book Consultation</span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Security & Reassurance Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-5 rounded-2xl bg-white/50 border border-medical-100 text-center flex flex-col items-center gap-2.5">
            <ShieldCheck className="text-teal-500" size={24} />
            <h4 className="font-serif font-bold text-navy-dark text-sm">Secure Data</h4>
            <p className="text-[11px] font-light text-navy-muted leading-relaxed">
              Your details are processed with complete patient privacy controls, strictly for coordinator review.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/50 border border-medical-100 text-center flex flex-col items-center gap-2.5">
            <Heart className="text-teal-500" size={24} />
            <h4 className="font-serif font-bold text-navy-dark text-sm">Compassionate Response</h4>
            <p className="text-[11px] font-light text-navy-muted leading-relaxed">
              We respond to every booking request within 12 hours with verified confirmation links and call-backs.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/50 border border-medical-100 text-center flex flex-col items-center gap-2.5">
            <Sparkles className="text-teal-500" size={24} />
            <h4 className="font-serif font-bold text-navy-dark text-sm">Prasad Institute Standard</h4>
            <p className="text-[11px] font-light text-navy-muted leading-relaxed">
              Applying the high clinical ethics taught at Prasad Institute of Medical Sciences. Zero excessive testing.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Booking() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-medical-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
