import Link from "next/link";
import { Mail, Phone, MapPin, Heart, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-medical-950 text-slate-300 border-t border-medical-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand & Credential Column */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-3xl font-bold tracking-tight text-white">
              Dr. Shadab
            </span>
            <span className="text-xs uppercase tracking-widest text-teal-accent font-medium mt-1">
              MBBS Graduate • General Consultant
            </span>
          </Link>
          <p className="text-sm font-light text-slate-400 leading-relaxed mt-2">
            Providing evidence-based medical consultations and personalized health guidance. An alumnus of the Prasad Institute of Medical Sciences, Lucknow.
          </p>
          <div className="flex flex-col gap-2.5 mt-2 text-sm text-slate-400">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-teal-accent shrink-0" />
              <span>Lucknow, Uttar Pradesh, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-teal-accent shrink-0" />
              <a href="tel:+919876543210" className="hover:text-white transition-colors">
                +91 98765 43210
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-teal-accent shrink-0" />
              <a href="mailto:consult@drshadab.com" className="hover:text-white transition-colors">
                consult@drshadab.com
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-serif text-lg text-white font-medium mb-6">
            Quick Navigation
          </h4>
          <nav className="flex flex-col gap-3 text-sm">
            <Link href="/" className="hover:text-teal-accent hover:translate-x-1 transition-all flex items-center gap-1.5">
              Home
            </Link>
            <Link href="/about" className="hover:text-teal-accent hover:translate-x-1 transition-all flex items-center gap-1.5">
              About the Doctor
            </Link>
            <Link href="/services" className="hover:text-teal-accent hover:translate-x-1 transition-all flex items-center gap-1.5">
              Medical Services
            </Link>
            <Link href="/resources" className="hover:text-teal-accent hover:translate-x-1 transition-all flex items-center gap-1.5">
              Health Awareness Hub
            </Link>
            <Link href="/booking" className="hover:text-teal-accent hover:translate-x-1 transition-all flex items-center gap-1.5">
              Book Appointment
            </Link>
            <Link href="/contact" className="hover:text-teal-accent hover:translate-x-1 transition-all flex items-center gap-1.5">
              Contact & Location
            </Link>
          </nav>
        </div>

        {/* Services Column */}
        <div>
          <h4 className="font-serif text-lg text-white font-medium mb-6">
            Consultation Focus
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-slate-400">
            <li>General Medical Consultation</li>
            <li>Preventive Health Guidance</li>
            <li>Lifestyle & Wellness Counseling</li>
            <li>Chronic Disease Risk Assessments</li>
            <li>Regular Follow-up Consultations</li>
            <li>Telemedicine & Online Guidance</li>
          </ul>
        </div>

        {/* Disclaimer & Emergency Statement */}
        <div className="flex flex-col gap-4">
          <h4 className="font-serif text-lg text-white font-medium">
            Important Information
          </h4>
          <div className="p-4 bg-medical-900/60 rounded-xl border border-medical-800 text-xs leading-relaxed text-slate-400">
            <span className="font-semibold text-white block mb-1">
              Medical Disclaimer:
            </span>
            This platform facilitates appointment scheduling and educational outreach. The information shared on this website does not substitute professional diagnostic checks. In case of emergencies, please call emergency services or proceed to the nearest hospital immediately.
          </div>
          <Link
            href="/booking"
            className="inline-flex items-center gap-1 text-sm font-semibold text-teal-accent hover:text-white transition-colors"
          >
            <span>Request a Consultation online</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Under-Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-medical-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          &copy; {currentYear} Dr. Shadab. All Rights Reserved. Made for trust and patient acquisition.
        </div>
        <div className="flex items-center gap-1">
          <span>Dedicated to compassionate healthcare</span>
          <Heart size={10} className="text-teal-500 fill-teal-500" />
          <span>and patient education.</span>
        </div>
      </div>
    </footer>
  );
}
