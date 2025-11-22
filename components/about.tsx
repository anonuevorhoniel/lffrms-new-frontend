"use client"

import { CheckCircle2 } from "lucide-react"

const features = [
  "Comprehensive farmer & fisherfolk registration and profiling",
  "Efficient agricultural and fishery data management",
  "Agricultural and Fishery Inputs & farm machinery support",
  "Agricultural and Fishery Data oversight",
  "Request management for trainings and seminars",
  "Associations Accreditation",
  "Certificate and Endorsement issuance",
  "Technical Assistance for farm/fish farm operations",
]

export default function About() {
  return (
    <section id="about" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-semibold tracking-wider">ABOUT US</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-2 mb-4">
            A Complete Solution for Agricultural Support
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The Laguna Farmers & Fisherfolks Registry Management System is designed as an all-in-one solution, providing
            administrators with tools to manage agricultural and fishery operations effectively.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Left Column */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Key Capabilities</h3>
            <div className="space-y-4">
              {features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Additional Services</h3>
            <div className="space-y-4">
              {features.slice(4).map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-3">Ready to Get Started?</h3>
          <p className="text-muted-foreground mb-6">
            Join thousands of farmers and fisherfolks benefiting from our comprehensive registry system.
          </p>
          <button className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition">
            Register Now
          </button>
        </div>
      </div>
    </section>
  )
}
