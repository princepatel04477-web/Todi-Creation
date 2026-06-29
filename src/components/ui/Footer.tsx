import React from "react";
import Link from "next/link";
import { Phone, MapPin, Mail, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-lg font-heading font-semibold tracking-[0.25em] text-white">
                TODI CREATION
              </span>
              <div className="text-[9px] font-heading tracking-[0.4em] text-primary uppercase">
                Surat
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-neutral-500 font-light max-w-sm">
              Surat-based manufacturer of premium designer ethnic wear, Banarasi sarees, bridal georgette drapes, and designer lehengas. Crafting heritage into every thread since 1998.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-heading tracking-[0.2em] font-semibold text-white uppercase">
              Collections
            </h3>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/catalog?fabric=Banarasi+Silk" className="hover:text-primary transition-colors">
                  Banarasi Silk Sarees
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Bridal+Georgette" className="hover:text-primary transition-colors">
                  Bridal Georgette
                </Link>
              </li>
              <li>
                <Link href="/catalog?fabric=Silk+Cotton" className="hover:text-primary transition-colors">
                  Silk Cotton Sarees
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=Designer+Lehenga" className="hover:text-primary transition-colors">
                  Designer Lehengas
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-xs font-heading tracking-[0.2em] font-semibold text-white uppercase">
              Customer Area
            </h3>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link href="/catalog" className="hover:text-primary transition-colors">
                  Browse Catalog
                </Link>
              </li>
              <li>
                <Link href="/inquiry-bag" className="hover:text-primary transition-colors">
                  View Inquiry Bag
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-heading tracking-[0.2em] font-semibold text-white uppercase">
              Bespoke Inquiries
            </h3>
            <ul className="space-y-3 text-xs font-light text-neutral-500">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>
                  Ring Road, Surat, Gujarat, 395002, India
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+91-99999-99999</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>contact@todicreation.com</span>
              </li>
              <li>
                <a
                  href="https://wa.me/919999999999?text=Hello%20Todi%20Creation,%20I%20am%20interested%20in%20your%20ethnic%20wear%20collection."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-500 hover:underline cursor-pointer"
                  aria-label="Direct inquiry on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>WhatsApp Direct Inquiry</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-light text-neutral-600">
          <p>© 2026 Todi Creation. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
