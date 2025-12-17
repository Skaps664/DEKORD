"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { RotateCcw, Calendar, CheckCircle2, Truck, FileSearch, XCircle, Shield, AlertTriangle, MessageSquare, Package } from "lucide-react"
import { ClaimCallout } from "@/components/claim-callout"

export default function ReturnPolicyPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const sections = [
    {
      icon: Calendar,
      title: "30-Day Return Window",
      content: [
        "You may request a return within 30 days of receiving your order.",
        "After 30 days, no returns or exchanges will be accepted under any circumstances.",
        "Proof of purchase (order confirmation or invoice) is required for all return requests."
      ]
    },
    {
      icon: CheckCircle2,
      title: "Conditions for a Valid Return",
      content: [
        "To qualify for a return:",
        "• The product must be in the same condition as delivered — unused, undamaged, and in its original packaging",
        "• All accessories, manuals, and packaging must be intact",
        "• Products that are used, tampered with, or physically damaged due to customer mishandling will not be eligible"
      ]
    },
    {
      icon: Truck,
      title: "Return Shipping Costs",
      content: [
        "Customers are responsible for all return shipping charges, regardless of the reason for return (damaged, defective, or change of mind).",
        "dekord does not reimburse shipping fees under any circumstances.",
        "We will only refund/replace the product value once the return has been received and verified."
      ]
    },
    {
      icon: FileSearch,
      title: "Return Process",
      steps: [
        {
          title: "Initiation",
          items: [
            "Visit our Claim Page and submit your return request within 30 days of receiving your product",
            "Provide your order number, reason for return, and clear photos/videos of the product"
          ]
        },
        {
          title: "Approval",
          items: [
            "Once reviewed, our support team will confirm if your item is eligible for return",
            "You will receive detailed instructions and the official return address"
          ]
        },
        {
          title: "Inspection",
          items: [
            "After we receive your return, our team will inspect it for compliance",
            "Based on inspection, we will decide if you are eligible for a refund or a replacement"
          ]
        },
        {
          title: "Processing",
          items: [
            "Approved refunds or replacements will be processed within 3–5 business days after verification",
            "Refunds will be issued to your original payment method (for COD orders: via bank transfer, Easypaisa, or JazzCash)",
            "Replacements will be shipped within the same 3–5 business day window"
          ]
        }
      ]
    },
    {
      icon: XCircle,
      title: "Non-Returnable Items",
      content: [
        "We do not accept returns for:",
        "• Customized or personalized cables (unless defective)",
        "• Sale, clearance, or promotional items",
        "• Products damaged due to customer misuse or unauthorized repairs",
        "• Items returned without prior approval"
      ]
    },
    {
      icon: Shield,
      title: "Fraud & Scam Protection",
      content: [
        "To protect both customers and our business:",
        "• Returns showing signs of intentional damage or product swapping will be rejected",
        "• We may request unboxing videos/photos in disputes",
        "• dekord reserves the right to deny returns and block fraudulent customers permanently",
        "• Legal action may be taken in case of proven fraud attempts"
      ],
      highlight: true
    }
  ]

  const importantNotes = [
    "Return shipping within Pakistan is at the customer's expense",
    "We recommend using a trackable courier service to ensure your item reaches us safely",
    "dekord is not responsible for items lost in transit",
    "All refunds/replacements are strictly issued only after inspection and approval"
  ]

  const contactInfo = [
    { label: "Trade Name", value: "dekord (SMC-Private) Limited" },
    { label: "Founder & CEO", value: "M. Sudais Khan" },
    { label: "NTN", value: "H395995" },
    { label: "Phone", value: "+92 339 0166442" },
    { label: "Email", value: "support@dekord.online" },
    { label: "Return Address", value: "A2 Third Floor, New Dil Jan Plaza, Achini Ring Road, Peshawar 25000, Pakistan" }
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
                <RotateCcw className="w-10 h-10 text-foreground" />
              </div>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-foreground">
              RETURN POLICY
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              At dekord, we design every product with durability, performance, and customer satisfaction in mind. While we stand by the quality of our products, we also understand that sometimes returns are necessary.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-20 relative">
        <div className="container-custom">
          <div className="space-y-12 max-w-5xl mx-auto">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="relative"
              >
                <div className={`flex items-start gap-6 ${
                  section.highlight ? 'p-6 border border-border/50 rounded-2xl bg-muted/20' : ''
                }`}>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl border border-border bg-card shadow-md flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-foreground" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-foreground mb-6">
                      {section.title}
                    </h2>
                    
                    {section.content && (
                      <div className="space-y-3">
                        {section.content.map((paragraph, idx) => (
                          <motion.p
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className="text-muted-foreground leading-relaxed"
                          >
                            {paragraph}
                          </motion.p>
                        ))}
                      </div>
                    )}

                    {section.steps && (
                      <div className="space-y-6">
                        {section.steps.map((step, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-5 border border-border/50 rounded-xl bg-card/50"
                          >
                            <h3 className="text-lg font-semibold text-foreground mb-3">
                              {idx + 1}. {step.title}
                            </h3>
                            <ul className="space-y-2">
                              {step.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex gap-3">
                                  <span className="text-foreground mt-1.5 flex-shrink-0">•</span>
                                  <span className="text-muted-foreground leading-relaxed">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Claim Callout */}
      <section className="py-12 relative">
        <div className="container-custom">
          <ClaimCallout variant="primary" className="max-w-5xl mx-auto" />
        </div>
      </section>

      {/* Important Notes for Pakistan */}
      <section className="py-20 relative bg-muted/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="p-8 border border-border/50 rounded-2xl bg-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl border border-border bg-muted/50 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                  Important Notes for Customers in Pakistan
                </h2>
              </div>
              
              <ul className="space-y-3">
                {importantNotes.map((note, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3"
                  >
                    <span className="text-foreground mt-1.5 flex-shrink-0">•</span>
                    <span className="text-muted-foreground leading-relaxed">
                      {note}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Card */}
      <section className="py-12 relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 border border-border/50 rounded-2xl bg-card shadow-lg text-center"
            >
              <div className="w-16 h-16 rounded-xl border border-border bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                30-Day Return Window
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Returns must be initiated within <span className="font-semibold text-foreground">30 days</span> of receiving your order. Processing takes <span className="font-semibold text-foreground">3-5 business days</span> after inspection and approval.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 relative bg-muted/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-12 md:p-16 border border-border/50 rounded-3xl bg-card shadow-xl">
              <div className="w-16 h-16 rounded-2xl border border-border bg-muted/50 flex items-center justify-center mx-auto mb-6">
                <Package className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Official Return Address & Contact
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center">
                For return inquiries and shipping your products back to us:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index} 
                    className={`p-4 border border-border/50 rounded-xl bg-muted/20 ${
                      info.label === "Return Address" ? "md:col-span-2" : ""
                    }`}
                  >
                    <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">
                      {info.label}
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {info.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <ClaimCallout variant="secondary" className="max-w-2xl mx-auto" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-foreground" />
              <h3 className="text-2xl font-bold text-foreground">
                Fair Return Policy
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We balance customer convenience with fair practices. Our return policy protects both customers and our business from misuse while ensuring genuine concerns are addressed promptly.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
