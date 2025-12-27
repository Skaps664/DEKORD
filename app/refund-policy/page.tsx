"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { RefreshCcw, CheckCircle2, XCircle, Clock, FileText, Shield, AlertTriangle, MessageSquare } from "lucide-react"
import { ClaimCallout } from "@/components/claim-callout"

export default function RefundPolicyPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const sections = [
    {
      icon: CheckCircle2,
      title: "Eligibility for Refunds",
      content: [
        {
          text: "Refunds are processed only after we receive and inspect the returned product or in the case of a valid order cancellation before dispatch.",
        },
        {
          subtitle: "The product must meet the following conditions:",
          list: [
            "Returned in original packaging, unused, and undamaged",
            "Accompanied by proof of purchase (order confirmation or invoice)"
          ]
        },
        {
          subtitle: "Certain items are non-refundable, including:",
          list: [
            "Products damaged due to misuse, negligence, or unauthorized repairs",
            "Items returned without prior approval from our support team",
            "Shipping and handling charges (unless due to an error on our side)"
          ]
        }
      ]
    },
    {
      icon: XCircle,
      title: "Order Cancellation",
      content: [
        {
          text: "If you cancel an order before it is shipped, we will process your refund within 3–5 business days.",
        },
        {
          text: "Once the order is dispatched, cancellation is no longer possible, and the product must be returned first (if eligible) before a refund can be issued."
        }
      ]
    },
    {
      icon: Clock,
      title: "Refund Process",
      content: [
        {
          list: [
            "Once we receive your returned product, our team will inspect it",
            "If approved, your refund will be processed within 3–5 business days",
            "Refunds will be issued through the original payment method where possible. For Cash on Delivery (COD) orders, refunds will be transferred via bank account, Easypaisa, or JazzCash after confirmation",
            "You will receive a confirmation email/SMS once your refund is processed"
          ]
        }
      ]
    },
    {
      icon: FileText,
      title: "How to Initiate a Refund",
      content: [
        {
          list: [
            "Go to your Account page and navigate to the Orders tab",
            "Find your delivered order and click the 'Claim' button",
            "Submit your refund request with issue details and photos",
            "Our team will respond within 3-5 business days and guide you on the next steps",
            "No refunds will be processed without prior verification and approval from our support team"
          ]
        }
      ]
    },
    {
      icon: Shield,
      title: "Fraud & Scam Protection",
      content: [
        {
          text: "Refunds will not be issued for products returned in used, damaged, or altered condition.",
        },
        {
          text: "Any attempt to abuse or misuse the refund process (e.g., fake claims, switching products) will result in the request being declined and may lead to a permanent block from future purchases.",
        },
        {
          text: "dekord reserves the right to withhold refunds until the product is received and verified.",
          highlight: true
        }
      ]
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
                <RefreshCcw className="w-10 h-10 text-foreground" />
              </div>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-foreground">
              REFUND POLICY
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              At dekord, we value our customers and want to ensure a fair and transparent process when it comes to refunds. Please read our refund policy carefully to understand your rights and our procedures.
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
                    
                    <div className="space-y-4">
                      {section.content.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          className={`${
                            'highlight' in item && item.highlight
                              ? 'p-4 border border-border/50 rounded-xl bg-muted/30'
                              : ''
                          }`}
                        >
                          {'subtitle' in item && item.subtitle && (
                            <h3 className="text-base font-semibold text-foreground mb-3">
                              {item.subtitle}
                            </h3>
                          )}
                          
                          {'text' in item && item.text && (
                            <p className="text-muted-foreground leading-relaxed">
                              {item.text}
                            </p>
                          )}

                          {'list' in item && item.list && (
                            <ul className="space-y-2">
                              {item.list.map((listItem: string, listIdx: number) => (
                                <li key={listIdx} className="flex gap-3">
                                  <span className="text-foreground mt-1.5 flex-shrink-0">•</span>
                                  <span className="text-muted-foreground leading-relaxed">
                                    {listItem}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      ))}
                    </div>
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

      {/* Timeline Info */}
      <section className="py-20 relative bg-muted/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-8 border border-border/50 rounded-2xl bg-card hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl border border-border bg-muted/50 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Pre-Dispatch Cancellation
                </h3>
                <p className="text-muted-foreground">
                  Refund processed within <span className="font-semibold text-foreground">3–5 business days</span> if cancelled before shipment
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-8 border border-border/50 rounded-2xl bg-card hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl border border-border bg-muted/50 flex items-center justify-center mb-4">
                  <RefreshCcw className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Post-Inspection Refund
                </h3>
                <p className="text-muted-foreground">
                  Refund processed within <span className="font-semibold text-foreground">3–5 business days</span> after product inspection and approval
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-8 border border-border/50 rounded-2xl bg-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl border border-border bg-muted/50 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Important Notice
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                All refund requests must be initiated through our support team. Please ensure you have your order details ready when contacting us. This helps us verify your purchase and process your refund quickly and efficiently.
              </p>
            </div>
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
            <div className="p-12 md:p-16 border border-border/50 rounded-3xl bg-card shadow-xl text-center">
              <div className="w-16 h-16 rounded-2xl border border-border bg-muted/50 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Contact Us
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                For questions or assistance regarding refunds, please reach us at:
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

              <ClaimCallout variant="secondary" className="max-w-2xl mx-auto" />
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
              <CheckCircle2 className="w-8 h-8 text-foreground" />
              <h3 className="text-2xl font-bold text-foreground">
                Fair & Transparent Process
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We are committed to providing a fair refund process. Your satisfaction is our priority, and we handle each request with care and transparency.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
