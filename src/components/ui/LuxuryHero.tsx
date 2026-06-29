"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface Slide {
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  link: string;
}

const slides: Slide[] = [
  {
    title: "Exquisite Banarasi Silk",
    subtitle: "Timeless heritage hand-woven in pure silk and metallic gold zari.",
    image: "/images/hero_banarasi_saree.jpg",
    ctaText: "Explore Collection",
    link: "/catalog?fabric=Banarasi+Silk",
  },
  {
    title: "Bridal Georgette Elegance",
    subtitle: "Intricate hand embroidery and luxurious drapes for your special day.",
    image: "/images/category_bridal_georgette.jpg",
    ctaText: "View Bridal Wear",
    link: "/catalog?category=Bridal+Georgette",
  },
  {
    title: "Designer Lehengas",
    subtitle: "Contemporary silhouettes blended with traditional Surat craftsmanship.",
    image: "/images/category_lehenga.jpg",
    ctaText: "Discover Lehengas",
    link: "/catalog?category=Designer+Lehenga",
  },
];

export default function LuxuryHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Swipe gesture detection
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Autoplay functionality
  useEffect(() => {
    if (autoplay) {
      autoplayTimerRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay, currentSlide]);

  // GSAP animations for transitions
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entry for copy elements
      gsap.fromTo(
        [titleRef.current, subtitleRef.current, buttonRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      // Ken Burns zoom-out effect on the image
      if (imageContainerRef.current) {
        gsap.fromTo(
          imageContainerRef.current,
          { scale: 1.08 },
          {
            scale: 1,
            duration: 6,
            ease: "power1.out",
          }
        );
      }
    });

    return () => ctx.revert();
  }, [currentSlide]);

  // Pause autoplay on user touch/drag/button interaction
  const stopAutoplayTemporarily = () => {
    setAutoplay(false);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    stopAutoplayTemporarily();
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div
      className="relative w-full h-[65vh] sm:h-[80vh] md:h-[90vh] bg-neutral-950 overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Background Images */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {index === currentSlide && (
              <div ref={imageContainerRef} className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />
                {/* Elegant overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/40 to-transparent sm:bg-gradient-to-t sm:from-neutral-950/90 sm:via-neutral-950/50 sm:to-neutral-950/20" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Copy & Navigation Overlay Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-16 sm:pb-24 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl text-left text-neutral-50">
          <div className="overflow-hidden mb-2">
            <span className="inline-block text-xs uppercase tracking-[0.25em] text-primary font-heading font-semibold">
              Todi Creation Surat
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-3xl sm:text-5xl md:text-6xl font-heading font-medium tracking-tight mb-4 leading-tight sm:leading-none text-white"
          >
            {slides[currentSlide].title}
          </h1>

          <p
            ref={subtitleRef}
            className="text-sm sm:text-base md:text-lg font-body text-neutral-300 mb-8 max-w-lg leading-relaxed font-light"
          >
            {slides[currentSlide].subtitle}
          </p>

          <div ref={buttonRef}>
            <Link
              href={slides[currentSlide].link}
              onClick={stopAutoplayTemporarily}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary hover:text-white bg-transparent hover:bg-primary rounded-full transition-all duration-300 font-heading text-sm uppercase tracking-wider font-semibold hover-lift active-press"
            >
              {slides[currentSlide].ctaText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Clickable Overlay Navigation Arrows - Hidden on small devices for clean aesthetics, visible on md+ */}
      <div className="hidden md:block absolute inset-y-0 left-6 z-30 flex items-center">
        <button
          onClick={() => {
            stopAutoplayTemporarily();
            prevSlide();
          }}
          className="p-3 bg-neutral-900/30 hover:bg-neutral-900/60 border border-white/10 rounded-full text-white/70 hover:text-white backdrop-blur-sm transition-all hover-scale active-press"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="hidden md:block absolute inset-y-0 right-6 z-30 flex items-center">
        <button
          onClick={() => {
            stopAutoplayTemporarily();
            nextSlide();
          }}
          className="p-3 bg-neutral-900/30 hover:bg-neutral-900/60 border border-white/10 rounded-full text-white/70 hover:text-white backdrop-blur-sm transition-all hover-scale active-press"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumb-reachable indicators dots at the bottom center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              stopAutoplayTemporarily();
              setCurrentSlide(index);
            }}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentSlide
                ? "w-8 bg-primary"
                : "w-2.5 bg-neutral-500 hover:bg-neutral-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
