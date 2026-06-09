"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, MessageCircle, User, Phone, Mail, FileText, Calendar, CheckCircle2, XCircle, Clock } from "lucide-react";
import Link from "next/link";

function AdminConsoleContent() {
  const searchParams = useSearchParams();
  
  // Extract URL parameters
  const type = searchParams.get("type") || "appointment"; // 'appointment' or 'contact'
  const initialStatus = searchParams.get("status") || "confirm"; // 'confirm', 'reschedule', 'decline'
  const name = searchParams.get("name") || "Patient Name";
  const email = searchParams.get("email") || "patient@example.com";
  const phone = searchParams.get("phone") || "Not provided";
  const concern = searchParams.get("concern") || "General Consultation";
  const date = searchParams.get("date") || "Not specified";
  const time = searchParams.get("time") || "Not specified";

  const [activeTab, setActiveTab] = useState(initialStatus);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Generate template text based on the active tab and type
  useEffect(() => {
    let template = "";
    if (type === "appointment") {
      if (activeTab === "confirm") {
        template = `Dear ${name},\n\nWe are pleased to confirm your appointment for a ${concern}.\n\nDate: ${date}\nTime Slot: ${time}\nLocation: Prasad Institute of Medical Sciences Campus, Lucknow\n\nPlease arrive 10 minutes early with any relevant past medical records. If you need to reschedule, please let us know at least 24 hours in advance.\n\nWarm regards,\nDr. Shadab Clinic`;
      } else if (activeTab === "reschedule") {
        template = `Dear ${name},\n\nThank you for requesting an appointment for a ${concern}.\n\nUnfortunately, Dr. Shadab is unavailable during your requested time (${date} - ${time}). We would like to propose an alternative time slot for your consultation.\n\nPlease reply to this email or call us at +91 98765 43210 to find a suitable time.\n\nWarm regards,\nDr. Shadab Clinic`;
      } else if (activeTab === "decline") {
        template = `Dear ${name},\n\nThank you for reaching out to Dr. Shadab's Clinic regarding your ${concern}.\n\nAt this time, we are unable to accommodate your appointment request. Based on your symptoms, we recommend visiting your nearest multi-specialty hospital for immediate review.\n\nWishing you good health.\n\nSincerely,\nDr. Shadab Clinic`;
      }
    } else {
      // Contact type
      if (activeTab === "confirm") {
        template = `Dear ${name},\n\nThank you for your inquiry regarding: ${concern}.\n\n[Type your professional medical response here...]\n\nIf you have any further questions or would like to schedule a formal consultation, please let us know.\n\nWarm regards,\nDr. Shadab Clinic`;
      } else {
        template = `Dear ${name},\n\nThank you for reaching out.\n\nRegarding your inquiry about "${concern}", we require some additional details before we can provide accurate clinical guidance.\n\nCould you please clarify [Specify what you need here...]?\n\nWarm regards,\nDr. Shadab Clinic`;
      }
    }
    setMessage(template);
  }, [activeTab, name, concern, date, time, type]);

  const handleSendEmail = async () => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: email,
          toName: name,
          subject: type === "appointment" ? "Update regarding your appointment request - Dr. Shadab" : "Response to your inquiry - Dr. Shadab",
          messageText: message
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        alert("Failed to dispatch email via Brevo.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendWhatsApp = () => {
    // Format phone number to international format, assuming India (+91) if not provided
    let waPhone = phone.replace(/[^0-9]/g, "");
    if (waPhone.length === 10) waPhone = "91" + waPhone;
    
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Top Navbar */}
      <header className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition">
            <XCircle size={18} className="text-slate-500" />
          </Link>
          <div>
            <h1 className="font-serif text-xl font-bold text-slate-900 tracking-wide">DR. SHADAB</h1>
            <p className="text-[10px] text-sky-600 uppercase tracking-widest font-semibold">Admin Response Console</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 text-xs font-semibold shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          SYSTEM ONLINE
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Patient Details */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-sky-600 font-bold uppercase tracking-widest">Inquiry Profile</span>
            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Patient Request Details</h2>
          </div>

          <div className="flex flex-col gap-3">
            {/* Name */}
            <div className="p-4 bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase">
                <User size={14} /> Patient Name
              </div>
              <div className="text-lg text-slate-900 font-medium pl-6">{name}</div>
            </div>

            {/* Concern */}
            <div className="p-4 bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase">
                <FileText size={14} /> Focus / Concern
              </div>
              <div className="text-lg text-sky-600 font-bold pl-6 uppercase tracking-wide">{concern}</div>
            </div>

            {type === "appointment" && (
              <div className="p-4 bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase">
                  <Calendar size={14} /> Requested Schedule
                </div>
                <div className="text-sm text-slate-900 pl-6 mt-1 flex flex-col gap-1">
                  <span><strong className="text-slate-500 font-normal">Date:</strong> {date}</span>
                  <span><strong className="text-slate-500 font-normal">Time:</strong> {time}</span>
                </div>
              </div>
            )}

            {/* Phone */}
            <div className="p-4 bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col gap-1 hover:border-sky-300 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase">
                  <Phone size={14} /> Phone Number
                </div>
              </div>
              <div className="text-slate-900 font-medium pl-6">{phone}</div>
            </div>

            {/* Email */}
            <div className="p-4 bg-white border border-slate-200 shadow-sm rounded-lg flex flex-col gap-1 hover:border-sky-300 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase">
                <Mail size={14} /> Email Address
              </div>
              <div className="text-slate-900 font-medium pl-6">{email}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Draft & Dispatch */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="p-6 md:p-8 bg-white border border-slate-200 shadow-lg rounded-xl flex flex-col h-full">
            <div className="flex flex-col gap-1 mb-8">
              <span className="text-[10px] text-sky-600 font-bold uppercase tracking-widest">Notification Center</span>
              <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Draft & Dispatch Message</h2>
            </div>

            {success ? (
               <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12">
                 <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-sm">
                   <CheckCircle2 size={32} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">Message Dispatched</h3>
                 <p className="text-slate-600 max-w-sm">
                   The clinical response has been successfully sent to the patient's email address.
                 </p>
                 <button 
                   onClick={() => setSuccess(false)}
                   className="mt-4 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded shadow-md transition"
                 >
                   Send another message
                 </button>
               </div>
            ) : (
              <>
                <div className="flex flex-col gap-2 mb-6">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Select Action Status</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      onClick={() => setActiveTab("confirm")}
                      className={`py-3 text-xs font-bold uppercase tracking-wide rounded border transition-colors ${
                        activeTab === "confirm" 
                        ? "bg-sky-600 border-sky-500 text-white shadow-md" 
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                    >
                      ✓ Confirm
                    </button>
                    <button
                      onClick={() => setActiveTab("reschedule")}
                      className={`py-3 text-xs font-bold uppercase tracking-wide rounded border transition-colors ${
                        activeTab === "reschedule" 
                        ? "bg-sky-600 border-sky-500 text-white shadow-md" 
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                   >
                      <Clock size={14} className="inline mr-1 -mt-0.5" /> Delay / Reschedule
                    </button>
                    <button
                      onClick={() => setActiveTab("decline")}
                      className={`py-3 text-xs font-bold uppercase tracking-wide rounded border transition-colors ${
                        activeTab === "decline" 
                        ? "bg-rose-600 border-rose-500 text-white shadow-md" 
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                    >
                      ✕ Decline
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1 mb-6">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Text Writing Area (Personalized Patient Message)</span>
                    <span className="text-[10px] text-sky-600 font-bold uppercase tracking-widest">Live Template Auto-Fill</span>
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full flex-1 min-h-[250px] p-5 bg-slate-50 border-l-4 border-sky-500 border-y border-r border-y-slate-200 border-r-slate-200 text-slate-800 font-mono text-sm focus:outline-none focus:bg-white focus:border-sky-500 shadow-inner transition-colors resize-none rounded-r-lg"
                  ></textarea>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Dispatch Channels</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={handleSendEmail}
                      disabled={submitting}
                      className="py-4 bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-md transition disabled:opacity-50"
                    >
                      {submitting ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Send size={16} />
                      )}
                      Send Professional Email
                    </button>
                    
                    <button
                      onClick={handleSendWhatsApp}
                      className="py-4 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-md transition"
                    >
                      <MessageCircle size={16} /> Send via WhatsApp
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>

      </main>
    </div>
  );
}

export default function AdminRespondPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-sky-600">Loading console...</div>}>
      <AdminConsoleContent />
    </Suspense>
  );
}
