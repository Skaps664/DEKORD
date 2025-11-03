"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Shield, FileText, Award, Scale, CheckCircle2, Building2, Phone, Mail, MapPin } from "lucide-react"

export default function LegalPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const legalSections = [
    {
      icon: Building2,
      title: "Company Registration",
      items: [
        {
          label: "Registered Entity",
          value: "dekord (SMC-Private) Limited"
        },
        {
          label: "Registered with",
          value: "Securities and Exchange Commission of Pakistan (SECP) under the Companies Act, 2017"
        },
        {
          label: "Nature of Business",
          value: "Technology & Electronics (manufacturing, importing, and retail of electronic accessories)"
        }
      ],
      note: "Customers and partners can verify our registration via the official SECP database."
    },
    {
      icon: FileText,
      title: "Tax Registration",
      items: [
        {
          label: "NTN Number",
          value: "H395995"
        },
        {
          label: "Registration",
          value: "Registered with the Federal Board of Revenue (FBR) as an active taxpayer"
        },
        {
          label: "Compliance",
          value: "All sales and services comply with Pakistani tax laws. Tax invoices are issued where applicable"
        }
      ]
    },
    {
      icon: Award,
      title: "Trademark & Intellectual Property Rights",
      items: [
        {
          label: "Brand Protection",
          value: "The brand name \"dekord\", our logo, and product designs are our intellectual property"
        },
        {
          label: "Registration Status",
          value: "Trademark registration has been initiated with the Intellectual Property Organization (IPO) Pakistan"
        },
        {
          label: "Legal Warning",
          value: "Strictly prohibited: Unauthorized use, duplication, or reproduction of our name, logo, packaging, or product designs. Violators are liable to legal action under IPO Pakistan and copyright laws",
          highlight: true
        }
      ]
    },
    {
      icon: CheckCircle2,
      title: "Certifications & Compliance",
      items: [
        {
          label: "Regulatory Bodies",
          value: "We are actively working with: Pakistan Standards & Quality Control Authority (PSQCA), PCSIR (Pakistan Council of Scientific & Industrial Research), Pakistan Engineering Council (PEC)"
        },
        {
          label: "Product Testing",
          value: "Our products undergo rigorous testing and comply with safety and performance standards"
        },
        {
          label: "Transparency",
          value: "Certification updates will be shared publicly on our website as they are completed"
        }
      ]
    },
    {
      icon: Scale,
      title: "Legal Commitment",
      items: [
        {
          label: "Compliance Framework",
          value: "All business activities are carried out under the Companies Act, 2017 and other applicable Pakistani laws"
        },
        {
          label: "Consumer Protection",
          value: "We operate in line with consumer protection laws, ensuring fair trade, transparent warranties, and refund policies"
        },
        {
          label: "Legal Rights",
          value: "dekord reserves the right to take legal action against fraud, scams, or misuse of our products and brand identity"
        }
      ]
    }
  ]

  const contactInfo = [
    {
      icon: Building2,
      label: "Founder & CEO",
      value: "M. Sudais Khan"
    },
    {
      icon: FileText,
      label: "Trade Name",
      value: "dekord (SMC-Private) Limited"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+92 339 0166442"
    },
    {
      icon: Mail,
      label: "Email",
      value: "support@dekord.online"
    },
    {
      icon: MapPin,
      label: "Registered Address",
      value: "A2 Third Floor, New Dil Jan Plaza, Achini Ring Road, Peshawar 25000, Pakistan"
    },
    {
      icon: FileText,
      label: "NTN",
      value: "H395995"
    }
  ]

  return (
    <main className="min-h-screen bg-background pt-28">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0 bg-background"
        />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              className="inline-block mb-8"
            >
              <div className="w-20 h-20 rounded-3xl border border-border bg-card shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform">
                <Shield className="w-10 h-10 text-foreground" />
              </div>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-foreground">
              LEGAL INFO
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              At <span className="font-semibold text-foreground">dekord (SMC-Private) Limited</span>, we are committed to operating under a transparent, legal, and fully compliant framework in Pakistan. We take pride in ensuring that our customers, partners, and stakeholders can trust our brand and products.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Legal Sections */}
      <section className="py-20 relative">
        <div className="container-custom">
          <div className="space-y-12 max-w-5xl mx-auto">
            {legalSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl border border-border bg-card shadow-md flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {section.items.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className={`p-6 rounded-2xl border transition-all hover:shadow-md ${
                          'highlight' in item && item.highlight
                            ? 'border-foreground/20 bg-muted/30 shadow-sm' 
                            : 'border-border/50 bg-card/50'
                        }`}
                      >
                        <p className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wider">
                          {item.label}
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {section.note && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="mt-4 text-sm text-muted-foreground italic pl-4 border-l-2 border-border"
                    >
                      {section.note}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Contact Information */}
      <section className="py-20 relative bg-muted/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Official Contact Information
            </h2>
            <p className="text-lg text-muted-foreground">
              For verification, inquiries, or legal correspondence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="p-6 border border-border/50 rounded-2xl bg-card hover:border-foreground/20 hover:shadow-lg transition-all">
                  <info.icon className="w-8 h-8 text-foreground mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                    {info.label}
                  </p>
                  <p className="text-foreground font-semibold leading-relaxed">
                    {info.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badge */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-12 md:p-16 border border-border/50 rounded-3xl bg-card shadow-xl text-center">
              <div className="w-16 h-16 rounded-2xl border border-border bg-muted/50 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Transparency & Trust
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                We believe in complete transparency. All our legal documentation, certifications, and registrations are available for verification. Our commitment to compliance ensures that every dekord product meets the highest standards of quality and legality.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
