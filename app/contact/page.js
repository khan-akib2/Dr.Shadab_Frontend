"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock, Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Contact() {
  const containerRef = useRef(null);

  // States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Header fade in
    gsap.fromTo(".fade-in-title",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.2 }
    );

    // Cascading Info Cards
    gsap.fromTo(".contact-info-card",
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ".info-cards-container",
          start: "top 85%",
        }
      }
    );

    // Form 3D Reveal
    gsap.fromTo(".contact-form-container",
      { opacity: 0, scale: 0.9, rotationX: -10 },
      {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1,
        ease: "power2.out",
        transformOrigin: "center bottom",
        scrollTrigger: {
          trigger: ".contact-form-container",
          start: "top 85%",
        }
      }
    );

  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Email is invalid";
    if (!formData.subject.trim()) errs.subject = "Subject is required";
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSubmitting(true);

    // API Submission to the new contact route
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Failed to send the inquiry. Please try again later.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while sending the message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="pt-28 pb-20 bg-ivory">
      {/* Contact Header */}
      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto border-b border-medical-100 relative overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-medical-100/30 blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl flex flex-col gap-6 relative z-10">
          <span className="fade-in-title text-xs uppercase tracking-widest text-teal-accent font-bold">
            Get in Touch
          </span>
          <h1 className="fade-in-title font-serif text-4xl md:text-6xl text-navy-dark font-light leading-tight">
            Contact & Consultation Desk
          </h1>
          <p className="fade-in-title text-lg md:text-xl text-navy-muted font-light leading-relaxed">
            Reach out via the channels below for coordination updates, clinic details, or health counseling questions.
          </p>
        </div>
      </section>

      {/* Grid of details & form */}
      <section className="px-6 md:px-12 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-2xl font-bold text-navy-dark">Clinical Coordinates</h3>
            <p className="text-sm font-light text-navy-muted leading-relaxed">
              Dr. Shadab manages patient sessions in Lucknow. For directions, emergency guidelines, or coordinate adjustments, refer to the markers below.
            </p>
          </div>

          <div className="info-cards-container flex flex-col gap-5 mt-4">
            {/* Address */}
            <div className="contact-info-card flex items-start gap-4 p-5 bg-white border border-medical-100 rounded-2xl shadow-sm">
              <div className="p-3 bg-medical-50 text-medical-700 rounded-xl shrink-0">
                <MapPin size={22} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Clinic Location</span>
                <span className="text-sm font-semibold text-navy-dark">Prasad Institute of Medical Sciences Campus</span>
                <span className="text-xs text-navy-muted font-light">Lucknow Highway Corridor, Uttar Pradesh, India</span>
              </div>
            </div>

            {/* Email */}
            <div className="contact-info-card flex items-start gap-4 p-5 bg-white border border-medical-100 rounded-2xl shadow-sm">
              <div className="p-3 bg-medical-50 text-medical-700 rounded-xl shrink-0">
                <Mail size={22} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Email Inquiries</span>
                <a href="mailto:consult@drshadab.com" className="text-sm font-semibold text-navy-dark hover:text-medical-600 transition-colors">
                  consult@drshadab.com
                </a>
                <span className="text-xs text-navy-muted font-light">Response average: 12-24 Hours</span>
              </div>
            </div>

            {/* Phone */}
            <div className="contact-info-card flex items-start gap-4 p-5 bg-white border border-medical-100 rounded-2xl shadow-sm">
              <div className="p-3 bg-medical-50 text-medical-700 rounded-xl shrink-0">
                <Phone size={22} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Helpline</span>
                <a href="tel:+919876543210" className="text-sm font-semibold text-navy-dark hover:text-medical-600 transition-colors">
                  +91 98765 43210
                </a>
                <span className="text-xs text-navy-muted font-light">Mon - Sat, 10:00 AM - 07:00 PM</span>
              </div>
            </div>
          </div>
          
          <hr className="border-medical-100" />
          
          {/* Working hours */}
          <div className="flex flex-col gap-3">
            <h4 className="font-serif font-bold text-navy-dark text-base flex items-center gap-2">
              <Clock size={16} className="text-teal-accent" /> Consultation Timings
            </h4>
            <ul className="text-xs text-navy-muted font-light flex flex-col gap-1.5 pl-6 list-disc">
              <li>Morning Sessions: 10:00 AM – 01:00 PM</li>
              <li>Evening Sessions: 03:00 PM – 07:00 PM</li>
              <li>Emergency Support: Contact campus triage directly</li>
            </ul>
          </div>
        </div>

        {/* Contact form Column */}
        <div className="lg:col-span-7" style={{ perspective: "1000px" }}>
          <div className="contact-form-container p-8 md:p-10 rounded-[30px] bg-white border border-medical-150 shadow-lg">
            <h3 className="font-serif text-2xl font-bold text-navy-dark mb-2">Send a Message</h3>
            <p className="text-xs text-navy-muted font-light mb-8">
              For common questions, academic inquiries, or custom consultation reviews, use this form.
            </p>

            {success ? (
              <div className="p-8 bg-medical-50/50 border border-medical-100 rounded-2xl text-center flex flex-col items-center gap-4 animate-fade-in">
                <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center shadow">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-serif text-xl font-bold text-navy-dark">Message Dispatched</h4>
                <p className="text-xs text-navy-muted font-light leading-relaxed max-w-sm">
                  We have logged your query. Our clinic coordinator will review your question and respond within 24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-5 py-2 border border-medical-200 hover:bg-medical-50 text-medical-700 text-xs font-semibold rounded-full transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-navy-muted uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Priyan"
                      className="px-4 py-3 bg-ivory border border-medical-200 focus:ring-medical-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2"
                    />
                    {errors.name && <span className="text-[10px] text-red-500 font-semibold">{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-navy-muted uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. priya@example.com"
                      className="px-4 py-3 bg-ivory border border-medical-200 focus:ring-medical-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2"
                    />
                    {errors.email && <span className="text-[10px] text-red-500 font-semibold">{errors.email}</span>}
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-navy-muted uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Inquiry regarding Diabetes screening"
                    className="px-4 py-3 bg-ivory border border-medical-200 focus:ring-medical-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2"
                  />
                  {errors.subject && <span className="text-[10px] text-red-500 font-semibold">{errors.subject}</span>}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-navy-muted uppercase tracking-wider">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your health question or query in detail..."
                    className="px-4 py-3 bg-ivory border border-medical-200 focus:ring-medical-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2"
                  ></textarea>
                  {errors.message && <span className="text-[10px] text-red-500 font-semibold">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-2 py-4 bg-medical-700 hover:bg-medical-800 text-white rounded-xl text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all disabled:bg-slate-400"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Dispatching Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Send Secure Query</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </section>

    </div>
  );
}
