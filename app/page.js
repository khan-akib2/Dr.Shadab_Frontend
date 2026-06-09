"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Heart, 
  Activity, 
  Calendar, 
  ShieldCheck, 
  Users, 
  Award, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Stethoscope, 
  ArrowRight,
  BookOpen,
  MessageSquare,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import confetti from "canvas-confetti";

export default function Home() {
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    concern: "General Consultation",
    date: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Testimonials Carousel State
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "Dr. Shadab took the time to truly listen to my concerns instead of rushing through the appointment. His guidance was clear, evidence-based, and highly reassuring.",
      author: "Amit Sharma",
      role: "Chronic Care Patient",
      rating: 5
    },
    {
      quote: "The personalized preventive wellness plan Dr. Shadab built for me has completely transformed my lifestyle. My energy levels are up, and my chronic risk factors are down.",
      author: "Priyanka Verma",
      role: "Lifestyle Guidance Client",
      rating: 5
    },
    {
      quote: "His digital consultations feel as warm and professional as an in-person clinic. An exceptional physician who makes complex medical terminology easy to understand.",
      author: "Rajesh Gupta",
      role: "Telehealth Consultation Patient",
      rating: 5
    }
  ];

  // Services list
  const servicesList = [
    {
      title: "General Medical Consultation",
      description: "Thorough diagnostic evaluations, prescription management, and primary treatment plans for acute and chronic conditions.",
      icon: Stethoscope,
      accent: "from-blue-500/20 to-medical-600/20"
    },
    {
      title: "Preventive Health Guidance",
      description: "Evidence-based screening schedules, cardiovascular health reviews, and custom immune support strategies.",
      icon: ShieldCheck,
      accent: "from-teal-500/20 to-teal-600/20"
    },
    {
      title: "Lifestyle Counseling",
      description: "Personalized guidance on diet modification, stress management, metabolic health optimization, and sleep hygiene.",
      icon: Activity,
      accent: "from-indigo-500/20 to-blue-600/20"
    },
    {
      title: "Chronic Risk Assessments",
      description: "Comprehensive assessments targeting diabetic risks, hypertension, hyperlipidemia, and family medical histories.",
      icon: FileText,
      accent: "from-medical-600/20 to-teal-500/20"
    },
    {
      title: "Follow-up Consultations",
      description: "Structured reviews to adjust treatment schedules, monitor medication compliance, and analyze healing progress.",
      icon: Clock,
      accent: "from-blue-600/20 to-indigo-500/20"
    },
    {
      title: "Online Medical Guidance",
      description: "Premium digital medical reviews and counseling accessible from anywhere, ensuring seamless continuity of care.",
      icon: MessageSquare,
      accent: "from-teal-600/20 to-medical-500/20"
    }
  ];

  // Articles list
  const articlesList = [
    {
      category: "Preventive Healthcare",
      title: "Understanding Hypertension: Practical Dietary Approaches",
      excerpt: "High blood pressure is often a silent health hazard. Learn how smart dietary modifications, including sodium regulation and mineral-rich food integration, play a critical role.",
      readTime: "5 min read",
      date: "May 28, 2026"
    },
    {
      category: "Healthy Living",
      title: "The Science of Sleep and Metabolic Balance",
      excerpt: "Recent medical reviews highlight a profound connection between circadian rhythms and hormone regulation. Discover tips to synchronize your sleep cycle for healthy metabolic performance.",
      readTime: "7 min read",
      date: "May 15, 2026"
    },
    {
      category: "Myths vs Facts",
      title: "Common Medical Misconceptions in Modern Nutrition",
      excerpt: "Debunking widely believed nutritional myths with peer-reviewed medical evidence. We contrast popular diet trends against actual metabolic requirements.",
      readTime: "4 min read",
      date: "Apr 30, 2026"
    }
  ];

  useEffect(() => {
    setIsMounted(true);
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // --- SECTION 1: HERO TEXT DISASSEMBLY ---
      const heroTextSpans = document.querySelectorAll(".hero-disassemble span");
      if (heroTextSpans.length > 0) {
        gsap.to(heroTextSpans, {
          y: (i) => (i % 2 === 0 ? -120 : 120),
          x: (i) => (i % 3 === 0 ? -60 : 60),
          opacity: 0,
          rotate: (i) => (i % 2 === 0 ? -15 : 15),
          scale: 0.8,
          scrollTrigger: {
            trigger: ".hero-sec",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          }
        });
      }

      let mm2 = gsap.matchMedia();
      mm2.add('(min-width: 768px)', () => {
        // --- SECTION 2: HUMAN SIDE SCROLLYTELLING (Pinned) ---
        const frames = gsap.utils.toArray('.scrollytelling-frame');
        if (frames.length > 0) {
          gsap.to('.scrollytelling-progress', {
            width: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: '.scrollytelling-container',
              start: 'top top',
              end: '+=400%',
              scrub: 0.1,
            }
          });

          const sideTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: '.scrollytelling-container',
              start: 'top top',
              end: '+=400%',
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            }
          });

          sideTimeline.to({}, { duration: 0.2 });

          frames.forEach((frame, index) => {
            if (index === 0) return;
            const prevFrame = frames[index - 1];
            const currentChildren = Array.from(frame.children);

            sideTimeline.to(prevFrame, {
              opacity: 0,
              y: -50,
              scale: 0.95,
              duration: 1,
              ease: 'power2.inOut'
            }, `transition-${index}`);

            sideTimeline.fromTo(frame,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 0.1 },
              `transition-${index}`
            );

            sideTimeline.fromTo(currentChildren,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power2.out' },
              `transition-${index}`
            );

            sideTimeline.to({}, { duration: 0.5 });
          });
        }
      });

      // --- SECTION 3: COUNTERS ANIMATION ---
      const counters = document.querySelectorAll(".counter-number");
      if (counters.length > 0) {
        gsap.from(counters, {
          textContent: 0,
          duration: 2.5,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: ".counters-sec",
            start: "top 80%",
            toggleActions: "play none none none",
          }
        });
      }

      // --- SECTION 5: PATIENT JOURNEY HORIZONTAL SCROLL ---
      let mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        const journeyTrack = document.querySelector(".journey-track");
        if (journeyTrack) {
          gsap.to(journeyTrack, {
            x: () => -(journeyTrack.scrollWidth - window.innerWidth + 120),
            ease: "none",
            scrollTrigger: {
              trigger: ".journey-sec",
              start: "top top",
              end: () => `+=${journeyTrack.scrollWidth}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            }
          });
        }
      });

      // --- SECTION 9: WHY TRUST STACK REVEAL ---
      const trustCards = gsap.utils.toArray(".trust-point-card");
      if (trustCards.length > 0) {
        const trustTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".trust-sec",
            start: "top top",
            end: "+=250%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          }
        });

        trustCards.forEach((card, index) => {
          if (index === 0) return;
          
          // Animate cards stacking on top of each other
          trustTimeline.fromTo(card,
            { yPercent: 120, opacity: 0.5 },
            { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out" }
          );
        });
      }

      // --- GENERAL SCROLL REVEALS ---
      const reveals = document.querySelectorAll(".scroll-reveal");
      reveals.forEach((element) => {
        gsap.fromTo(element,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Form Submission Validation & Handler
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone)) errors.phone = "Provide a valid phone number";
    
    if (!formData.email.trim()) errors.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Provide a valid email";

    if (!formData.age.trim()) errors.age = "Age is required";
    else if (isNaN(formData.age) || parseInt(formData.age) <= 0) errors.age = "Provide a valid age";

    if (!formData.date) errors.date = "Preferred appointment date is required";

    return errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setFormSubmitting(true);

    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSuccess(true);
        // Trigger high-end celebration confetti
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.7 }
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          age: "",
          concern: "General Consultation",
          date: "",
        });
      } else {
        alert("There was an issue sending your booking request. Please check the network and try again.");
      }
    } catch (err) {
      console.error("Booking submission error:", err);
      alert("Something went wrong. Please check your connection.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Luxury Testimonials Navigation
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div ref={containerRef} className="relative w-full">

      {/* Floating Animated Icons Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15%] left-[5%] w-24 h-24 text-medical-600/5 animate-float-slow">
          <Stethoscope size={96} />
        </div>
        <div className="absolute top-[45%] right-[8%] w-32 h-32 text-teal-accent/5 animate-float-slower">
          <Activity size={120} />
        </div>
        <div className="absolute top-[85%] left-[8%] w-28 h-28 text-medical-700/5 animate-float-slow">
          <Heart size={100} />
        </div>
      </div>

      {/* SECTION 1: HERO SECTION */}
      <section className="hero-sec min-h-screen flex flex-col justify-center items-center relative px-6 md:px-12 py-24 bg-medical-gradient border-b border-medical-100 overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-50"></div>
        
        {/* Premium visual glows */}
        <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-medical-100/40 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-teal-accent/5 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl text-center flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-medical-50 border border-medical-200 text-medical-700 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm animate-pulse">
            <Sparkles size={14} className="text-teal-accent" />
            <span>Dedicated Consultation & Patient Care</span>
          </span>

          {/* Splitted text for GSAP scroll disassembly */}
          <h1 className="hero-disassemble font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-navy-dark leading-[1.1] tracking-tight max-w-4xl py-2">
            {"Healthcare That Listens, Cares, and Guides.".split(" ").map((word, idx) => (
              <span key={idx} className="inline-block mr-3 md:mr-4 origin-center">
                {word}
              </span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-navy-muted max-w-2xl font-light leading-relaxed">
            Professional medical consultation, personalized guidance, and compassionate care designed around every patient’s unique health journey.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <Link
              href="/booking"
              className="w-full sm:w-auto px-8 py-4 bg-medical-700 hover:bg-medical-800 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Book Consultation</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-white/80 hover:bg-white text-navy-dark border border-medical-200 rounded-full font-semibold shadow-md transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Contact Doctor</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE HUMAN SIDE OF MEDICINE (Vertical Pinned Scrollytelling) */}
      <section className="scrollytelling-container relative w-full md:h-screen bg-white pb-24 md:pb-0">
        {/* Progress Bar */}
        <div className="hidden md:block absolute top-0 left-0 w-full h-1.5 bg-medical-50 z-50">
          <div className="scrollytelling-progress h-full bg-medical-500 w-0 shadow-[0_0_10px_rgba(45,140,165,0.4)]"></div>
        </div>

        <div className="relative w-full h-full flex flex-col md:flex-row md:items-center justify-center px-6 md:px-12 md:overflow-hidden pt-16 md:pt-0 gap-16 md:gap-0">
          {/* Subtle medical gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-ivory via-white to-medical-50/30"></div>

          <div className="relative z-10 max-w-4xl w-full flex flex-col md:block gap-12 md:gap-0">
            {/* Slide Frame 1 */}
            <div className="scrollytelling-frame relative md:absolute md:inset-0 flex flex-col justify-center items-center text-center gap-6">
              <span className="text-teal-accent text-xs tracking-widest uppercase font-semibold">The Diagnostic Struggle</span>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-navy-dark font-light leading-tight">
                Patients often feel confused.
              </h2>
              <p className="text-navy-muted text-base md:text-lg max-w-xl font-light leading-relaxed">
                Symptoms emerge unexpectedly. Between complicated medical terminology and fast-paced healthcare clinics, feeling lost is a common first hurdle.
              </p>
              <div className="w-12 h-0.5 bg-medical-200 mt-4"></div>
            </div>

            {/* Slide Frame 2 */}
            <div className="scrollytelling-frame relative md:absolute md:inset-0 flex flex-col justify-center items-center text-center gap-6 md:opacity-0 md:translate-y-[50px]">
              <span className="text-teal-accent text-xs tracking-widest uppercase font-semibold">Information Overload</span>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-navy-dark font-light leading-tight">
                Searching endlessly online.
              </h2>
              <p className="text-navy-muted text-base md:text-lg max-w-xl font-light leading-relaxed">
                Self-diagnosing on search engines generates extreme anxiety. Unfiltered online articles often lead to worst-case predictions instead of constructive answers.
              </p>
              <div className="w-12 h-0.5 bg-medical-200 mt-4"></div>
            </div>

            {/* Slide Frame 3 */}
            <div className="scrollytelling-frame relative md:absolute md:inset-0 flex flex-col justify-center items-center text-center gap-6 md:opacity-0 md:translate-y-[50px]">
              <span className="text-teal-accent text-xs tracking-widest uppercase font-semibold">The Right Direction</span>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-navy-dark font-light leading-tight">
                Patients need real guidance.
              </h2>
              <p className="text-navy-muted text-base md:text-lg max-w-xl font-light leading-relaxed">
                A path forward requires clinical evidence, simplified concepts, and a patient-centric dialogue that targets root causes, not just immediate symptoms.
              </p>
              <div className="w-12 h-0.5 bg-medical-200 mt-4"></div>
            </div>

            {/* Slide Frame 4 */}
            <div className="scrollytelling-frame relative md:absolute md:inset-0 flex flex-col justify-center items-center text-center gap-6 md:opacity-0 md:translate-y-[50px]">
              <span className="text-teal-accent text-xs tracking-widest uppercase font-semibold">The Care Catalyst</span>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-navy-dark font-light leading-tight">
                A trusted doctor makes the difference.
              </h2>
              <p className="text-navy-muted text-base md:text-lg max-w-xl font-light leading-relaxed">
                Personalized care bridges scientific knowledge with everyday patient realities, transforming fear and confusion into reassurance and structured healing.
              </p>
              <div className="w-12 h-0.5 bg-medical-200 mt-4"></div>
            </div>

            {/* Slide Frame 5 */}
            <div className="scrollytelling-frame relative md:absolute md:inset-0 flex flex-col justify-center items-center text-center gap-6 md:opacity-0 md:translate-y-[50px]">
              <span className="text-teal-accent text-xs tracking-widest uppercase font-semibold">Meet Dr. Shadab</span>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-navy-dark font-light leading-tight">
                Empathy Meets Clinical Evidence.
              </h2>
              <p className="text-navy-muted text-base md:text-lg max-w-xl font-light leading-relaxed">
                Dr. Shadab offers dedicated general health consulting to build patient confidence, outline practical preventative measures, and deliver clear medical pathways.
              </p>
              <Link 
                href="/about"
                className="mt-4 px-6 py-3 bg-medical-700 hover:bg-medical-800 text-white rounded-full text-sm font-semibold shadow-md transition-colors"
              >
                Learn About Dr. Shadab
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ABOUT DR. SHADAB */}
      <section className="px-6 md:px-12 py-24 bg-ivory border-t border-b border-medical-100 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Credentials Card */}
          <div className="lg:col-span-5 scroll-reveal">
            <div className="relative p-8 md:p-10 rounded-3xl glass-premium shadow-xl border border-medical-100 bg-white/70 overflow-hidden flex flex-col gap-6 group hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 right-0 w-24 h-24 bg-medical-50 rounded-bl-3xl flex items-center justify-center">
                <Award size={36} className="text-medical-600" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-widest text-teal-accent font-semibold">Academic Foundation</span>
                <h3 className="font-serif text-3xl font-semibold text-navy-dark">Credentials</h3>
              </div>
              
              <div className="flex flex-col gap-4 text-navy-muted text-sm font-light leading-relaxed">
                <div className="p-4 bg-medical-50/50 rounded-2xl border border-medical-100/50">
                  <strong className="text-navy-dark font-medium block text-base mb-1">MBBS Graduate</strong>
                  <span>Awarded basic clinical degree representing comprehensive knowledge in multi-system health.</span>
                </div>
                
                <div className="p-4 bg-medical-50/50 rounded-2xl border border-medical-100/50">
                  <strong className="text-navy-dark font-medium block text-base mb-1">Prasad Institute of Medical Sciences</strong>
                  <span>Received training at Lucknow’s renowned medical academy, emphasizing clinical rotations, emergency triage, and diagnosis.</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-medical-100 flex items-center justify-between text-xs text-navy-muted">
                <span>Registrations Active</span>
                <span className="font-semibold text-teal-accent flex items-center gap-1">
                  <CheckCircle2 size={12} /> Verified Practitioner
                </span>
              </div>
            </div>
          </div>

          {/* Narrative Narrative and Counters */}
          <div className="lg:col-span-7 flex flex-col gap-6 scroll-reveal">
            <span className="text-xs uppercase tracking-widest text-teal-accent font-bold">About Dr. Shadab</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-navy-dark leading-tight">
              A healthcare philosophy centered on listening.
            </h2>
            <p className="text-navy-muted font-light leading-relaxed text-base md:text-lg">
              Dedicated to helping patients make informed healthcare decisions through compassionate consultation and evidence-based medical guidance. 
            </p>
            <p className="text-navy-muted font-light leading-relaxed text-sm md:text-base">
              Believing that the healing process begins the moment a patient feels heard, Dr. Shadab focuses on translating complex medical diagnostics into clear, step-by-step lifestyles. This approach is designed to prevent illnesses, control chronic indicators, and build permanent trust.
            </p>

            {/* Subtle Count-Up Indicators */}
            <div className="counters-sec grid grid-cols-3 gap-6 pt-6 border-t border-medical-100">
              <div className="flex flex-col">
                <span className="font-serif text-3xl md:text-4xl font-semibold text-medical-700">
                  <span className="counter-number" data-target="5000">5000</span>+
                </span>
                <span className="text-xs text-navy-muted tracking-wider uppercase mt-1">Patients Guided</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-3xl md:text-4xl font-semibold text-medical-700">
                  <span className="counter-number" data-target="1000">1000</span>+
                </span>
                <span className="text-xs text-navy-muted tracking-wider uppercase mt-1">Consultations</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-3xl md:text-4xl font-semibold text-medical-700">
                  <span className="counter-number" data-target="50">50</span>+
                </span>
                <span className="text-xs text-navy-muted tracking-wider uppercase mt-1">Health Sessions</span>
              </div>
            </div>
            
            <div className="mt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-medical-700 hover:text-medical-800 transition-colors group"
              >
                <span>Read entire clinical journey</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: HEALTHCARE SERVICES */}
      <section className="px-6 md:px-12 py-24 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4 scroll-reveal">
            <span className="text-xs uppercase tracking-widest text-teal-accent font-bold">Comprehensive Care</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-navy-dark leading-tight">
              Medical Consulting Services
            </h2>
            <p className="text-navy-muted font-light text-sm md:text-base leading-relaxed">
              Targeted clinical interventions and ongoing counsel configured to promote healthy lifespans and accurate diagnosis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, index) => {
              const IconComp = service.icon;
              return (
                <div 
                  key={index}
                  className="scroll-reveal group relative p-8 rounded-3xl bg-ivory/60 hover:bg-white border border-medical-100 hover:border-medical-200 transition-all duration-300 hover:shadow-xl flex flex-col gap-6"
                >
                  {/* Subtle hover icon glow */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.accent} flex items-center justify-center text-medical-700 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComp size={24} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif text-xl font-semibold text-navy-dark group-hover:text-medical-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm font-light text-navy-muted leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-medical-50 flex items-center justify-between text-xs text-navy-muted opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Learn requirements</span>
                    <ArrowRight size={14} className="text-teal-accent" />
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12 scroll-reveal">
            <Link 
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-medical-50 hover:bg-medical-100 border border-medical-200 text-medical-700 rounded-full text-sm font-semibold transition-all shadow-sm"
            >
              <span>Explore services in detail</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: PATIENT JOURNEY (Horizontal Scrollytelling Pinned) */}
      <section className="journey-sec relative w-full h-screen bg-ivory overflow-hidden border-t border-b border-medical-100">
        <div className="relative w-full h-full flex flex-col justify-center py-12">
          {/* Section Header */}
          <div className="max-w-4xl px-6 md:px-12 mb-8 flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-teal-accent font-bold">Step-by-Step Pathway</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-navy-dark">
              Your Journey to Better Health
            </h2>
            <p className="text-navy-muted text-sm font-light">
              Scroll down to traverse the structured steps of our clinical consultation process.
            </p>
          </div>

          {/* Horizontal Track (Stacks vertically on mobile) */}
          <div className="journey-track flex flex-col md:flex-row gap-8 px-6 md:px-12 md:w-max pb-12 md:pb-0">
            {/* Step 1 */}
            <div className="w-full md:w-[400px] shrink-0 p-8 rounded-3xl bg-white shadow-lg border border-medical-100 flex flex-col gap-4 relative">
              <span className="absolute top-6 right-8 font-serif text-6xl text-medical-100 font-extrabold select-none">01</span>
              <span className="text-xs uppercase tracking-wider text-teal-accent font-semibold">Initiation</span>
              <h3 className="font-serif text-xl font-bold text-navy-dark mt-4">1. Book Appointment</h3>
              <p className="text-sm font-light text-navy-muted leading-relaxed">
                Schedule a consultation easily through our digital portal. Choose a slot, outline your concern briefly, and receive a secure confirmation code.
              </p>
            </div>

            {/* Step 2 */}
            <div className="w-full md:w-[400px] shrink-0 p-8 rounded-3xl bg-white shadow-lg border border-medical-100 flex flex-col gap-4 relative">
              <span className="absolute top-6 right-8 font-serif text-6xl text-medical-100 font-extrabold select-none">02</span>
              <span className="text-xs uppercase tracking-wider text-teal-accent font-semibold">Consultation</span>
              <h3 className="font-serif text-xl font-bold text-navy-dark mt-4">2. Discuss Symptoms</h3>
              <p className="text-sm font-light text-navy-muted leading-relaxed">
                Speak directly with Dr. Shadab. Discuss symptoms, timeline, family medical background, and clarify diagnostic queries in a reassuring environment.
              </p>
            </div>

            {/* Step 3 */}
            <div className="w-full md:w-[400px] shrink-0 p-8 rounded-3xl bg-white shadow-lg border border-medical-100 flex flex-col gap-4 relative">
              <span className="absolute top-6 right-8 font-serif text-6xl text-medical-100 font-extrabold select-none">03</span>
              <span className="text-xs uppercase tracking-wider text-teal-accent font-semibold">Clinical Diagnostics</span>
              <h3 className="font-serif text-xl font-bold text-navy-dark mt-4">3. Receive Medical Guidance</h3>
              <p className="text-sm font-light text-navy-muted leading-relaxed">
                Receive evidence-based diagnoses and customized advice. Dr. Shadab explains the physiological causes and outlines structured medication or lab screens.
              </p>
            </div>

            {/* Step 4 */}
            <div className="w-full md:w-[400px] shrink-0 p-8 rounded-3xl bg-white shadow-lg border border-medical-100 flex flex-col gap-4 relative">
              <span className="absolute top-6 right-8 font-serif text-6xl text-medical-100 font-extrabold select-none">04</span>
              <span className="text-xs uppercase tracking-wider text-teal-accent font-semibold">Action Plan</span>
              <h3 className="font-serif text-xl font-bold text-navy-dark mt-4">4. Follow Treatment Plan</h3>
              <p className="text-sm font-light text-navy-muted leading-relaxed">
                Implement lifestyle adjustments, dietary suggestions, and therapeutic prescriptions. Clear checklists and patient guidelines assist at every stage.
              </p>
            </div>

            {/* Step 5 */}
            <div className="w-full md:w-[400px] shrink-0 p-8 rounded-3xl bg-white shadow-lg border border-medical-100 flex flex-col gap-4 relative md:mr-24">
              <span className="absolute top-6 right-8 font-serif text-6xl text-medical-100 font-extrabold select-none">05</span>
              <span className="text-xs uppercase tracking-wider text-teal-accent font-semibold">Longevity</span>
              <h3 className="font-serif text-xl font-bold text-navy-dark mt-4">5. Continuous Care</h3>
              <p className="text-sm font-light text-navy-muted leading-relaxed">
                Stay aligned with follow-up checkpoints. Review metrics, fine-tune prescriptions, and make long-term preventive decisions to protect your health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: HEALTH AWARENESS HUB */}
      <section className="px-6 md:px-12 py-24 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6 scroll-reveal">
            <div className="max-w-2xl flex flex-col gap-4">
              <span className="text-xs uppercase tracking-widest text-teal-accent font-bold">Patient Education</span>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-navy-dark leading-tight">
                Health Awareness Hub
              </h2>
              <p className="text-navy-muted font-light text-sm md:text-base leading-relaxed">
                Read clinical analyses, lifestyle adjustment tips, and guides outlining standard preventive medicine protocols.
              </p>
            </div>
            
            <Link 
              href="/resources"
              className="inline-flex items-center gap-1.5 px-6 py-3 bg-medical-700 text-white hover:bg-medical-800 rounded-full text-sm font-semibold transition-all shadow-md shrink-0"
            >
              <span>Browse Resource Library</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articlesList.map((article, index) => (
              <div 
                key={index}
                className="scroll-reveal group flex flex-col bg-ivory/50 border border-medical-100 rounded-3xl p-8 hover:bg-white hover:shadow-xl hover:border-medical-200 transition-all duration-300"
              >
                <span className="text-[11px] uppercase tracking-wider text-teal-accent font-bold mb-4 block">
                  {article.category}
                </span>
                
                <h3 className="font-serif text-xl font-semibold text-navy-dark mb-4 group-hover:text-medical-700 transition-colors leading-snug">
                  {article.title}
                </h3>
                
                <p className="text-sm font-light text-navy-muted leading-relaxed mb-6">
                  {article.excerpt}
                </p>
                
                <div className="mt-auto pt-6 border-t border-medical-50 flex items-center justify-between text-xs text-slate-400">
                  <span>{article.date}</span>
                  <span className="font-medium text-medical-700 flex items-center gap-1 group-hover:underline">
                    Read article <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: TESTIMONIALS (Luxury Glassmorphism Carousel) */}
      <section className="px-6 md:px-12 py-24 bg-ivory border-t border-b border-medical-100 relative overflow-hidden">
        {/* Glow behind */}
        <div className="absolute top-[40%] left-[30%] w-[35vw] h-[35vw] rounded-full bg-medical-100/30 blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8 relative z-10 scroll-reveal">
          <span className="text-xs uppercase tracking-widest text-teal-accent font-bold">Patient Reviews</span>
          
          {/* Large Quotation */}
          <div className="text-medical-200 font-serif text-9xl leading-[0.1] select-none -mt-4 opacity-55">“</div>
          
          {/* Carousel Body */}
          <div className="min-h-[180px] flex items-center justify-center px-4">
            <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl font-light text-navy-dark italic leading-relaxed transition-all duration-500">
              {testimonials[currentTestimonial].quote}
            </blockquote>
          </div>

          <div className="flex flex-col items-center gap-1">
            <cite className="not-italic font-serif text-lg font-semibold text-navy-dark">
              {testimonials[currentTestimonial].author}
            </cite>
            <span className="text-xs text-teal-accent font-medium tracking-wide uppercase">
              {testimonials[currentTestimonial].role}
            </span>
          </div>

          {/* Controls */}
          {isMounted && (
            <div className="flex items-center gap-4 mt-6">
              <button 
                onClick={prevTestimonial}
                suppressHydrationWarning={true}
                className="p-3 bg-white border border-medical-100 rounded-full text-navy-dark hover:bg-medical-700 hover:text-white hover:border-transparent transition-all shadow-sm focus:outline-none"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              
              {/* Slide Indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    suppressHydrationWarning={true}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === currentTestimonial 
                        ? "bg-medical-700 w-6" 
                        : "bg-medical-200 hover:bg-medical-400"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={nextTestimonial}
                suppressHydrationWarning={true}
                className="p-3 bg-white border border-medical-100 rounded-full text-navy-dark hover:bg-medical-700 hover:text-white hover:border-transparent transition-all shadow-sm focus:outline-none"
                aria-label="Next Testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 9: WHY TRUST DR. SHADAB (Stacked reveal on scroll) */}
      <section className="trust-sec relative w-full md:h-screen bg-white border-b border-medical-100 pb-24 md:pb-0">
        <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center overflow-hidden px-6 md:px-12 py-16 md:py-0">
          {/* Dot background */}
          <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 md:items-center">
            {/* Title / Intro */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="text-xs uppercase tracking-widest text-teal-accent font-bold">Why Consult Dr. Shadab?</span>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-navy-dark leading-tight">
                An Ethical Standard of Care
              </h2>
              <p className="text-navy-muted font-light text-sm md:text-base leading-relaxed">
                We design our consulting standards to foster high-integrity conversations, objective guidelines, and supportive follow-ups.
              </p>
            </div>

            {/* Stacking Cards */}
            <div className="lg:col-span-7 relative h-auto md:h-[420px] w-full flex flex-col gap-6 md:block md:gap-0 mt-8 md:mt-0">
              {/* Card 1 */}
              <div className="trust-point-card relative md:absolute w-full p-8 rounded-3xl bg-ivory shadow-lg border border-medical-100 flex flex-col gap-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-medical-50 text-medical-700 border border-medical-200 rounded-full text-[10px] uppercase font-bold tracking-wider w-max">
                  Patient First
                </span>
                <h3 className="font-serif text-xl font-bold text-navy-dark">Compassionate Approach</h3>
                <p className="text-sm font-light text-navy-muted leading-relaxed">
                  Every symptom represents a real person. We dedicate time to listening without interruption, understanding clinical backgrounds, and tailoring diagnostic checklists around patient lifestyle limits.
                </p>
              </div>

              {/* Card 2 */}
              <div className="trust-point-card relative md:absolute w-full p-8 rounded-3xl bg-white shadow-xl border border-medical-100 flex flex-col gap-4 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-accent border border-teal-200 rounded-full text-[10px] uppercase font-bold tracking-wider w-max">
                  Education
                </span>
                <h3 className="font-serif text-xl font-bold text-navy-dark">Patient Education</h3>
                <p className="text-sm font-light text-navy-muted leading-relaxed">
                  We reject clinical obscurity. Our consultations verify that patients understand their diagnoses, the biological causes, and the exact clinical rationale behind prescriptions or lab schedules.
                </p>
              </div>

              {/* Card 3 */}
              <div className="trust-point-card relative md:absolute w-full p-8 rounded-3xl bg-ivory shadow-xl border border-medical-100 flex flex-col gap-4 z-30">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-medical-50 text-medical-700 border border-medical-200 rounded-full text-[10px] uppercase font-bold tracking-wider w-max">
                  Integrity
                </span>
                <h3 className="font-serif text-xl font-bold text-navy-dark">Ethical Practice</h3>
                <p className="text-sm font-light text-navy-muted leading-relaxed">
                  Zero unnecessary prescriptions or lab checks. We prescribe therapies strictly aligned with established evidence-based medicine guidelines, prioritizing cost efficiency and long-term health.
                </p>
              </div>

              {/* Card 4 */}
              <div className="trust-point-card relative md:absolute w-full p-8 rounded-3xl bg-white shadow-2xl border border-medical-100 flex flex-col gap-4 z-45">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-accent border border-teal-200 rounded-full text-[10px] uppercase font-bold tracking-wider w-max">
                  Personalized
                </span>
                <h3 className="font-serif text-xl font-bold text-navy-dark">Personalized Guidance</h3>
                <p className="text-sm font-light text-navy-muted leading-relaxed">
                  There are no cookie-cutter therapies. We examine occupational profiles, genetic risks, nutritional preferences, and stress factors to craft custom medical and physical recommendations.
                </p>
              </div>

              {/* Card 5 */}
              <div className="trust-point-card relative md:absolute w-full p-8 rounded-3xl bg-medical-950 text-white shadow-2xl border border-medical-900 flex flex-col gap-4 z-50">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-500/20 text-teal-accent border border-teal-800 rounded-full text-[10px] uppercase font-bold tracking-wider w-max">
                  Modern Medicine
                </span>
                <h3 className="font-serif text-xl font-bold text-white">Modern Healthcare Perspective</h3>
                <p className="text-sm font-light text-slate-300 leading-relaxed">
                  Leveraging evidence-based insights and interactive digital consultations, Dr. Shadab facilitates continuous, secure feedback loops between the patient and the physician.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: BOOK CONSULTATION (Interactive Form) */}
      <section id="booking-section" className="px-6 md:px-12 py-24 bg-ivory relative">
        {/* Glow decoration */}
        <div className="absolute top-[20%] right-[5%] w-[30vw] h-[30vw] rounded-full bg-medical-100/50 blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto scroll-reveal">
          <div className="glass-premium p-8 md:p-12 rounded-[40px] shadow-2xl border border-medical-100 relative overflow-hidden bg-white/80">
            {/* Header within card */}
            <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-teal-accent font-bold">Secure Appointment Scheduling</span>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-navy-dark leading-tight">
                Request an Consultation
              </h2>
              <p className="text-navy-muted text-sm font-light leading-relaxed">
                Provide details below. Dr. Shadab's coordinator will review the booking and confirm schedules via your provided contacts.
              </p>
            </div>

            {formSuccess ? (
              // Success Screen with GSAP reveal structure
              <div className="flex flex-col items-center text-center py-12 px-6 bg-medical-50/50 border border-medical-200 rounded-3xl animate-fade-in gap-5">
                <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-navy-dark">
                  Appointment Request Sent!
                </h3>
                <p className="text-sm text-navy-muted max-w-md font-light leading-relaxed">
                  Thank you for placing your trust. An email summary has been sent. Our coordination team will reach out to confirm clinical slots within 12 hours.
                </p>
                <button
                  onClick={() => setFormSuccess(false)}
                  className="mt-4 px-6 py-2 border border-medical-200 hover:bg-medical-50 text-medical-700 rounded-full text-xs font-semibold transition-colors"
                >
                  Schedule Another Request
                </button>
              </div>
            ) : (
              // Interactive Consultation Form
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-navy-muted tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full px-4 py-3 bg-ivory border ${
                        formErrors.name ? "border-red-400 focus:ring-red-300" : "border-medical-200 focus:ring-medical-400"
                      } rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all`}
                    />
                    {formErrors.name && (
                      <span className="text-xs text-red-500 font-semibold">{formErrors.name}</span>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold text-navy-muted tracking-wide">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      className={`w-full px-4 py-3 bg-ivory border ${
                        formErrors.phone ? "border-red-400 focus:ring-red-300" : "border-medical-200 focus:ring-medical-400"
                      } rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all`}
                    />
                    {formErrors.phone && (
                      <span className="text-xs text-red-500 font-semibold">{formErrors.phone}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label htmlFor="email" className="text-xs font-semibold text-navy-muted tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. rahul@example.com"
                      className={`w-full px-4 py-3 bg-ivory border ${
                        formErrors.email ? "border-red-400 focus:ring-red-300" : "border-medical-200 focus:ring-medical-400"
                      } rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all`}
                    />
                    {formErrors.email && (
                      <span className="text-xs text-red-500 font-semibold">{formErrors.email}</span>
                    )}
                  </div>

                  {/* Age Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="age" className="text-xs font-semibold text-navy-muted tracking-wide">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="e.g. 28"
                      min="1"
                      className={`w-full px-4 py-3 bg-ivory border ${
                        formErrors.age ? "border-red-400 focus:ring-red-300" : "border-medical-200 focus:ring-medical-400"
                      } rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all`}
                    />
                    {formErrors.age && (
                      <span className="text-xs text-red-500 font-semibold">{formErrors.age}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Concern Selection */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="concern" className="text-xs font-semibold text-navy-muted tracking-wide">
                      Primary Consultation Focus
                    </label>
                    <select
                      id="concern"
                      name="concern"
                      value={formData.concern}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-ivory border border-medical-200 focus:ring-medical-400 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                    >
                      <option value="General Consultation">General Medical Consultation</option>
                      <option value="Preventive Health">Preventive Health Guidance</option>
                      <option value="Lifestyle Counseling">Lifestyle & Wellness Counseling</option>
                      <option value="Chronic Care Risk">Chronic Risk Assessment</option>
                      <option value="Online Guidance">Online Medical Guidance</option>
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="date" className="text-xs font-semibold text-navy-muted tracking-wide">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-ivory border ${
                        formErrors.date ? "border-red-400 focus:ring-red-300" : "border-medical-200 focus:ring-medical-400"
                      } rounded-xl text-sm font-medium focus:outline-none focus:ring-2 transition-all`}
                    />
                    {formErrors.date && (
                      <span className="text-xs text-red-500 font-semibold">{formErrors.date}</span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-4 bg-medical-700 hover:bg-medical-800 text-white rounded-2xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                  {formSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Request...</span>
                    </>
                  ) : (
                    <>
                      <Calendar size={18} />
                      <span>Submit Secure Appointment Request</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 11: CONTACT SECTION */}
      <section className="px-6 md:px-12 py-24 bg-white border-t border-medical-100 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 flex flex-col gap-6 scroll-reveal">
            <span className="text-xs uppercase tracking-widest text-teal-accent font-bold">Contact Details</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-navy-dark leading-tight">
              Get in Touch
            </h2>
            <p className="text-navy-muted font-light leading-relaxed text-sm md:text-base">
              For patient care questions, schedule changes, or health awareness inquiries, reach out using the secure communication lines below.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-medical-50 text-medical-700 rounded-xl border border-medical-100 shrink-0">
                  <Mail size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Inquiry</span>
                  <a href="mailto:consult@drshadab.com" className="text-navy-dark font-medium hover:text-medical-600 transition-colors">
                    consult@drshadab.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-medical-50 text-medical-700 rounded-xl border border-medical-100 shrink-0">
                  <Phone size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Clinic Helpline</span>
                  <a href="tel:+919876543210" className="text-navy-dark font-medium hover:text-medical-600 transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-medical-50 text-medical-700 rounded-xl border border-medical-100 shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location Campus</span>
                  <span className="text-navy-dark font-medium leading-relaxed">
                    PIMS Campus, Highway Route, Lucknow, UP, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Placeholder */}
          <div className="lg:col-span-7 scroll-reveal">
            <div className="h-[380px] md:h-[450px] w-full rounded-3xl bg-ivory border border-medical-100 shadow-xl overflow-hidden relative flex flex-col items-center justify-center p-8 text-center gap-4 group hover:shadow-2xl transition-all duration-300">
              {/* Subtle map graphics grid */}
              <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-40"></div>
              
              {/* Radial gradient representing a pin beacon */}
              <div className="w-16 h-16 rounded-full bg-medical-100 border border-medical-200 flex items-center justify-center text-medical-700 relative z-10 animate-bounce">
                <MapPin size={28} />
              </div>
              
              <div className="relative z-10 max-w-sm">
                <h3 className="font-serif text-lg font-bold text-navy-dark mb-1">
                  Prasad Institute of Medical Sciences
                </h3>
                <p className="text-xs text-navy-muted font-light leading-relaxed">
                  Located conveniently on the Lucknow corridor. Ample parking space, full diagnostic labs, and comprehensive emergency triage support.
                </p>
                <div className="mt-4 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-medical-700 border border-medical-200 rounded-full text-xs font-semibold cursor-pointer shadow-sm hover:bg-medical-50 transition-colors">
                    Open Google Maps <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
