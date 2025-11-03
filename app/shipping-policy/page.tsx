"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Truck, MapPin, Clock, DollarSign, Package, Search, ShieldCheck, CreditCard, AlertCircle, MessageSquare } from "lucide-react"

export default function ShippingPolicyPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const sections = [
    {
      icon: MapPin,
      title: "Shipping Hub",
      content: [
        "All orders are processed and packed at our facility in Peshawar, KPK.",
        "Orders typically remain in our facility for 1 business day for quality checks and secure packaging before being handed over to our courier partners.",
        "Once dispatched, parcels are routed through the courier's nearest hub for onward delivery to your city or town."
      ]
    },
    {
      icon: Clock,
      title: "Shipping Timeline",
      content: [
        "Standard delivery time: 3 to 5 business days (excluding Sundays and public holidays).",
        "Please note: Delays may occur due to weather conditions, political disruptions, or out-of-service areas."
      ]
    },
    {
      icon: DollarSign,
      title: "Shipping Cost",
      content: [
        "Flat shipping fee of Rs. 200 applies to all orders across Pakistan.",
        "Shipping charges remain the same regardless of location or courier service.",
        "Free shipping may be offered during special campaigns, promotions, or limited-time offers (as announced on our website)."
      ]
    },
    {
      icon: Search,
      title: "Tracking Your Order",
      content: [
        "Once your order has been dispatched, you will receive an SMS/Email with your tracking number.",
        "You can use this tracking ID on the courier's website (Leopards, PostEx, or Trax) to follow your shipment's progress.",
        "Tracking becomes active within 24 hours of dispatch."
      ]
    },
    {
      icon: Package,
      title: "Shipment Handling & Checking",
      content: [
        "All products are quality-checked and securely packed before dispatch.",
        "Customers are requested not to open or test products in front of courier riders, as delivery staff are on strict schedules.",
        "In case of any issue, your purchase is covered under our Return & Refund Policy and Warranty Policy."
      ]
    },
    {
      icon: CreditCard,
      title: "Payment Methods",
      content: [
        "To make shopping easier, dekord supports:",
        "• Cash on Delivery (COD)",
        "• Bank Transfer / Online Banking",
        "• JazzCash",
        "• Easypaisa",
        "• Credit/Debit Cards (where applicable)",
        "",
        "Payment is confirmed after stock verification. If an item is unavailable, our team will contact you immediately before dispatch."
      ]
    }
  ]

  const importantNotes = [
    "Delivery timelines are based on business days (Mon–Sat, excluding national holidays).",
    "dekord is not responsible for delays caused by courier service providers.",
    "Orders not received due to incorrect address or unavailability of the customer will be returned to dekord. In such cases, re-delivery will require an additional shipping fee."
  ]

  const courierPartners = [
    "Leopards Logistics",
    "PostEx",
    "Trax"
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
                <Truck className="w-10 h-10 text-foreground" />
              </div>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-foreground">
              SHIPPING POLICY
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              At dekord, we aim to deliver every order safely, reliably, and on time — right to your doorstep. To achieve this, we partner with trusted logistics companies across Pakistan.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Courier Partners */}
      <section className="py-12 relative bg-muted/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Our Trusted Courier Partners
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {courierPartners.map((partner, index) => (
                <motion.div
                  key={partner}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 border border-border/50 rounded-full bg-card shadow-sm"
                >
                  <p className="font-semibold text-foreground">{partner}</p>
                </motion.div>
              ))}
            </div>
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
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-2xl border border-border bg-card shadow-md flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-foreground" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-foreground mb-6">
                      {section.title}
                    </h2>
                    
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
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
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
                  <AlertCircle className="w-5 h-5 text-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                  Important Notes
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

      {/* Contact Section */}
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
                <MessageSquare className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Contact Us
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                For shipping inquiries, contact us at:
              </p>

              <div className="space-y-4 mb-8">
                <div className="p-4 border border-border/50 rounded-xl bg-muted/20 inline-block">
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a href="mailto:support@dekord.online" className="text-lg font-semibold text-foreground hover:underline">
                    support@dekord.online
                  </a>
                </div>

                <div className="p-4 border border-border/50 rounded-xl bg-muted/20 inline-block">
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <a href="tel:+923390166442" className="text-lg font-semibold text-foreground hover:underline">
                    +92 339 0166442
                  </a>
                </div>

                <div className="p-4 border border-border/50 rounded-xl bg-muted/20">
                  <p className="text-sm text-muted-foreground mb-1">Address</p>
                  <p className="text-base font-semibold text-foreground">
                    A2 Third Floor, New Dil Jan Plaza,<br />
                    Achini Ring Road, Peshawar 25000, Pakistan
                  </p>
                </div>
              </div>

              <a 
                href="mailto:support@dekord.online"
                className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-2xl font-semibold hover:shadow-xl transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 relative bg-muted/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShieldCheck className="w-8 h-8 text-foreground" />
              <h3 className="text-2xl font-bold text-foreground">
                Safe & Secure Delivery
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Every order is quality-checked and securely packaged before dispatch. Your satisfaction and trust are our top priorities.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
