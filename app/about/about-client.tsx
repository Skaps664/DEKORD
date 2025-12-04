"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { 
  Zap, 
  Target, 
  Heart, 
  Lightbulb, 
  Rocket, 
  Users, 
  Award,
  ShieldCheck,
  Cpu,
  TrendingUp,
  Sparkles,
  Globe,
  Box,
  ArrowRight
} from "lucide-react"

export function AboutPageClient() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const stats = [
    { number: "1K+", label: "Community Responses", icon: Users },
    { number: "15+", label: "Experiments Conducted", icon: Box },
    { number: "99.9%", label: "Uptime Guarantee", icon: ShieldCheck },
    { number: "24/7", label: "Customer Support", icon: Heart },
  ]

  const values = [
    {
      icon: Zap,
      title: "Innovation First",
      description: "We don't just follow trends – we create them. Every product is engineered with cutting-edge technology to push the boundaries of what's possible.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Heart,
      title: "Passion for Quality",
      description: "We're obsessed with perfection. Every cable, every connector, every detail is crafted with love and tested to withstand the toughest conditions.",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: Target,
      title: "Customer Focused",
      description: "Your satisfaction drives everything we do. We listen, we adapt, and we deliver products that exceed expectations every single time.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Lightbulb,
      title: "Creative Solutions",
      description: "Problems are just opportunities in disguise. We bring fresh perspectives and innovative thinking to solve real-world tech challenges.",
      gradient: "from-purple-500 to-indigo-500"
    },
  ]

  const milestones = [
    {
      year: "2023",
      title: "The Beginning",
      description: "Started with a simple question: Why do charging cables always break? We set out to change that."
    },
    {
      year: "2025",
      title: "First Product Launch",
      description: "Released our flagship braided cables with 1 Year warranty. Customers loved the durability and style."
    },
    {
      year: "2026",
      title: "Going Global",
      description: "Expanded to international markets. Now shipping premium tech gadgets worldwide with the same quality promise."
    },
    {
      year: "2027",
      title: "Future Vision",
      description: "Planning to launch our own line of smart accessories and IoT devices. The future is exciting!"
    },
  ]

  const team = [
    {
      role: "Founder & Visionary",
      description: "Turning ideas into reality, one cable at a time",
      icon: Rocket
    },
    {
      role: "Product Engineers",
      description: "Crafting durability with precision engineering",
      icon: Cpu
    },
    {
      role: "Customer Success",
      description: "Making sure you're always charged and ready",
      icon: Heart
    },
    {
      role: "Growth Team",
      description: "Spreading the dekord revolution worldwide",
      icon: TrendingUp
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <Image
            src="/images/design-mode/u3195299943_une_vue_sur_lespace_toil_--ar_11_--sref_httpss.mj_f1cd1575-c301-46fa-8b30-665ae1ab22a0_3_bloom_subtle_6x.png.jpeg"
            alt="dekord About"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </motion.div>

        <div className="container-custom relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full blur-2xl opacity-50 animate-pulse" />
                <div className="relative px-6 py-3 bg-foreground/10 backdrop-blur-sm rounded-full border border-white/20">
                  <span className="text-sm font-semibold text-white uppercase tracking-wider">
                    About dekord
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-white"
            >
              REDEFINING
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                TECH STANDARDS
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              We're not just another tech brand. We're a team of passionate creators, engineers, and dreamers who believe that everyday gadgets should be extraordinary. Every product we make is a testament to our commitment to quality, innovation, and your satisfaction.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link 
                href="/catalog"
                className="group px-8 py-4 bg-white text-black rounded-full font-semibold hover:shadow-2xl hover:shadow-white/20 transition-all flex items-center gap-2"
              >
                Shop Our Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-all"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-foreground/20 to-foreground/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative w-16 h-16 bg-foreground/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <stat.icon className="w-8 h-8 text-foreground" />
                  </div>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {stat.number}
                </h3>
                <p className="text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Our Story
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              It started with frustration. You know the feeling – another cable frayed, another connection failed, another overpriced accessory that didn't last a month. We thought: <span className="text-foreground font-semibold">there has to be a better way.</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-3xl blur-3xl" />
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-border/50">
                  <Image
                    src="/her-2.webp"
                    alt="dekord Story"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Born from Necessity
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We're not just selling cables – we're solving a problem that's frustrated millions. Our team spent months testing materials, perfecting designs, and pushing the limits of durability. The result? Products that actually last.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Driven by Passion
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every member of our team is a tech enthusiast. We live and breathe gadgets, we understand your needs because we share them. This isn't just business – it's our mission to elevate your tech experience.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Building the Future
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We're just getting started. From premium cables to smart accessories, we're expanding our lineup with products that combine innovation, style, and unmatched reliability. The future of tech is here.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative overflow-hidden bg-muted/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              What We Stand For
            </h2>
            <p className="text-lg text-muted-foreground">
              Our values aren't just words on a page – they're the foundation of everything we create
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
                <div className="relative p-8 border border-border/50 rounded-3xl bg-card hover:border-foreground/20 transition-all duration-300">
                  <div className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground">
              From a bold idea to a growing movement – here's how we're changing the game
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 md:pl-12 pb-12 border-l-2 border-border/50 last:border-transparent group"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 group-hover:scale-125 transition-transform" />
                <div className="space-y-2">
                  <span className="inline-block px-4 py-1 bg-foreground/10 rounded-full text-sm font-bold text-foreground">
                    {milestone.year}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative overflow-hidden bg-muted/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              The Team Behind dekord
            </h2>
            <p className="text-lg text-muted-foreground">
              A diverse crew united by one mission: creating tech products that actually work
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative p-6 border border-border/50 rounded-3xl bg-card hover:border-foreground/20 transition-all duration-300 text-center">
                  <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-foreground/10 to-foreground/5 items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <member.icon className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {member.role}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-20 relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 rounded-3xl blur-3xl" />
              <div className="relative p-12 md:p-16 border border-border/50 rounded-3xl bg-card text-center">
                <Sparkles className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                  The Future is Bright
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
                  We're working on revolutionary products that will change how you interact with technology. Smart charging solutions, IoT accessories, and innovative gadgets that seamlessly integrate into your life. Stay tuned – the best is yet to come.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link 
                    href="/catalog"
                    className="group px-8 py-4 bg-foreground text-background rounded-full font-semibold hover:shadow-2xl hover:shadow-foreground/20 transition-all flex items-center gap-2"
                  >
                    <Globe className="w-5 h-5" />
                    Explore Products
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    href="/contact"
                    className="px-8 py-4 border-2 border-foreground/20 text-foreground rounded-full font-semibold hover:bg-foreground/5 transition-all"
                  >
                    Join Our Journey
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
