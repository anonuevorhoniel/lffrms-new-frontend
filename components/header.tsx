"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import logo from "../public/logo.png"
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
           <Image src={logo} alt="Laguna Logo" width={50} height={50} />
            </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#home"
              className="text-foreground hover:text-primary transition"
            >
              Home
            </Link>
            <Link
              href="#services"
              className="text-foreground hover:text-primary transition"
            >
              Services
            </Link>
            <Link
              href="#about"
              className="text-foreground hover:text-primary transition"
            >
              About
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button>Login</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="#home" className="text-foreground hover:text-primary">
              Home
            </Link>
            <Link
              href="#services"
              className="text-foreground hover:text-primary"
            >
              Services
            </Link>
            <Link href="#about" className="text-foreground hover:text-primary">
              About
            </Link>
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-left">
              Register
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
