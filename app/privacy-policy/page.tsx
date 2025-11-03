"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ShieldCheck, Eye, Lock, Users, Database, FileText, Globe, UserCheck, MessageSquare } from "lucide-react"

export default function PrivacyPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const sections = [
    {
      icon: Database,
      title: "Personal Information We Collect or Process",
      content: [
        {
          subtitle: "What is Personal Information?",
          text: "When we use the term \"personal information,\" we are referring to information that identifies or can reasonably be linked to you or another person. Personal information does not include information that is collected anonymously or that has been de-identified, so that it cannot identify or be reasonably linked to you."
        },
        {
          subtitle: "Categories of Information We Collect",
          list: [
            "Contact details including your name, address, billing address, shipping address, phone number, and email address",
            "Financial information including credit card, debit card, and financial account numbers, payment card information, transaction details, and form of payment",
            "Account information including your username, password, security questions, preferences and settings",
            "Transaction information including the items you view, put in your cart, add to your wishlist, or purchase, return, exchange or cancel",
            "Communications with us including the information you include when sending customer support inquiries",
            "Device information including information about your device, browser, network connection, IP address, and other unique identifiers",
            "Usage information including how and when you interact with or navigate the Services"
          ]
        }
      ]
    },
    {
      icon: Eye,
      title: "Personal Information Sources",
      content: [
        {
          text: "We may collect personal information from the following sources:",
          list: [
            "Directly from you including when you create an account, visit or use the Services, communicate with us, or otherwise provide us with your personal information",
            "Automatically through the Services including from your device when you use our products or services or visit our websites, and through the use of cookies and similar technologies",
            "From our service providers including when we engage them to enable certain technology and when they collect or process your personal information on our behalf",
            "From our partners or other third parties"
          ]
        }
      ]
    },
    {
      icon: FileText,
      title: "How We Use Your Personal Information",
      content: [
        {
          subtitle: "Provide, Tailor, and Improve the Services",
          text: "We use your personal information to provide you with the Services, including to perform our contract with you, to process your payments, to fulfill your orders, to remember your preferences and items you are interested in, to send notifications to you related to your account, to process purchases, returns, exchanges or other transactions, to create, maintain and otherwise manage your account, to arrange for shipping, to facilitate any returns and exchanges, to enable you to post reviews, and to create a customized shopping experience for you."
        },
        {
          subtitle: "Marketing and Advertising",
          text: "We use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you online advertisements for products or services on the Services or other websites, including based on items you previously have purchased or added to your cart and other activity on the Services."
        },
        {
          subtitle: "Security and Fraud Prevention",
          text: "We use your personal information to authenticate your account, to provide a secure payment and shopping experience, detect, investigate or take action regarding possible fraudulent, illegal, unsafe, or malicious activity, protect public safety, and to secure our services. If you choose to use the Services and register an account, you are responsible for keeping your account credentials safe. We highly recommend that you do not share your username, password or other access details with anyone else."
        },
        {
          subtitle: "Communicating with You",
          text: "We use your personal information to provide you with customer support, to be responsive to you, to provide effective services to you and to maintain our business relationship with you."
        },
        {
          subtitle: "Legal Reasons",
          text: "We use your personal information to comply with applicable law or respond to valid legal process, including requests from law enforcement or government agencies, to investigate or participate in civil discovery, potential or actual litigation, or other adversarial legal proceedings, and to enforce or investigate potential violations of our terms or policies."
        }
      ]
    },
    {
      icon: Users,
      title: "How We Disclose Personal Information",
      content: [
        {
          text: "In certain circumstances, we may disclose your personal information to third parties for legitimate purposes subject to this Privacy Policy. Such circumstances may include:",
          list: [
            "With Shopify, vendors and other third parties who perform services on our behalf (e.g. IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping)",
            "With business and marketing partners to provide marketing services and advertise to you. For example, we use Shopify to support personalized advertising with third-party services based on your online activity with different merchants and websites",
            "When you direct, request us or otherwise consent to our disclosure of certain information to third parties, such as to ship you products or through your use of social media widgets or login integrations",
            "With our affiliates or otherwise within our corporate group",
            "In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations (including to respond to subpoenas, search warrants and similar requests), to enforce any applicable terms of service or policies, and to protect or defend the Services, our rights, and the rights of our users or others"
          ]
        }
      ]
    },
    {
      icon: Globe,
      title: "Relationship with Shopify",
      content: [
        {
          text: "The Services are hosted by Shopify, which collects and processes personal information about your access to and use of the Services in order to provide and improve the Services for you. Information you submit to the Services will be transmitted to and shared with Shopify as well as third parties that may be located in countries other than where you reside, in order to provide and improve the Services for you."
        },
        {
          text: "In addition, to help protect, grow, and improve our business, we use certain Shopify enhanced features that incorporate data and information obtained from your interactions with our Store, along with other merchants and with Shopify. To provide these enhanced features, Shopify may make use of personal information collected about your interactions with our store, along with other merchants, and with Shopify."
        },
        {
          text: "In these circumstances, Shopify is responsible for the processing of your personal information, including for responding to your requests to exercise your rights over use of your personal information for these purposes. To learn more about how Shopify uses your personal information and any rights you may have, you can visit the Shopify Consumer Privacy Policy. Depending on where you live, you may exercise certain rights with respect to your personal information at the Shopify Privacy Portal."
        }
      ]
    },
    {
      icon: Lock,
      title: "Security and Retention of Your Information",
      content: [
        {
          text: "Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee \"perfect security.\" In addition, any information you send to us may not be secure while in transit. We recommend that you do not use unsecure channels to communicate sensitive or confidential information to us."
        },
        {
          text: "How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide you with Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies."
        }
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights and Choices",
      content: [
        {
          text: "Depending on where you live, you may have some or all of the rights listed below in relation to your personal information. However, these rights are not absolute, may apply only in certain circumstances and, in certain cases, we may decline your request as permitted by law.",
          list: [
            "Right to Access / Know: You may have a right to request access to personal information that we hold about you",
            "Right to Delete: You may have a right to request that we delete personal information we maintain about you",
            "Right to Correct: You may have a right to request that we correct inaccurate personal information we maintain about you",
            "Right of Portability: You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party, in certain circumstances and with certain exceptions",
            "Managing Communication Preferences: We may send you promotional emails, and you may opt out of receiving these at any time by using the unsubscribe option displayed in our emails to you. If you opt out, we may still send you non-promotional emails, such as those about your account or orders that you have made"
          ]
        },
        {
          text: "You may exercise any of these rights where indicated on the Services or by contacting us using the contact details provided below. To learn more about how Shopify uses your personal information and any rights you may have, including rights related to data processed by Shopify, you can visit https://privacy.shopify.com/en."
        },
        {
          text: "We will not discriminate against you for exercising any of these rights. We may need to verify your identity before we can process your requests, as permitted or required under applicable law. In accordance with applicable laws, you may designate an authorized agent to make requests on your behalf to exercise your rights."
        }
      ]
    }
  ]

  const additionalSections = [
    {
      title: "Third Party Websites and Links",
      text: "The Services may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites, including the accuracy, completeness, or reliability of information found on these sites. Information you provide on public or semi-public venues, including information you share on third-party social networking platforms may also be viewable by other users of the Services and/or users of those third-party platforms without limitation as to its use by us or by a third party."
    },
    {
      title: "Children's Data",
      text: "The Services are not intended to be used by children, and we do not knowingly collect any personal information about children under the age of majority in your jurisdiction. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the contact details set out below to request that it be deleted. As of the Effective Date of this Privacy Policy, we do not have actual knowledge that we \"share\" or \"sell\" (as those terms are defined in applicable law) personal information of individuals under 16 years of age."
    },
    {
      title: "Complaints",
      text: "If you have complaints about how we process your personal information, please contact us using the contact details provided below. Depending on where you live, you may have the right to appeal our decision by contacting us using the contact details set out below, or lodge your complaint with your local data protection authority."
    },
    {
      title: "International Transfers",
      text: "Please note that we may transfer, store and process your personal information outside the country you live in. If we transfer your personal information out of the European Economic Area or the United Kingdom, we will rely on recognized transfer mechanisms like the European Commission's Standard Contractual Clauses, or any equivalent contracts issued by the relevant competent authority of the UK, as relevant, unless the data transfer is to a country that has been determined to provide an adequate level of protection."
    },
    {
      title: "Changes to This Privacy Policy",
      text: "We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on this website, update the \"Last updated\" date and provide notice as required by applicable law."
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
                <ShieldCheck className="w-10 h-10 text-foreground" />
              </div>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-foreground">
              PRIVACY POLICY
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-muted-foreground mb-6"
            >
              Last updated: September 24, 2025
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              dekord operates this store and website, including all related information, content, features, tools, products and services, in order to provide you, the customer, with a curated shopping experience (the "Services"). This Privacy Policy describes how we collect, use, and disclose your personal information when you visit, use, or make a purchase using the Services.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 p-6 border border-border/50 rounded-2xl bg-muted/30 max-w-2xl mx-auto"
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">Please read this Privacy Policy carefully.</span> By using and accessing any of the Services, you acknowledge that you have read this Privacy Policy and understand the collection, use, and disclosure of your information as described in this Privacy Policy.
              </p>
            </motion.div>
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
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl border border-border bg-card shadow-md flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {section.content.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="space-y-4"
                      >
                        {item.subtitle && (
                          <h3 className="text-lg font-semibold text-foreground">
                            {item.subtitle}
                          </h3>
                        )}
                        
                        {item.text && (
                          <p className="text-muted-foreground leading-relaxed">
                            {item.text}
                          </p>
                        )}

                        {item.list && (
                          <ul className="space-y-3">
                            {item.list.map((listItem, listIdx) => (
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="py-20 relative bg-muted/10">
        <div className="container-custom">
          <div className="space-y-8 max-w-5xl mx-auto">
            {additionalSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-8 border border-border/50 rounded-2xl bg-card hover:shadow-lg transition-all"
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {section.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {section.text}
                </p>
              </motion.div>
            ))}
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
            <div className="p-12 md:p-16 border border-border/50 rounded-3xl bg-card shadow-xl text-center">
              <div className="w-16 h-16 rounded-2xl border border-border bg-muted/50 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Contact Us
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please contact us:
              </p>
              <a 
                href="mailto:support@dekord.online"
                className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-2xl font-semibold hover:shadow-xl transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                support@dekord.online
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
