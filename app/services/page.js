"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Stethoscope, 
  ShieldCheck, 
  Activity, 
  FileText, 
  Clock, 
  MessageSquare,
  ArrowRight,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Services() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Title fades
      gsap.fromTo(".fade-in-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.2 }
      );

      // Services Stack Pin
      const serviceCards = gsap.utils.toArray(".service-card");
      if (serviceCards.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".services-list-container",
            start: "top top",
            end: "+=400%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          }
        });

        tl.to({}, { duration: 0.2 });

        serviceCards.forEach((card, index) => {
          if (index === 0) return;
          tl.fromTo(card,
            { yPercent: 120, opacity: 0, scale: 0.95 },
            { yPercent: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
          );
        });
      }

      // Regular scroll reveals for other elements
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

  const servicesDetails = [
    {
      title: "General Medical Consultation",
      description: "Thorough diagnostic evaluations, prescription management, and primary treatment plans for acute and chronic conditions.",
      icon: Stethoscope,
      accent: "from-blue-500/20 to-medical-600/20",
      bullets: [
        "Diagnosis of common acute illnesses (fever, respiratory issues, infections)",
        "Management of ongoing chronic health metrics",
        "Referrals to tertiary specialists where clinically required",
        "Detailed prescription writing and review"
      ],
      target: "Patients experiencing emerging health issues or requiring routine medical reviews."
    },
    {
      title: "Preventive Health Guidance",
      description: "Evidence-based screening schedules, cardiovascular health reviews, and custom immune support strategies.",
      icon: ShieldCheck,
      accent: "from-teal-500/20 to-teal-600/20",
      bullets: [
        "Age-specific screenings (blood pressure, diabetes, lipid panels)",
        "Vaccination guidelines and scheduled boosters",
        "Cardiovascular and respiratory health evaluations",
        "Immune system support strategies"
      ],
      target: "Asymptomatic individuals looking to establish health baselines and prevent future disease."
    },
    {
      title: "Lifestyle Counseling",
      description: "Personalized guidance on diet modification, stress management, metabolic health optimization, and sleep hygiene.",
      icon: Activity,
      accent: "from-indigo-500/20 to-blue-600/20",
      bullets: [
        "Metabolic health reviews and healthy weight maintenance",
        "Nutritional plans focusing on low-glycemic, balanced diets",
        "Stress management protocols and sleep optimization tips",
        "Physical exercise guidelines tailored to your current fitness level"
      ],
      target: "Individuals wanting to resolve fatigue, improve sleep quality, or manage weight metrics."
    },
    {
      title: "Chronic Risk Assessments",
      description: "Comprehensive assessments targeting diabetic risks, hypertension, hyperlipidemia, and family medical histories.",
      icon: FileText,
      accent: "from-medical-600/20 to-teal-500/20",
      bullets: [
        "Detailed family genetic risk factor reviews",
        "Early blood glucose and insulin resistance diagnostics",
        "Lipid ratio analyses and blood pressure monitoring",
        "Personalized strategies to delay or avoid hereditary chronic illness"
      ],
      target: "Patients with family histories of diabetes, hypertension, or cardiovascular complications."
    },
    {
      title: "Follow-up Consultations",
      description: "Structured reviews to adjust treatment schedules, monitor medication compliance, and analyze healing progress.",
      icon: Clock,
      accent: "from-blue-600/20 to-indigo-500/20",
      bullets: [
        "Careful reviews of medication reactions and compliance",
        "Prescription updates and adjustment of doses",
        "Review of recent blood tests or lab results",
        "Step-by-step recovery monitoring"
      ],
      target: "Patients currently on treatment plans who need structure-guided check-ins."
    },
    {
      title: "Online Medical Guidance",
      description: "Premium digital medical reviews and counseling accessible from anywhere, ensuring seamless continuity of care.",
      icon: MessageSquare,
      accent: "from-teal-600/20 to-medical-500/20",
      bullets: [
        "Secure digital consultations from the comfort of home",
        "Second opinions on existing treatment courses",
        "Electronic prescription generation",
        "Pre-travel healthcare advice"
      ],
      target: "Patients seeking remote support, travel advice, or secondary medical reviews."
    }
  ];

  return (
    <div ref={containerRef} className="pt-28 pb-20 bg-ivory">
      {/* Services Header */}
      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto border-b border-medical-100 relative overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-medical-100/30 blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl flex flex-col gap-6 relative z-10">
          <span className="fade-in-title text-xs uppercase tracking-widest text-teal-accent font-bold">
            Consultation Scope
          </span>
          <h1 className="fade-in-title font-serif text-4xl md:text-6xl text-navy-dark font-light leading-tight">
            Comprehensive Healthcare Consulting
          </h1>
          <p className="fade-in-title text-lg md:text-xl text-navy-muted font-light leading-relaxed">
            Professional general medicine consultations, risk checks, and lifestyle counsel built on medical evidence and active listening.
          </p>
        </div>
      </section>

      {/* Services Detail List */}
      <section className="services-list-container relative w-full h-screen bg-ivory/50 border-y border-medical-100 flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 h-[80vh] flex items-center justify-center">
        {servicesDetails.map((service, idx) => {
          const IconComp = service.icon;
          const isEven = idx % 2 === 0;

          return (
            <div 
              key={idx}
              className={`service-card absolute w-full grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 md:p-12 rounded-[40px] bg-white border border-medical-200 shadow-2xl items-center ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
              style={{ zIndex: idx }}
            >
              {/* Icon & Core Detail Column */}
              <div className={`lg:col-span-5 flex flex-col gap-6 ${isEven ? "" : "lg:order-2"}`}>
                <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${service.accent} flex items-center justify-center text-medical-700`}>
                  <IconComp size={28} />
                </div>
                
                <div className="flex flex-col gap-3">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy-dark">
                    {service.title}
                  </h2>
                  <p className="text-sm font-light text-navy-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="p-4 bg-ivory rounded-2xl border border-medical-50 text-xs">
                  <strong className="text-navy-dark font-semibold block mb-1">Target Patients:</strong>
                  <span className="text-navy-muted font-light leading-relaxed">{service.target}</span>
                </div>
              </div>

              {/* Checklist & CTA Column */}
              <div className={`lg:col-span-7 flex flex-col gap-8 ${isEven ? "" : "lg:order-1"}`}>
                <h4 className="text-xs uppercase tracking-wider text-teal-accent font-bold">
                  What is Covered
                </h4>
                
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-navy-muted font-light">
                  {service.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <CheckCircle size={16} className="text-teal-500 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <hr className="border-medical-50" />

                <div className="flex items-center gap-4">
                  <Link
                    href={`/booking?concern=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center gap-1.5 px-6 py-3 bg-medical-700 hover:bg-medical-800 text-white rounded-full text-xs font-semibold shadow-md transition-colors"
                  >
                    <span>Request this consultation</span>
                    <ArrowRight size={14} />
                  </Link>
                  
                  <Link
                    href="/contact"
                    className="text-xs font-semibold text-navy-muted hover:text-medical-600 transition-colors"
                  >
                    Ask a question
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </section>

      {/* Services FAQ Section */}
      <section className="px-6 md:px-12 py-20 bg-white border-t border-medical-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 flex flex-col gap-2 scroll-reveal">
            <span className="text-xs uppercase tracking-widest text-teal-accent font-bold">Clarifications</span>
            <h2 className="font-serif text-3xl font-light text-navy-dark">FAQ: Services</h2>
          </div>

          <div className="flex flex-col gap-6 scroll-reveal">
            <div className="p-6 bg-ivory/60 rounded-2xl border border-medical-50">
              <h4 className="font-serif text-base font-bold text-navy-dark flex items-center gap-2 mb-2">
                <HelpCircle size={18} className="text-teal-accent" />
                How long is a general consultation?
              </h4>
              <p className="text-xs font-light text-navy-muted leading-relaxed pl-7">
                General consultations typically last 20 to 30 minutes. This allows Dr. Shadab to listen to symptoms, understand background contexts, and construct clinical advice without rush.
              </p>
            </div>

            <div className="p-6 bg-ivory/60 rounded-2xl border border-medical-50">
              <h4 className="font-serif text-base font-bold text-navy-dark flex items-center gap-2 mb-2">
                <HelpCircle size={18} className="text-teal-accent" />
                Can I request a digital follow-up after an in-person meeting?
              </h4>
              <p className="text-xs font-light text-navy-muted leading-relaxed pl-7">
                Yes. We encourage remote follow-ups for reviewing reports, adjusting medication schedules, or analyzing recovery progress, allowing you to stay home.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
