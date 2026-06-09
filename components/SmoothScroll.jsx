"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function SmoothScroll({ children }) {
  const [loading, setLoading] = useState(true);
  const progressBarRef = useRef(null);
  const loaderRef = useRef(null);
  const loaderTextRef = useRef(null);
  const mainContentRef = useRef(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger on client side
    gsap.registerPlugin(ScrollTrigger);

    // 1. Initial Loading Screen Animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setLoading(false);
          // Trigger ScrollTrigger refresh once loading overlay is gone
          ScrollTrigger.refresh();
        }
      });

      tl.to(loaderTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .to(loaderTextRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        delay: 0.8,
        ease: "power3.in"
      })
      .to(loaderRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.8,
        ease: "power4.inOut"
      });
    });

    // 2. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Connect Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 3. Scroll Progress Indicator Animation
    gsap.to(progressBarRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Store lenis globally for potential access (like scroll-to buttons)
    window.lenis = lenis;

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      // Clean up window reference
      delete window.lenis;
    };
  }, []);

  return (
    <>
      {/* Premium Loader Screen */}
      <div
        ref={loaderRef}
        className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-medical-950 text-ivory select-none"
        style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      >
        <div className="text-center px-6">
          <div
            ref={loaderTextRef}
            className="opacity-0 translate-y-8 flex flex-col items-center gap-4"
          >
            <span className="text-sm tracking-widest text-teal-accent uppercase font-medium">
              Medical Consultation & Care
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light">
              Dr. Shadab
            </h1>
            <div className="w-16 h-px bg-medical-200 mt-2"></div>
            <p className="text-xs text-medical-200 font-light mt-1 uppercase tracking-wider">
              MBBS Graduate, Prasad Institute of Medical Sciences
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-medical-600 to-teal-accent z-50 origin-left scale-x-0"
      ></div>

      {/* Main App Container */}
      <div
        ref={mainContentRef}
        className={`flex flex-col min-h-screen ${loading ? "overflow-hidden h-screen" : ""}`}
      >
        {children}
      </div>
    </>
  );
}
