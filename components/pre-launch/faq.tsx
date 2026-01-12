"use client"

import { useState } from "react"
import { Reveal } from "../reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    value: "pre-launch-program",
    question: "What is the pre-launch program?",
    answer: "Our pre-launch program gives you exclusive early access to dekord cables before the official launch. You'll get special pricing (30% off), free premium stickers, lifetime warranty, and priority shipping. It's our way of rewarding early supporters who believe in our vision."
  },
  {
    value: "delivery-time",
    question: "When will I receive my order?",
    answer: "Pre-launch orders will begin shipping on February 25, 2026, with delivery expected between March 1-5, 2026. All orders include express shipping across Pakistan with real-time tracking. Early subscribers get priority processing."
  },
  {
    value: "discount-details",
    question: "What's included in the pre-launch discount?",
    answer: "Pre-launch subscribers save 30% on all products. Our W-60 cables drop from Rs. 1,299 to Rs. 899, and W-100 cables from Rs. 1,799 to Rs. 1,259. Plus, you get free shipping, premium stickers, and lifetime warranty - exclusively for early birds."
  },
  {
    value: "cancel-order",
    question: "Can I change or cancel my pre-order?",
    answer: "Yes! You can modify or cancel your pre-order anytime before February 20, 2026. Simply contact our support team at support@dekord.online or through our contact page. We want you to be 100% confident in your purchase."
  },
  {
    value: "different",
    question: "What makes dekord cables different?",
    answer: "dekord cables feature premium braided nylon construction, 60W-100W power delivery, universal USB-C compatibility, and aerospace-grade aluminum connectors with gold-plated contacts. They're tested for 25,000+ bends and designed to be both incredibly durable and beautifully styled. Made in Pakistan with love."
  },
  {
    value: "warranty",
    question: "Is the lifetime warranty really lifetime?",
    answer: "Absolutely! Pre-launch customers receive our exclusive lifetime warranty that covers manufacturing defects and normal wear and tear for the entire life of the product. If your cable fails under normal use, we'll replace it - no questions asked. This warranty is transferable if you gift the cable."
  },
  {
    value: "compatibility",
    question: "Which devices are compatible?",
    answer: "dekord cables work with all USB-C devices including iPhone 15/16 series, Samsung Galaxy, Google Pixel, MacBook Pro/Air, iPad Pro/Air, Nintendo Switch, and more. Our W-60 cables deliver 60W (perfect for phones and tablets), while W-100 cables deliver 100W (ideal for laptops)."
  },
  {
    value: "shipping",
    question: "Do you ship outside Pakistan?",
    answer: "Currently, pre-launch is available only in Pakistan with free express shipping. We're planning international shipping soon! Subscribe to our newsletter to be notified when we expand globally. For international inquiries, contact us at hello@dekord.online."
  },
  {
    value: "tracking",
    question: "How do I track my order?",
    answer: "Once your order ships (starting Feb 25), you'll receive an email with your tracking number and a link to track your package in real-time. You can also log into your account on our website to view your order status and shipping updates."
  },
  {
    value: "payment",
    question: "What payment methods do you accept?",
    answer: "We accept all major payment methods including credit/debit cards (Visa, Mastercard), JazzCash, EasyPaisa, and bank transfers. All transactions are secured with industry-standard encryption. You'll only be charged when you place your order, not when you subscribe to updates."
  }
]

export function PreLaunchFAQ() {
  return (
    <section className="py-8 sm:py-14 lg:py-18 bg-background">
      <div className="container-custom px-4 sm:px-6 md:px-8">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-12">
          {/* Left column: header */}
          <header className="md:col-span-5">
            <Reveal>
              <p className="text-base sm:text-lg md:text-xl text-neutral-600">Got Questions?</p>
              <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 uppercase leading-tight">
                Frequently Asked
                <br />
                <span className="italic font-light">Questions</span>
              </h2>
              <div className="mt-6 sm:mt-8 md:mt-10">
                <p className="text-sm sm:text-base font-semibold text-neutral-900">Call Now</p>
                <p className="text-base sm:text-lg md:text-xl text-neutral-700">Hotline: +92 339-0166442</p>
              </div>
            </Reveal>
          </header>

          {/* Right column: accordion */}
          <div className="md:col-span-7">
            <Accordion type="single" collapsible className="space-y-1">
              {faqs.map((item, index) => (
                <Reveal key={item.value} delay={index * 0.05}>
                  <AccordionItem
                    value={item.value}
                    className="overflow-hidden rounded-xl ring-1 ring-border/60 bg-muted/50"
                  >
                    <AccordionTrigger className="no-underline group flex w-full items-center justify-between gap-2 p-4 sm:p-5 md:p-6 text-left hover:bg-muted">
                      <span className="text-sm sm:text-base text-foreground">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 sm:px-5 md:px-6 pb-5 sm:pb-6 pt-0 text-sm sm:text-base text-foreground/80 leading-relaxed">
                      <div>{item.answer}</div>
                    </AccordionContent>
                  </AccordionItem>
                </Reveal>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Contact CTA */}
        <Reveal delay={0.5}>
          <div className="mt-10 sm:mt-14 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-6 bg-white rounded-3xl" style={{
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px"
            }}>
              <p className="text-neutral-600">
                Still have questions? We&apos;re here to help!
              </p>
              <a
                href="/contact"
                className="px-6 py-3 bg-neutral-900 text-white font-semibold rounded-full hover:bg-neutral-800 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
