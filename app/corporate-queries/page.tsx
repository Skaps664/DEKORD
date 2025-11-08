"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Factory, Briefcase, Palette, Cable, Zap, Award, MessageSquare, Globe, Package, Layers, Sparkles } from "lucide-react"

export default function CorporateQueriesPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const customizationOptions = [
    { icon: Palette, title: "Color That Speaks Your Brand", desc: "Choose from a full spectrum of colors, connector finishes, and braided textures. From deep matte black to electric blue — your cables should look like *you*." },
    { icon: Cable, title: "Tailored Connectors & Specs", desc: "USB-C, Lightning, Thunderbolt, or custom data lines. We build, test, and certify cables that match your exact technical and aesthetic needs." },
    { icon: Layers, title: "Your Brand, Our Engineering", desc: "Custom logo engraving, private-label builds, and end-to-end OEM support — designed, assembled, and tested in-house." },
    { icon: Package, title: "Packaging That Stands Out", desc: "From eco-friendly kraft to magnetic boxes with soft-touch coatings — we make packaging feel as good as what’s inside." },
    { icon: Zap, title: "Performance Beyond Standard", desc: "We tweak the internals: copper density, shielding, PD chips — to achieve flawless power delivery, data integrity, and durability." },
    { icon: Factory, title: "Made in Peshawar, Built for the World", desc: "Our cables are crafted in Pakistan’s growing tech-hardware hub — blending design, precision, and local craftsmanship." },
  ]

  const contactInfo = [
    { label: "Email", value: "contact@dekord.online", href: "mailto:contact@dekord.online", icon: MessageSquare },
    { label: "Phone", value: "+92 339 0166442", href: "tel:+923390166442", icon: Briefcase },
    { label: "Address", value: "A2 Third Floor, New Dil Jan Plaza, Achini Ring Road, Peshawar 25000, Pakistan", href: "", icon: Globe },
  ]

  return (
    <main className="min-h-screen bg-background pt-28">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 bg-background" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20 bg-foreground animate-pulse" />
                <div className="relative w-24 h-24 rounded-3xl border-2 border-border bg-card shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
                  <Factory className="w-12 h-12 text-foreground" />
                </div>
              </div>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-4 text-foreground">
              Partner With Purpose
            </h1>
            <h2 className="text-3xl md:text-4xl text-muted-foreground font-light mb-8">
              Corporate & OEM Collaborations with <span className="font-semibold text-foreground">Dekord</span>
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              We don’t just make cables.  
              We make connections — between design and durability, between brands and their customers.  
              <br />
              <span className="font-semibold text-foreground">Built in Pakistan. Engineered for the world.</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Customization Options */}
      <section className="py-24 relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <Sparkles className="w-10 h-10 text-foreground mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Customization That Feels Human
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every brand tells a story.  
                We help you express it — through color, material, and craftsmanship that people can feel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {customizationOptions.map((opt, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="p-8 border-2 border-border rounded-3xl bg-card shadow-xl hover:shadow-2xl hover:bg-muted/10 transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl border border-border bg-muted/50 flex items-center justify-center mb-5">
                    <opt.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{opt.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{opt.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-24 relative bg-muted/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="p-12 md:p-16 border-2 border-border rounded-3xl bg-card shadow-2xl">
              <Award className="w-16 h-16 text-foreground mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Why Brands Choose Dekord
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
                From startups to tech giants — every partner we work with values one thing above all: precision.
                When you collaborate with Dekord, you get design intelligence, manufacturing confidence, and human-to-human communication.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {["Design-Driven", "Locally Manufactured", "Fast Prototyping", "Confidential OEM Support"].map((text, index) => (
                  <div key={index} className="px-6 py-3 border border-border rounded-xl bg-muted/20 text-foreground font-medium shadow-md">
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="p-12 md:p-16 border-2 border-border rounded-3xl bg-card shadow-2xl">
              <div className="text-center mb-12">
                <div className="w-20 h-20 rounded-2xl border border-border bg-muted/50 flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-10 h-10 text-foreground" />
                </div>
                <h3 className="text-4xl font-bold text-foreground mb-4">Let’s Build Something Together</h3>
                <p className="text-lg text-muted-foreground">
                  Reach out for OEM, design collaborations, or bulk manufacturing discussions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {contactInfo.map((info, index) => (
                  <div key={index} className="p-6 border border-border/50 rounded-2xl bg-muted/20 text-center">
                    <info.icon className="w-8 h-8 text-foreground mx-auto mb-3" />
                    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className="text-base font-semibold text-foreground hover:underline">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-foreground">{info.value}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <a 
                  href="mailto:contact@dekord.online"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background rounded-2xl font-bold text-lg hover:shadow-2xl hover:bg-foreground/90 transition-all transform hover:scale-105"
                >
                  <MessageSquare className="w-6 h-6" />
                  Send a Corporate Query
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
