"use client"

import { Users, Sprout, Award, BookOpen } from "lucide-react"

const services = [
  {
    icon: Users,
    title: "Farmer Registration",
    description:
      "Register farmers and fisherfolks to maintain a comprehensive database, enabling easier access to resources and services.",
    color: "bg-blue-50",
  },
  {
    icon: Sprout,
    title: "Agricultural Interventions",
    description:
      "Timely support to boost crop resilience and productivity, offering resources like seeds, pest control, and emergency aid.",
    color: "bg-green-50",
  },
  {
    icon: Award,
    title: "Certification Requests",
    description:
      "Manage and process certification requests for various programs required by farmers and related entities.",
    color: "bg-amber-50",
  },
  {
    icon: BookOpen,
    title: "Training & Seminars",
    description: "Organize and conduct training sessions to empower farmers with new skills and knowledge.",
    color: "bg-purple-50",
  },
]

export default function Services() {
  return (
    <section id="services" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-semibold tracking-wider">OUR SERVICES</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-2 mb-4">
            Comprehensive Support for Farmers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer a wide variety of services designed to support farmers, fisherfolks, and agricultural communities.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="group p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
