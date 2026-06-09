import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Dr. Shadab | Modern Digital Healthcare Consultation & Guidance",
  description: "Consult Dr. Shadab (MBBS, Prasad Institute of Medical Sciences, Lucknow) for evidence-based medical consultation, preventive healthcare, and personalized lifestyle counseling.",
  keywords: [
    "Dr. Shadab", 
    "Dr. Shadab MBBS", 
    "Prasad Institute of Medical Sciences", 
    "Lucknow doctor", 
    "online medical consultation", 
    "preventive health doctor", 
    "lifestyle counseling", 
    "general physician Lucknow"
  ],
  authors: [{ name: "Dr. Shadab", url: "https://drshadab.com" }],
  creator: "Dr. Shadab",
  metadataBase: new URL("https://drshadab.com"),
  openGraph: {
    title: "Dr. Shadab | Modern Digital Healthcare Consultation & Guidance",
    description: "Book professional, compassionate consultation with Dr. Shadab, MBBS. Personalized general medicine, lifestyle counseling, and preventive health guides.",
    url: "https://drshadab.com",
    siteName: "Dr. Shadab Healthcare",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Shadab | Premium Digital Healthcare Platform",
    description: "Compassionate, professional medical guidance by Dr. Shadab, MBBS.",
  },
};

// Physician and Local Business Schema Markup
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Shadab",
  "image": "https://drshadab.com/logo.png",
  "medicalSpecialty": [
    "GeneralMedicine",
    "PreventiveMedicine",
    "LifestyleMedicine"
  ],
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Prasad Institute of Medical Sciences, Lucknow"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "PIMS Lucknow Campus",
    "addressLocality": "Lucknow",
    "addressRegion": "Uttar Pradesh",
    "addressCountry": "IN"
  },
  "description": "Dr. Shadab is an MBBS Graduate dedicated to helping patients make informed healthcare decisions through compassionate medical consultation and preventive health counseling.",
  "knowsAbout": ["General Medical Consultation", "Preventive Health Guidance", "Lifestyle Counseling", "Health Assessments", "Follow-up Consultations", "Online Medical Guidance"],
  "telephone": "+91-XXXXXXXXXX",
  "priceRange": "$$"
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ivory text-navy-dark font-sans selection:bg-medical-200 selection:text-medical-950">
        <SmoothScroll>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
