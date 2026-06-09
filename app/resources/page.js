"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Search, 
  ArrowRight, 
  HelpCircle, 
  Plus, 
  Minus, 
  CheckCircle2, 
  XCircle, 
  Bookmark,
  Activity,
  Heart,
  ShieldAlert
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Resources() {
  const containerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Title fades
      gsap.fromTo(".fade-in-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.2 }
      );

      // 3D Article Grid Reveal
      gsap.fromTo(".article-card",
        { opacity: 0, y: 50, rotationX: -15, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".article-grid",
            start: "top 80%",
          }
        }
      );

      // FAQ Stagger
      gsap.fromTo(".faq-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-container",
            start: "top 85%",
          }
        }
      );

      // Horizontal Scrollytelling for Myths
      const mythsTrack = document.querySelector(".myths-track");
      if (mythsTrack) {
        gsap.to(mythsTrack, {
          x: () => -(mythsTrack.scrollWidth - window.innerWidth + 120),
          ease: "none",
          scrollTrigger: {
            trigger: ".myths-sec",
            start: "top top",
            end: () => `+=${mythsTrack.scrollWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          }
        });
      }

      // Section animations (for generic elements)
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

  const articles = [
    {
      category: "Preventive Healthcare",
      title: "Understanding Hypertension: Practical Dietary Approaches",
      excerpt: "High blood pressure is a silent health hazard. Learn how smart dietary modifications, including sodium regulation and mineral-rich foods, play a critical role in cardiorespiratory stability.",
      content: "Complete guide on blood pressure maintenance, D.A.S.H. eating guidelines, potassium-rich selections, and regular tracking habits.",
      readTime: "5 min read",
      date: "May 28, 2026",
      tags: ["Blood Pressure", "Preventive Health"]
    },
    {
      category: "Healthy Living",
      title: "The Science of Sleep and Metabolic Balance",
      excerpt: "Recent medical reviews highlight a profound connection between circadian rhythms and hormone regulation. Discover tips to synchronize your sleep cycle for healthy metabolic performance.",
      content: "Exploring cortisol schedules, sleep phases, metabolic issues linked to sleep loss, and practical sleep-hygiene rules.",
      readTime: "7 min read",
      date: "May 15, 2026",
      tags: ["Sleep", "Metabolic Health"]
    },
    {
      category: "Myths vs Facts",
      title: "Common Medical Misconceptions in Modern Nutrition",
      excerpt: "Debunking widely believed nutritional myths with peer-reviewed medical evidence. We contrast popular diet trends against actual metabolic requirements.",
      content: "Analyzing carbohydrate misconceptions, calorie density, hydration parameters, and the reality of fad juice cleanses.",
      readTime: "4 min read",
      date: "Apr 30, 2026",
      tags: ["Nutrition", "Evidence-Based"]
    },
    {
      category: "Common Health Concerns",
      title: "Type 2 Diabetes: Early Warnings and Actionable Advice",
      excerpt: "Diabetes starts long before clinical diagnostics signal high glucose. Recognizing insulin resistance signs and adjusting carbohydrate intakes can reverse risk markers.",
      content: "Understanding prediabetes markers, glycemic loads, active recovery routines, and scheduling preventive check-ups.",
      readTime: "6 min read",
      date: "Apr 12, 2026",
      tags: ["Diabetes", "Risk Assessment"]
    },
    {
      category: "Preventive Healthcare",
      title: "Routine Medical Screenings for Every Age Group",
      excerpt: "A chronological handbook explaining what blood panels, physical checks, and diagnostics you need during your 20s, 30s, 40s, and beyond.",
      content: "Listing critical checkpoints for heart, metabolic health, bone densities, and vaccine updates.",
      readTime: "8 min read",
      date: "Mar 25, 2026",
      tags: ["Screenings", "Age Guidelines"]
    },
    {
      category: "Healthy Living",
      title: "Cardiorespiratory Fitness: Minimums for Longevity",
      excerpt: "Clinical research confirms that simple daily movement cycles reduce cardiovascular complications. Here are the target zone levels and weekly durations to aim for.",
      content: "Defining zone 2 cardio parameters, strength maintenance goals, and simple ways to monitor heart rate averages.",
      readTime: "5 min read",
      date: "Mar 10, 2026",
      tags: ["Fitness", "Cardiovascular"]
    }
  ];

  const mythsVsFacts = [
    {
      myth: "Eating fat is the primary cause of weight gain and high blood cholesterol.",
      fact: "Healthy dietary fats (monounsaturated/polyunsaturated) are essential for hormone generation and cell integrity. The primary driver of elevated blood cholesterol and weight gain is highly refined carbohydrates and trans fats.",
      category: "Nutrition"
    },
    {
      myth: "Antibiotics are effective for curing severe flu and common colds.",
      fact: "Antibiotics kill bacteria, not viruses. Colds, flus, and respiratory infections are viral. Overusing antibiotics leads to dangerous bacterial resistance and ruins intestinal microbiota.",
      category: "Medication"
    },
    {
      myth: "You should wait until you feel sick to consult a doctor.",
      fact: "Preventive health screenings capture chronic risk markers (hypertension, diabetes) when they are completely asymptomatic and easy to reverse. Waiting for symptoms often delays critical diagnosis.",
      category: "Healthcare"
    }
  ];

  const faqs = [
    {
      question: "How can I verify if Dr. Shadab's advice is evidence-based?",
      answer: "Dr. Shadab relies on international healthcare guidelines (WHO, ADA, AHA, etc.) and references clinical evidence from peer-reviewed medical publications. Every patient receive clear rationales behind their diagnosis."
    },
    {
      question: "What should I bring to my initial general consultation?",
      answer: "Please gather any recent lab reports (blood panels, urine tests) within the past 6 months, a complete list of active medications/supplements, and a timeline outline of the symptoms you want to target."
    },
    {
      question: "How do I schedule a follow-up consultation?",
      answer: "Follow-up consultations can be booked via our online scheduling page. Choose 'Follow-up' as the consultation focus and input your previous consult date in the comments section."
    },
    {
      question: "Are lifestyle counseling advice custom-tailored?",
      answer: "Absolutely. We do not use generic template plans. Dr. Shadab assesses your daily schedule, stress factors, nutritional tastes, and diagnostic parameters to design practical adjustments."
    }
  ];

  // Filtering articles based on Category & Search
  const filteredArticles = articles.filter(art => {
    const matchesCategory = activeCategory === "All" || art.category === activeCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["All", "Preventive Healthcare", "Healthy Living", "Common Health Concerns", "Myths vs Facts"];

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div ref={containerRef} className="pt-28 pb-20 bg-ivory">
      {/* Resources Header Banner */}
      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto border-b border-medical-100 relative overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-teal-accent/5 blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 relative z-10">
          <div className="max-w-2xl flex flex-col gap-6">
            <span className="fade-in-title text-xs uppercase tracking-widest text-teal-accent font-bold">
              Knowledge Hub
            </span>
            <h1 className="fade-in-title font-serif text-4xl md:text-6xl text-navy-dark font-light leading-tight">
              Health Awareness & Guides
            </h1>
            <p className="fade-in-title text-lg md:text-xl text-navy-muted font-light leading-relaxed">
              Explore medical articles, clarify diagnostic doubts, and review evidence-based facts to take control of your health.
            </p>
          </div>

          {/* Search bar inside header */}
          <div className="fade-in-title w-full lg:w-[320px] relative">
            <input
              type="text"
              placeholder="Search articles, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3.5 bg-white border border-medical-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-medical-400 pl-11 shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          </div>
        </div>
      </section>

      {/* Categories filter and Articles Grid */}
      <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        {/* Category Pill Filters */}
        <div className="flex gap-2.5 pb-6 overflow-x-auto no-scrollbar scroll-reveal">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-medical-700 text-white shadow-md"
                  : "bg-white text-navy-muted border border-medical-100 hover:bg-medical-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Cards Grid */}
        {filteredArticles.length > 0 ? (
          <div className="article-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6" style={{ perspective: "1000px" }}>
            {filteredArticles.map((art, idx) => (
              <div
                key={idx}
                className="article-card group flex flex-col bg-white border border-medical-150 rounded-3xl p-8 hover:shadow-xl hover:border-medical-200 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-wider text-teal-accent font-bold">
                    {art.category}
                  </span>
                  <div className="text-slate-300 hover:text-medical-600 cursor-pointer transition-colors">
                    <Bookmark size={14} />
                  </div>
                </div>
                
                <h3 className="font-serif text-lg font-bold text-navy-dark mb-3 group-hover:text-medical-700 transition-colors leading-snug">
                  {art.title}
                </h3>
                
                <p className="text-xs font-light text-navy-muted leading-relaxed mb-6">
                  {art.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {art.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-medical-50 text-medical-700 text-[10px] rounded-md font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="mt-auto pt-5 border-t border-medical-50 flex items-center justify-between text-xs text-slate-400">
                  <span>{art.date} • {art.readTime}</span>
                  <span className="font-medium text-medical-700 flex items-center gap-1 group-hover:underline cursor-pointer">
                    Read guide <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-medical-100 shadow-sm mt-6 scroll-reveal">
            <BookOpen className="mx-auto text-medical-200 mb-4" size={48} />
            <h3 className="font-serif text-xl font-semibold text-navy-dark mb-1">No articles found</h3>
            <p className="text-xs text-navy-muted font-light">
              Try adjusting your query or selecting another category.
            </p>
          </div>
        )}
      </section>

      {/* SECTION: MEDICAL MYTHS VS FACTS */}
      <section className="myths-sec relative w-full h-screen bg-ivory overflow-hidden border-t border-b border-medical-100">
        <div className="w-full h-full flex flex-col justify-center py-12">
          <div className="max-w-5xl px-6 md:px-12 w-full mx-auto md:mx-12">
            <div className="mb-12 flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-teal-accent font-bold">Evidence vs Misinformation</span>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-navy-dark">
                Medical Myths vs Facts
              </h2>
              <p className="text-navy-muted font-light text-sm">
                Scroll horizontally to debunk common healthcare misconceptions using peer-reviewed scientific studies.
              </p>
            </div>
          </div>

          <div className="myths-track flex gap-8 px-6 md:px-12 w-max">
            {mythsVsFacts.map((item, idx) => (
              <div 
                key={idx}
                className="w-[320px] md:w-[450px] shrink-0 p-8 rounded-3xl bg-white shadow-xl border border-medical-100 flex flex-col gap-6 relative overflow-hidden"
              >
                {/* Category tag */}
                <span className="text-[10px] uppercase tracking-wider text-medical-600 font-bold bg-medical-50 border border-medical-100 px-2 py-0.5 rounded-md w-max">
                  {item.category}
                </span>

                {/* Myth */}
                <div className="flex flex-col gap-2">
                  <span className="text-red-500 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert size={14} /> Myth
                  </span>
                  <p className="text-sm font-semibold text-navy-dark leading-relaxed italic">
                    “{item.myth}”
                  </p>
                </div>

                <hr className="border-medical-50" />

                {/* Fact */}
                <div className="flex flex-col gap-2">
                  <span className="text-teal-accent font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 size={14} /> Clinical Fact
                  </span>
                  <p className="text-xs font-light text-navy-muted leading-relaxed">
                    {item.fact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: INTERACTIVE FAQ ACCORDION */}
      <section className="px-6 md:px-12 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-16 flex flex-col gap-2 scroll-reveal">
          <span className="text-xs uppercase tracking-widest text-teal-accent font-bold">Patient Helpdesk</span>
          <h2 className="font-serif text-3xl font-light text-navy-dark">Frequently Asked Questions</h2>
        </div>

        <div className="faq-container flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isExpanded = expandedFaq === index;
            return (
              <div 
                key={index}
                className="faq-item border border-medical-150 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-serif text-base font-semibold text-navy-dark hover:text-medical-700 transition-colors focus:outline-none"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle size={18} className="text-teal-accent shrink-0" />
                    {faq.question}
                  </span>
                  {isExpanded ? (
                    <Minus size={18} className="text-medical-750 shrink-0" />
                  ) : (
                    <Plus size={18} className="text-medical-750 shrink-0" />
                  )}
                </button>
                
                {/* Accordion body animation */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isExpanded ? "max-h-[250px] border-t border-medical-50 bg-ivory/30" : "max-h-0"
                  }`}
                >
                  <div className="p-6 text-xs md:text-sm text-navy-muted leading-relaxed font-light pl-11">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
