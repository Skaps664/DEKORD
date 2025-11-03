"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { FileCheck, ShoppingCart, CreditCard, Package, Shield, AlertTriangle, Scale, Users, Globe, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const sections = [
    {
      number: "1",
      icon: Users,
      title: "Access and Account",
      content: [
        "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, and you have given us your consent to allow any of your minor dependents to use the Services on devices you own, purchase or manage.",
        "To use the Services, including accessing or browsing our online stores or purchasing any of the products or services we offer, you may be asked to provide certain information, such as your email address, billing, payment, and shipping information. You represent and warrant that all the information you provide in our stores is correct, current and complete and that you have all rights necessary to provide this information.",
        "You are solely responsible for maintaining the security of your account credentials and for all of your account activity. You may not transfer, sell, assign, or license your account to any other person."
      ]
    },
    {
      number: "2",
      icon: ShoppingCart,
      title: "Our Products",
      content: [
        "We have made every effort to provide an accurate representation of our products and services in our online stores. However, please note that colors or product appearance may differ from how they may appear on your screen due to the type of device you use to access the store and your device settings and configuration.",
        "We do not warrant that the appearance or quality of any products or services purchased by you will meet your expectations or be the same as depicted or rendered in our online stores.",
        "All descriptions of products are subject to change at any time without notice at our sole discretion. We reserve the right to discontinue any product at any time and may limit the quantities of any products that we offer to any person, geographic region or jurisdiction, on a case-by-case basis."
      ]
    },
    {
      number: "3",
      icon: FileCheck,
      title: "Orders",
      content: [
        "When you place an order, you are making an offer to purchase. dekord reserves the right to accept or decline your order for any reason at its discretion. Your order is not accepted until dekord confirms acceptance. We must receive and process your payment before your order is accepted. Please review your order carefully before submitting, as dekord may be unable to accommodate cancellation requests after an order is accepted.",
        "In the event that we do not accept, make a change to, or cancel an order, we will attempt to notify you by contacting the e‑mail, billing address, and/or phone number provided at the time the order was made.",
        "Your purchases are subject to return or exchange solely in accordance with our Refund Policy.",
        "You represent and warrant that your purchases are for your own personal or household use and not for commercial resale or export."
      ]
    },
    {
      number: "4",
      icon: CreditCard,
      title: "Prices and Billing",
      content: [
        "Prices, discounts and promotions are subject to change without notice. The price charged for a product or service will be the price in effect at the time the order is placed and will be set out in your order confirmation email. Unless otherwise expressly stated, posted prices do not include taxes, shipping, handling, customs or import charges.",
        "Prices posted in our online stores may be different from prices offered in physical stores or in online or other stores operated by third parties. We may offer, from time to time, promotions on the Services that may affect pricing and that are governed by terms and conditions separate from these Terms.",
        "You agree to provide current, complete and accurate purchase, payment and account information for all purchases made at our stores. You agree to promptly update your account and other information, including your email address, credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.",
        "You represent and warrant that (i) the credit card information you provide is true, correct, and complete, (ii) you are duly authorized to use such credit card for the purchase, (iii) charges incurred by you will be honored by your credit card company, and (iv) you will pay charges incurred by you at the posted prices, including shipping and handling charges and all applicable taxes, if any."
      ]
    },
    {
      number: "5",
      icon: Package,
      title: "Shipping and Delivery",
      content: [
        "We are not liable for shipping and delivery delays. All delivery times are estimates only and are not guaranteed. We are not responsible for delays caused by shipping carriers, customs processing, or events outside our control. Once we transfer products to the carrier, title and risk of loss passes to you."
      ]
    },
    {
      number: "6",
      icon: Shield,
      title: "Intellectual Property",
      content: [
        "Our Services, including but not limited to all trademarks, brands, text, displays, images, graphics, product reviews, video, and audio, and the design, selection, and arrangement thereof, are owned by dekord, its affiliates or licensors and are protected by U.S. and foreign patent, copyright and other intellectual property laws.",
        "These Terms permit you to use the Services for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on the Services without our prior written consent.",
        "dekord's names, logos, product and service names, designs, and slogans are trademarks of dekord or its affiliates or licensors. You must not use such trademarks without the prior written permission of dekord. Shopify's name, logo, product and service names, designs and slogans are trademarks of Shopify. All other names, logos, product and service names, designs, and slogans on the Services are the trademarks of their respective owners."
      ]
    },
    {
      number: "7",
      icon: Globe,
      title: "Third-Party Links",
      content: [
        "The Services may contain materials and hyperlinks to websites provided or operated by third parties (including any embedded third party functionality). We are not responsible for examining or evaluating the content or accuracy of any third-party materials or websites you choose to access. If you decide to leave the Services to access these materials or third party sites, you do so at your own risk.",
        "We are not liable for any harm or damages related to your access of any third-party websites, or your purchase or use of any products, services, resources, or content on any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction."
      ]
    },
    {
      number: "8",
      icon: AlertTriangle,
      title: "Prohibited Uses",
      content: [
        "You may access and use the Services for lawful purposes only. You may not access or use the Services, directly or indirectly: (a) for any unlawful or malicious purpose; (b) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (c) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (d) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or harm any of our employees or any other person; (e) to transmit false or misleading information; (f) to impersonate or attempt to impersonate any other person or entity.",
        "In addition, you agree not to: (a) upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Services; (b) reproduce, duplicate, copy, sell, resell or exploit any portion of the Services; (c) collect or track the personal information of others; (d) spam, phish, pharm, pretext, spider, crawl, or scrape; or (e) interfere with or circumvent the security features of the Services or any related website, other websites, or the Internet.",
        "We reserve the right to suspend, disable, or terminate your account at any time, without notice, if we determine that you have violated any part of these Terms."
      ]
    },
    {
      number: "9",
      icon: Scale,
      title: "Disclaimer of Warranties",
      content: [
        "The information presented on or through the Services is made available solely for general information purposes. We do not warrant the accuracy, completeness, or usefulness of this information. Any reliance you place on such information is strictly at your own risk.",
        "EXCEPT AS EXPRESSLY STATED BY dekord, THE SERVICES AND ALL PRODUCTS OFFERED THROUGH THE SERVICES ARE PROVIDED 'AS IS' AND 'AS AVAILABLE' FOR YOUR USE, WITHOUT ANY REPRESENTATION, WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, MERCHANTABLE QUALITY, FITNESS FOR A PARTICULAR PURPOSE, DURABILITY, TITLE, AND NON-INFRINGEMENT.",
        "WE DO NOT GUARANTEE, REPRESENT OR WARRANT THAT YOUR USE OF THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE OR ERROR-FREE. SOME JURISDICTIONS LIMIT OR DO NOT ALLOW THE DISCLAIMER OF IMPLIED OR OTHER WARRANTIES SO THE ABOVE DISCLAIMER MAY NOT APPLY TO YOU."
      ]
    },
    {
      number: "10",
      icon: Shield,
      title: "Limitation of Liability",
      content: [
        "TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO CASE SHALL dekord, OUR PARTNERS, DIRECTORS, OFFICERS, EMPLOYEES, AFFILIATES, AGENTS, CONTRACTORS, SERVICE PROVIDERS OR LICENSORS, OR THOSE OF SHOPIFY AND ITS AFFILIATES, BE LIABLE FOR ANY INJURY, LOSS, CLAIM, OR ANY DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, SPECIAL, OR CONSEQUENTIAL DAMAGES OF ANY KIND, INCLUDING, WITHOUT LIMITATION, LOST PROFITS, LOST REVENUE, LOST SAVINGS, LOSS OF DATA, REPLACEMENT COSTS, OR ANY SIMILAR DAMAGES, WHETHER BASED IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY OR OTHERWISE, ARISING FROM YOUR USE OF ANY OF THE SERVICES OR ANY PRODUCTS PROCURED USING THE SERVICES."
      ]
    }
  ]

  const contactInfo = [
    { label: "Founder & CEO", value: "M. Sudais Khan" },
    { label: "Trade Name", value: "dekord (SMC-Private) Limited" },
    { label: "Phone", value: "+92 339 0166442" },
    { label: "Email", value: "support@dekord.online" },
    { label: "Address", value: "A2 Third Floor, New Dil Jan Plaza, Achini Ring Road, Peshawar 25000, Pakistan" },
    { label: "NTN Number", value: "H395995" }
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
                <FileCheck className="w-10 h-10 text-foreground" />
              </div>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-foreground">
              TERMS OF SERVICE
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Welcome to dekord! These Terms of Service describe your rights and responsibilities when you use our Services. Please read them carefully.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-6 border border-border/50 rounded-2xl bg-muted/30 max-w-2xl mx-auto"
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                By visiting, interacting with or using our Services, you agree to be bound by these Terms of Service and our <Link href="/privacy-policy" className="font-semibold text-foreground hover:underline">Privacy Policy</Link>. If you do not agree to these Terms, you should not use or access our Services.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 relative bg-muted/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto p-8 border border-border/50 rounded-2xl bg-card"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Overview</h2>
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <p>
                Welcome to dekord! The terms "we", "us" and "our" refer to dekord. dekord operates this store and website, including all related information, content, features, tools, products and services in order to provide you, the customer, with a curated shopping experience (the "Services"). dekord is powered by Shopify, which enables us to provide the Services to you.
              </p>
              <p>
                The below terms and conditions, together with any policies referenced herein (these "Terms of Service" or "Terms") describe your rights and responsibilities when you use the Services.
              </p>
              <p className="font-semibold text-foreground">
                Please read these Terms of Service carefully, as they include important information about your legal rights and cover areas such as warranty disclaimers and limitations of liability.
              </p>
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
                key={section.number}
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
                    <h2 className="text-3xl font-bold text-foreground mb-1">
                      Section {section.number} - {section.title}
                    </h2>
                    
                    <div className="mt-6 space-y-4">
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

      {/* Additional Important Sections */}
      <section className="py-20 relative bg-muted/10">
        <div className="container-custom">
          <div className="space-y-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 border border-border/50 rounded-2xl bg-card hover:shadow-lg transition-all"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Relationship with Shopify
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                dekord is powered by Shopify, which enables us to provide the Services to you. However, any sales and purchases you make in our Store are made directly with dekord. By using the Services, you acknowledge and agree that Shopify is not responsible for any aspect of any sales between you and dekord, including any injury, damage, or loss resulting from purchased products and services. You hereby expressly release Shopify and its affiliates from all claims, damages, and liabilities arising from or related to your purchases and transactions with dekord.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 border border-border/50 rounded-2xl bg-card hover:shadow-lg transition-all"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Privacy Policy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                All personal information we collect through the Services is subject to our <Link href="/privacy-policy" className="font-semibold text-foreground hover:underline">Privacy Policy</Link>. By using the Services, you acknowledge that you have read this privacy policy. Because the Services are hosted by Shopify, Shopify collects and processes personal information about your access to and use of the Services in order to provide and improve the Services for you.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 border border-border/50 rounded-2xl bg-card hover:shadow-lg transition-all"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Changes to Terms of Service
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                You can review the most current version of the Terms of Service at any time on this page. We reserve the right, in our sole discretion, to update, change, or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to the Services following the posting of any changes to these Terms of Service constitutes acceptance of those changes.
              </p>
            </motion.div>
          </div>
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
            <div className="p-12 md:p-16 border border-border/50 rounded-3xl bg-card shadow-xl">
              <div className="w-16 h-16 rounded-2xl border border-border bg-muted/50 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
                Contact Information
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center">
                Questions about the Terms of Service should be sent to us at:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="p-4 border border-border/50 rounded-xl bg-muted/20">
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
                <a 
                  href="mailto:support@dekord.online"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-2xl font-semibold hover:shadow-xl transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  support@dekord.online
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
