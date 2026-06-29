import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SEOJsonLd from "@/components/seo/SEOJsonLd";
import LuxuryHero from "@/components/ui/LuxuryHero";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import TrendingGrid from "@/components/ui/TrendingGrid";

const categories = [
  {
    name: "Banarasi Silk",
    subtitle: "Royal Weaves & Zari Borders",
    image: "/images/hero_banarasi_saree.jpg",
    link: "/catalog?fabric=Banarasi+Silk",
    count: "120+ Designs",
  },
  {
    name: "Bridal Georgette",
    subtitle: "Heavy Handwork & Embroidery",
    image: "/images/category_bridal_georgette.jpg",
    link: "/catalog?category=Bridal+Georgette",
    count: "85+ Designs",
  },
  {
    name: "Silk Cotton",
    subtitle: "Elegant Daily & Festive Comfort",
    image: "/images/category_silk_cotton.jpg",
    link: "/catalog?fabric=Silk+Cotton",
    count: "95+ Designs",
  },
  {
    name: "Designer Lehengas",
    subtitle: "Exquisite Bridal & Party Silhouettes",
    image: "/images/category_lehenga.jpg",
    link: "/catalog?category=Designer+Lehenga",
    count: "60+ Designs",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fbfcfa] text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 transition-colors duration-300">
      {/* SEO Schema Markup */}
      <SEOJsonLd renderOrganization renderLocalBusiness />

      {/* Header Navigation */}
      <Header />

      <main className="flex-grow">
        {/* Luxury Hero Slider */}
        <LuxuryHero />

        {/* Brand Statement Section */}
        <section className="py-16 sm:py-24 px-6 sm:px-12 md:px-20 max-w-5xl mx-auto text-center select-none">
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-heading font-semibold mb-3 block">
            Crafting Heritage
          </span>
          <h2 className="text-2xl sm:text-4xl font-heading font-medium tracking-tight mb-6 leading-tight text-neutral-950 dark:text-white">
            Surat&apos;s Finest Designer Ethnic Wear & Sarees
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 font-body leading-relaxed max-w-3xl mx-auto font-light">
            For decades, Todi Creation has stood as a beacon of artisanal luxury in Surat. 
            We specialize in manufacturing exquisite Banarasi silk sarees, bridal georgettes, 
            and designer lehengas that blend authentic Indian heritage with contemporary fashion sensibilities. 
            Every drape tells a story of meticulous detail and quality craftsmanship.
          </p>
        </section>

        {/* Featured Categories Section */}
        <section className="py-16 bg-neutral-50 dark:bg-neutral-900/40 border-t border-b border-neutral-100 dark:border-neutral-900 px-6 sm:px-12 md:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
              <div className="select-none">
                <span className="text-xs uppercase tracking-[0.25em] text-primary font-heading font-semibold mb-2 block">
                  Curated Collections
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight text-neutral-950 dark:text-white">
                  Shop by Category
                </h2>
              </div>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold tracking-wider text-primary hover:text-primary-hover dark:hover:text-primary-hover uppercase mt-4 sm:mt-0 transition-colors hover-underline"
              >
                Browse All Collections
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Asymmetric Elegant Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={category.link}
                  className="group relative h-[380px] rounded-xl overflow-hidden shadow-luxury hover-lift cursor-pointer flex flex-col justify-end p-6 border border-neutral-200/20 dark:border-neutral-800/20 bg-neutral-900"
                >
                  {/* Category Image */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-60 transition-all duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  
                  {/* Glassmorphic Card Overlay for Content */}
                  <div className="relative z-10 glass-card bg-white/10 dark:bg-black/25 backdrop-blur-md border-white/20 dark:border-white/10 p-5 rounded-lg select-none">
                    <span className="text-[10px] font-heading font-medium tracking-widest text-primary uppercase block mb-1">
                      {category.count}
                    </span>
                    <h3 className="text-base font-heading font-semibold text-white tracking-wide mb-1">
                      {category.name}
                    </h3>
                    <p className="text-[11px] font-body text-neutral-300 font-light line-clamp-1">
                      {category.subtitle}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products Section */}
        <section className="py-16 sm:py-24 px-6 sm:px-12 md:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
              <div className="select-none">
                <span className="text-xs uppercase tracking-[0.25em] text-primary font-heading font-semibold mb-2 block">
                  Customer Favorites
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight text-neutral-950 dark:text-white">
                  Trending Sarees & Lehengas
                </h2>
              </div>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold tracking-wider text-primary hover:text-primary-hover dark:hover:text-primary-hover uppercase mt-4 sm:mt-0 transition-colors hover-underline"
              >
                View Catalog
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trending Products Grid (Interactive Component) */}
            <TrendingGrid />
          </div>
        </section>
      </main>

      {/* Footer Navigation */}
      <Footer />
    </div>
  );
}
