"use client"

import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-foreground text-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h4 className="font-bold text-lg mb-4">Laguna Farmers</h4>
            <p className="text-background/70">Supporting agricultural and fishery communities in Laguna Province.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-background/70">
              <li>
                <Link href="#" className="hover:text-background transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-background transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-background transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-semibold mb-4">Services</h5>
            <ul className="space-y-2 text-background/70">
              <li>
                <Link href="#" className="hover:text-background transition">
                  Farmer Registration
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Certification
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Training
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-semibold mb-4">Contact Us</h5>
            <ul className="space-y-3 text-background/70">
              <li className="flex gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>Calios, Santa Cruz, Laguna</span>
              </li>
              <li className="flex gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+63 (0) 2 123 456</span>
              </li>
              <li className="flex gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>info@lfarmer.gov.ph</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8">
          <div className="text-center text-background/70">
            <p>&copy; 2025 Laguna Farmers & Fisherfolks Registry. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
