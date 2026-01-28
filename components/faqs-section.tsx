"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    value: "return-policy",
    question: "What is the return policy?",
    answer: (
      <>
        At dekord, our goal is for every customer to be fully satisfied with their purchase. If for any reason you are
        not happy with your cable, you have <span className="font-semibold">30 days from receiving your order</span> to
        request a return. Simply contact us at <span className="font-mono">support@dekord.online</span> and we’ll guide
        you through the process.
      </>
    ),
  },
  {
    value: "delivery-time",
    question: "When will I get my order?",
    answer: (
      <>
        We process and ship orders as quickly as possible. Once your order has been dispatched, you’ll receive a
        tracking email with all the details. Delivery times usually take{" "}
        <span className="font-semibold">3 to 5 days</span> within Pakistan.
      </>
    ),
  },
  {
    value: "manufactured",
    question: "Where are your products manufactured?",
    answer: (
      <>
        dekord products are designed and manufactured in Peshawar, Pakistan. We carefully select our materials and
        production methods to ensure every cable meets our standards of{" "}
        <span className="font-semibold">premium quality, durability, and safety</span>.
      </>
    ),
  },
  {
    value: "shipping-cost",
    question: "How much does shipping cost?",
    answer: (
      <>
        We keep it simple — all orders across Pakistan ship for a{" "}
        <span className="font-semibold">flat rate of Rs. 200</span>, no matter the size or location. This way, you
        always know exactly what you’ll pay before checkout.
      </>
    ),
  },
  {
    value: "fast-charging",
    question: "Do dekord cables support fast charging?",
    answer: (
      <>
        Yes, dekord cables are fully compliant with <span className="font-semibold">USB-C Power Delivery (PD)</span>{" "}
        standards, supporting up to <span className="font-semibold">60W charging (20V/3A)</span>. This means they can
        safely and efficiently charge smartphones, tablets, and even many laptops.
      </>
    ),
  },
  {
    value: "compatibility",
    question: "Are dekord cables compatible with all devices?",
    answer: (
      <>
        Our cables work with all USB-C enabled devices, including Android phones, iPads, MacBooks, Windows laptops,
        power banks, and accessories. If your device supports USB-C PD, Dekord ensures optimal charging speed.
      </>
    ),
  },
  {
    value: "iphone",
    question: "Will dekord cables work with my iPhone?",
    answer: (
      <>
        For iPhone 15 series and later (USB-C models), Dekord cables are fully compatible. For older iPhone models with
        Lightning ports, you’ll need a USB-C to Lightning cable.
      </>
    ),
  },
]

export function FAQsSection() {
  return (
    <section aria-labelledby="faqs-title" className="w-full ">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 py-12 sm:py-16 md:py-24">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-12">
          {/* Left column: small prompt, big stacked headline, hotline */}
          <header className="md:col-span-5">
            <p className="text-base sm:text-lg md:text-xl text-foreground/60">Got Questions?</p>
            <h3
              id="faqs-title"
              className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight text-foreground uppercase leading-tight"
            >
              Frequently Asked
              <br />
              Questions
            </h3>
            <div className="mt-6 sm:mt-8 md:mt-10">
              <p className="text-sm sm:text-base font-semibold text-foreground">Call Now</p>
              <p className="text-base sm:text-lg md:text-xl text-foreground/80">Hotline: +92 339-0166442</p>
            </div>
          </header>

          {/* Right column: rounded "card" accordion items with + / - toggle */}
          <div className="md:col-span-7">
            <Accordion type="single" collapsible className="space-y-1">
              {faqs.map((item) => (
                <AccordionItem
                  key={item.value}
                  value={item.value}
                  className="overflow-hidden rounded-xl ring-1 ring-border/60 bg-muted/50"
                >
                  <AccordionTrigger
                    className="
                      no-underline
                      group flex w-full items-center justify-between gap-2
                      p-4 sm:p-5 md:p-6 text-left
                      hover:bg-muted
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20
                      [&[data-state=open]>div_.plus]:opacity-0
                      [&[data-state=open]>div_.minus]:opacity-100
                    "
                  >
                    <span className="text-sm sm:text-base text-foreground">{item.question}</span>
                  </AccordionTrigger>

                  <AccordionContent className="px-4 sm:px-5 md:px-6 pb-5 sm:pb-6 pt-0 text-sm sm:text-base text-foreground/80 leading-relaxed">
                    <div>{item.answer}</div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
