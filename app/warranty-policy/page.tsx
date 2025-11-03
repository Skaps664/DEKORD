"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ShieldCheck, Award, CheckCircle2, XCircle, FileText, Package, Shield, AlertTriangle, Globe, MessageSquare, Clock, Zap } from "lucide-react"

export default function WarrantyPolicyPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const coverageItems = [
    "Manufacturing defects in materials or workmanship",
    "Functional issues under normal, intended use",
    "Connector failure, internal wire breakage, or non-functionality within the warranty period"
  ]

  const notCoveredItems = [
    "Normal wear and tear, cosmetic scratches, or surface damage",
    "Misuse, abuse, or improper handling (bending, pulling, twisting, or crushing)",
    "Exposure to liquids, fire, extreme heat, or hazardous environments",
    "Unauthorized modifications, tampering, or repairs",
    "Use with uncertified chargers, third-party adapters, or non-compliant devices",
    "Accidental damage, negligence, or intentional destruction"
  ]

  const warrantyRules = [
    "Warranty covers replacement only, not refunds",
    "Replacements will only be provided for the exact same product variant (color, model, material)",
    "Substitutes, exchanges for different variants, or upgrades are not allowed",
    "If a product is discontinued or unavailable, dekord may provide the closest equivalent, subject to approval"
  ]

  const claimSteps = [
    {
      icon: MessageSquare,
      title: "Contact Us",
      description: "Email support@dekord.online with your order number, proof of purchase, and clear photos/videos of the issue"
    },
    {
      icon: FileText,
      title: "Verification",
      description: "Our support team will review your claim within 3–5 business days. In some cases, additional proof such as unboxing or usage videos may be required"
    },
    {
      icon: Package,
      title: "Return (if needed)",
      description: "You may be asked to send the product back for testing at our lab"
    },
    {
      icon: CheckCircle2,
      title: "Approval",
      description: "If the defect is confirmed, we will ship a replacement free of charge within 3–5 business days"
    }
  ]

  const importantNotes = [
    "Warranty = replacement only, no refunds. Refunds fall under the separate Refund Policy",
    "Warranty period starts from the original date of purchase",
    "Warranty is valid for one replacement per item within the coverage period"
  ]

  return (
    <main className="min-h-screen bg-background pt-28">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0 bg-background"
        />
        
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
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20 bg-foreground animate-pulse" />
                <div className="relative w-24 h-24 rounded-3xl border-2 border-border bg-card shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
                  <Award className="w-12 h-12 text-foreground" />
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block mb-6 px-6 py-2 border border-border rounded-full bg-card shadow-lg"
            >
              <p className="text-sm font-bold text-foreground uppercase tracking-wider">
                Industry-Leading Protection
              </p>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-foreground">
              1-YEAR WARRANTY
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
            >
              At dekord, we design and manufacture every product with <span className="font-semibold text-foreground">durability, performance, and safety</span> in mind. To ensure customer confidence, all dekord cables come with a comprehensive 1-Year Limited Warranty.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="px-6 py-3 border border-border rounded-xl bg-card shadow-md">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-foreground" />
                  <span className="font-semibold text-foreground">Full Coverage</span>
                </div>
              </div>
              <div className="px-6 py-3 border border-border rounded-xl bg-card shadow-md">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-foreground" />
                  <span className="font-semibold text-foreground">Fast Processing</span>
                </div>
              </div>
              <div className="px-6 py-3 border border-border rounded-xl bg-card shadow-md">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-foreground" />
                  <span className="font-semibold text-foreground">Free Replacement</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-20 relative">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* What's Covered */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="h-full p-8 border-2 border-border rounded-3xl bg-card shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-2xl border border-border bg-muted/50 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-foreground" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                      Warranty Coverage
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    This warranty applies to:
                  </p>
                  <ul className="space-y-4">
                    {coverageItems.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-3 p-4 rounded-xl bg-muted/20 border border-border/50"
                      >
                        <CheckCircle2 className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-foreground font-medium leading-relaxed">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* What's Not Covered */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="h-full p-8 border-2 border-border rounded-3xl bg-card shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-2xl border border-border bg-muted/50 flex items-center justify-center">
                      <XCircle className="w-7 h-7 text-foreground" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                      Not Covered
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    This warranty does not apply to damage caused by:
                  </p>
                  <ul className="space-y-3">
                    {notCoveredItems.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 }}
                        className="flex gap-3"
                      >
                        <XCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground leading-relaxed">
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty Rules */}
      <section className="py-20 relative bg-muted/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Warranty Rules & Replacements
              </h2>
              <p className="text-lg text-muted-foreground">
                Important guidelines for warranty claims
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {warrantyRules.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 border border-border/50 rounded-2xl bg-card hover:shadow-lg transition-all"
                >
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg border border-border bg-muted/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-foreground">{index + 1}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {rule}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Claim Process */}
      <section className="py-20 relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                How to File a Warranty Claim
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our streamlined 4-step process makes claiming your warranty simple and hassle-free
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {claimSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ y: -8 }}
                  className="relative group"
                >
                  <div className="h-full p-6 border-2 border-border rounded-2xl bg-card shadow-lg hover:shadow-2xl transition-all">
                    <div className="relative mb-4">
                      <div className="w-16 h-16 rounded-2xl border border-border bg-muted/50 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                        <step.icon className="w-8 h-8 text-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full border-2 border-border bg-card flex items-center justify-center shadow-md">
                        <span className="text-sm font-bold text-foreground">{index + 1}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-center">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shipping Costs */}
      <section className="py-12 relative bg-muted/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-8 border border-border/50 rounded-2xl bg-card">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-8 h-8 text-foreground" />
                <h3 className="text-2xl font-bold text-foreground">
                  Shipping Costs
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-foreground" />
                    <h4 className="font-semibold text-foreground">Genuine Defect Confirmed</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    dekord will cover <span className="font-semibold text-foreground">all return and replacement shipping costs</span>
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="w-5 h-5 text-muted-foreground" />
                    <h4 className="font-semibold text-foreground">No Defect Found</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The customer must pay <span className="font-semibold text-foreground">all return and reshipping costs</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fraud Protection */}
      <section className="py-20 relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="p-10 border-2 border-border rounded-3xl bg-muted/20 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl border border-border bg-card flex items-center justify-center">
                  <Shield className="w-7 h-7 text-foreground" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Scam & Fraud Protection
                </h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                To protect genuine customers:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 p-4 rounded-xl bg-card border border-border/50">
                  <AlertTriangle className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground leading-relaxed">
                    Claims with falsified or insufficient proof will be rejected
                  </span>
                </li>
                <li className="flex gap-3 p-4 rounded-xl bg-card border border-border/50">
                  <AlertTriangle className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground leading-relaxed">
                    Returned items that are different from the original purchase will void the claim
                  </span>
                </li>
                <li className="flex gap-3 p-4 rounded-xl bg-card border border-border/50">
                  <AlertTriangle className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground leading-relaxed">
                    dekord reserves the right to request additional verification (videos, tests, receipts)
                  </span>
                </li>
                <li className="flex gap-3 p-4 rounded-xl bg-card border border-border/50">
                  <AlertTriangle className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground leading-relaxed">
                    Accounts found attempting repeated fraudulent claims may be blacklisted permanently
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* International Claims */}
      <section className="py-12 relative bg-muted/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-8 border border-border/50 rounded-2xl bg-card">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-8 h-8 text-foreground" />
                <h3 className="text-2xl font-bold text-foreground">
                  International Warranty Claims
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-foreground mt-1.5 flex-shrink-0">•</span>
                  <span className="text-muted-foreground leading-relaxed">
                    Customers outside Pakistan are eligible
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground mt-1.5 flex-shrink-0">•</span>
                  <span className="text-muted-foreground leading-relaxed">
                    If defect cannot be confirmed remotely, international customers must cover return shipping
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground mt-1.5 flex-shrink-0">•</span>
                  <span className="text-muted-foreground leading-relaxed">
                    Replacements will be shipped only after verification
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-20 relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="p-8 border border-border/50 rounded-2xl bg-card">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-8 h-8 text-foreground" />
                <h3 className="text-2xl font-bold text-foreground">
                  Important Notes
                </h3>
              </div>
              <ul className="space-y-3">
                {importantNotes.map((note, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3 p-4 rounded-xl bg-muted/20"
                  >
                    <CheckCircle2 className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
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
      <section className="py-20 relative bg-muted/10">
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
                  <MessageSquare className="w-10 h-10 text-foreground" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Official Warranty Contact
                </h3>
                <p className="text-lg text-muted-foreground">
                  For warranty claims and support
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="p-6 border border-border/50 rounded-2xl bg-muted/20 text-center">
                  <MessageSquare className="w-8 h-8 text-foreground mx-auto mb-3" />
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Email</p>
                  <a href="mailto:support@dekord.online" className="text-base font-semibold text-foreground hover:underline">
                    support@dekord.online
                  </a>
                </div>

                <div className="p-6 border border-border/50 rounded-2xl bg-muted/20 text-center">
                  <Package className="w-8 h-8 text-foreground mx-auto mb-3" />
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Phone</p>
                  <a href="tel:+923390166442" className="text-base font-semibold text-foreground hover:underline">
                    +92 339 0166442
                  </a>
                </div>

                <div className="p-6 border border-border/50 rounded-2xl bg-muted/20 text-center md:col-span-1">
                  <Globe className="w-8 h-8 text-foreground mx-auto mb-3" />
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Address</p>
                  <p className="text-sm font-semibold text-foreground">
                    Peshawar, Pakistan
                  </p>
                </div>
              </div>

              <div className="p-6 border border-border/50 rounded-2xl bg-muted/20 mb-8">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider text-center">Full Return Address</p>
                <p className="text-base font-semibold text-foreground text-center">
                  A2 Third Floor, New Dil Jan Plaza,<br />
                  Achini Ring Road, Peshawar 25000, Pakistan
                </p>
              </div>

              <div className="text-center">
                <a 
                  href="mailto:support@dekord.online"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background rounded-2xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  <MessageSquare className="w-6 h-6" />
                  File a Warranty Claim
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Trust Banner */}
      <section className="py-20 relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl blur-3xl opacity-10 bg-foreground" />
              <div className="relative p-12 border-2 border-border rounded-3xl bg-card shadow-xl">
                <Award className="w-16 h-16 text-foreground mx-auto mb-6" />
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Industry-Leading 1-Year Warranty
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  We stand behind every product we make. This comprehensive warranty is our commitment to quality, durability, and your complete satisfaction. When you choose dekord, you're choosing products built to last.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
