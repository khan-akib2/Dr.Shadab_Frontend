"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Award, ShieldCheck, Heart, Users, BookOpen, ArrowRight, Activity, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade in page title elements
      gsap.fromTo(".fade-in-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.2 }
      );

      // Scrollytelling for About Biography
      const aboutFrames = gsap.utils.toArray(".about-frame");
      if (aboutFrames.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".about-split-sec",
            start: "center center",
            end: "+=200%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          }
        });

        tl.to({}, { duration: 0.2 });

        aboutFrames.forEach((frame, index) => {
          if (index === 0) return;
          
          const prevFrame = aboutFrames[index - 1];
          const currentChildren = Array.from(frame.children);

          tl.to(prevFrame, {
            opacity: 0,
            y: -30,
            duration: 1,
            ease: "power2.inOut"
          }, `transition-${index}`);

          tl.fromTo(frame,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.1 },
            `transition-${index}`
          );

          tl.fromTo(currentChildren,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power2.out" },
            `transition-${index}`
          );

          tl.to({}, { duration: 0.5 });
        });
      }

      // Timeline Stagger
      gsap.fromTo(".timeline-milestone",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 80%",
          }
        }
      );

      // Scroll reveals for cards and timeline blocks
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

  const coreValues = [
    {
      title: "Evidence-Based Guidance",
      description: "Every diagnosis and therapeutic recommendation is rooted in verified scientific research, peer-reviewed medical publications, and modern global protocols.",
      icon: ShieldCheck,
    },
    {
      title: "Active Listening",
      description: "We allocate generous consult times to let you fully describe your symptoms, timeline, and emotional stressors, ensuring no vital detail is overlooked.",
      icon: Heart,
    },
    {
      title: "Clear Medical Language",
      description: "No confusing clinical jargon. We explain what is happening inside your body using simplified terms, clear charts, and practical action plans.",
      icon: BookOpen,
    },
    {
      title: "Proactive Prevention",
      description: "We focus heavily on identifying risk markers early, using lifestyle modification protocols to control chronic risks before diseases develop.",
      icon: Activity,
    }
  ];

  return (
    <div ref={containerRef} className="pt-28 pb-20 bg-ivory">
      {/* Intro Hero banner */}
      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto border-b border-medical-100 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-[10%] right-[5%] w-[30vw] h-[30vw] rounded-full bg-medical-100/40 blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl flex flex-col gap-6 relative z-10">
          <span className="fade-in-title text-xs uppercase tracking-widest text-teal-accent font-bold">
            Meet the Doctor
          </span>
          <h1 className="fade-in-title font-serif text-4xl md:text-6xl text-navy-dark font-light leading-tight">
            Compassionate Medical Guidance & Clinical Excellence
          </h1>
          <p className="fade-in-title text-lg md:text-xl text-navy-muted font-light leading-relaxed">
            Dr. Shadab is an MBBS Graduate dedicated to helping patients make informed healthcare decisions through patient-centric consulting.
          </p>
        </div>
      </section>

      {/* Main Biography split Section */}
      <section className="about-split-sec px-6 md:px-12 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative bg-ivory">
        {/* Academic Profile details */}
        <div className="lg:col-span-5 flex flex-col gap-8 scroll-reveal relative">
          <div className="p-8 rounded-3xl bg-white shadow-xl border border-medical-100 flex flex-col gap-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-medical-50 rounded-bl-3xl flex items-center justify-center">
              <Award size={30} className="text-medical-700" />
            </div>
            
            <h3 className="font-serif text-2xl font-bold text-navy-dark">Clinical Profile</h3>
            
            <div className="flex flex-col gap-4 text-sm text-navy-muted">
              <div>
                <span className="font-semibold text-navy-dark block">Graduation Degree:</span>
                <span className="font-light">MBBS (Bachelor of Medicine, Bachelor of Surgery)</span>
              </div>
              <hr className="border-medical-50" />
              <div>
                <span className="font-semibold text-navy-dark block">Medical Academy:</span>
                <span className="font-light">Prasad Institute of Medical Sciences, Lucknow</span>
              </div>
              <hr className="border-medical-50" />
              <div>
                <span className="font-semibold text-navy-dark block">Specialty Focus:</span>
                <span className="font-light">General Medicine, Preventive Health Reviews, Metabolic Optimization & Lifestyle Adjustments</span>
              </div>
              <hr className="border-medical-50" />
              <div>
                <span className="font-semibold text-navy-dark block">Language Fluency:</span>
                <span className="font-light">English, Hindi</span>
              </div>
            </div>
            
            <div className="mt-2 p-4 bg-teal-50/50 border border-teal-150 rounded-2xl flex items-center gap-3">
              <ShieldCheck className="text-teal-accent shrink-0" size={20} />
              <span className="text-xs text-navy-muted font-medium">
                Accredited Practitioner and Registered Physician
              </span>
            </div>
          </div>
        </div>

        {/* Narrative Narrative Scrollytelling Frames */}
        <div className="lg:col-span-7 relative h-[60vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
          {/* Frame 1 */}
          <div className="about-frame absolute inset-0 flex flex-col gap-6 text-navy-muted font-light leading-relaxed text-base md:text-lg justify-center">
            <h2 className="font-serif text-3xl md:text-4xl text-navy-dark font-semibold">
              Reassuring Patient Consultation
            </h2>
            <p>
              Healthcare is more than writing prescriptions. To Dr. Shadab, it is about creating a secure, comforting clinical space where patient worries are met with active listening and diagnostic accuracy.
            </p>
          </div>

          {/* Frame 2 */}
          <div className="about-frame absolute inset-0 flex flex-col gap-6 text-navy-muted font-light leading-relaxed text-base md:text-lg justify-center opacity-0 translate-y-12">
            <h2 className="font-serif text-3xl md:text-4xl text-navy-dark font-semibold">
              Bridging the Gap
            </h2>
            <p>
              During his clinical education and subsequent practice at the <strong>Prasad Institute of Medical Sciences, Lucknow</strong>, Dr. Shadab experienced firsthand how confusion blocks healing. Patients who are overwhelmed by online search findings or hurried clinic visits struggle to follow medical plans.
            </p>
          </div>

          {/* Frame 3 */}
          <div className="about-frame absolute inset-0 flex flex-col gap-6 text-navy-muted font-light leading-relaxed text-base md:text-lg justify-center opacity-0 translate-y-12">
            <h2 className="font-serif text-3xl md:text-4xl text-navy-dark font-semibold">
              Evidence-Based Paths
            </h2>
            <p>
              By dedicating his practice to digital healthcare consultation and health education, Dr. Shadab bridges the gap between scientific medical guidelines and practical home routines. Whether you require a general health check, lifestyle counsel, or chronic disease guidance, Dr. Shadab provides evidence-based paths to wellness.
            </p>
            
            <div className="mt-4 pt-6 border-t border-medical-100">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-8 py-4 bg-medical-700 hover:bg-medical-800 text-white rounded-full text-sm font-semibold shadow-md transition-colors"
              >
                <span>Schedule a consultation</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Medical Values Section */}
      <section className="px-6 md:px-12 py-20 bg-white border-t border-b border-medical-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3 scroll-reveal">
            <span className="text-xs uppercase tracking-widest text-teal-accent font-bold">Standard of Excellence</span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-navy-dark">
              Clinical Core Principles
            </h2>
            <p className="text-navy-muted font-light text-sm">
              Our clinical approach is built on trust, transparency, and scientific objectivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div 
                  key={idx}
                  className="scroll-reveal p-6 rounded-2xl bg-ivory/50 border border-medical-100 flex flex-col gap-4 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-medical-50 text-medical-700 flex items-center justify-center shrink-0">
                    <IconComp size={20} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-navy-dark">{val.title}</h3>
                  <p className="text-xs text-navy-muted leading-relaxed font-light">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Academic timeline summary */}
      <section className="px-6 md:px-12 py-20 max-w-5xl mx-auto">
        <div className="text-center mb-16 flex flex-col gap-2 scroll-reveal">
          <span className="text-xs uppercase tracking-widest text-teal-accent font-bold">Chronology</span>
          <h2 className="font-serif text-3xl font-light text-navy-dark">Education & Background</h2>
        </div>

        <div className="timeline-container flex flex-col gap-8 relative before:absolute before:left-4 md:before:left-1/2 before:top-0 before:bottom-0 before:w-0.5 before:bg-medical-100">
          {/* Milestone 1 */}
          <div className="timeline-milestone flex flex-col md:flex-row relative pl-12 md:pl-0 md:justify-between items-start md:items-center">
            {/* Center dot */}
            <div className="absolute left-3 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-teal-accent border-4 border-white shadow"></div>
            
            <div className="w-full md:w-[45%] md:text-right">
              <span className="text-xs font-semibold text-teal-accent uppercase">Medical Graduation</span>
              <h3 className="font-serif text-lg font-bold text-navy-dark mt-1">MBBS Degree</h3>
            </div>
            <div className="w-full md:w-[45%] mt-2 md:mt-0 p-4 bg-white rounded-2xl border border-medical-100 shadow-sm text-xs font-light text-navy-muted">
              Completed professional MBBS curriculum including pathology, biochemistry, pharmacology, obstetrics, pediatrics, and general medicine.
            </div>
          </div>

          {/* Milestone 2 */}
          <div className="timeline-milestone flex flex-col md:flex-row relative pl-12 md:pl-0 md:justify-between items-start md:items-center">
            {/* Center dot */}
            <div className="absolute left-3 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-teal-accent border-4 border-white shadow"></div>
            
            <div className="w-full md:w-[45%] md:order-2 md:text-left">
              <span className="text-xs font-semibold text-teal-accent uppercase">Prasad Institute</span>
              <h3 className="font-serif text-lg font-bold text-navy-dark mt-1">Clinical Rotations</h3>
            </div>
            <div className="w-full md:w-[45%] md:order-1 mt-2 md:mt-0 p-4 bg-white rounded-2xl border border-medical-100 shadow-sm text-xs font-light text-navy-muted md:text-right">
              Gained practical experience through rigorous clinical rotations at Prasad Institute of Medical Sciences, Lucknow. Evaluated acute issues and participated in outpatient clinics.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
