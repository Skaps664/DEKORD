"use client"

import { Reveal } from "@/components/reveal"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} width="20" height="20">
      <circle cx="12" cy="12" r="10" className="fill-emerald-500" />
      <path
        d="M7 12.5l3 3 7-7"
        className="stroke-white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} width="20" height="20">
      <circle cx="12" cy="12" r="10" className="fill-red-500" />
      <path
        d="M8 8l8 8M16 8l-8 8"
        className="stroke-white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const DEFAULT_FEATURES = [
  "Durability Tested",
  "100% Pure Copper",
  "Double-Layer Insulation",
  "Reinforced  Joints",
  "High-Density Braided",
  "Stable PD Chipset",
]

interface ComparisonSectionProps {
  heading?: string
  subheading?: string
  features?: string[]
}

export function ComparisonSection({ heading, subheading, features }: ComparisonSectionProps) {
  const featureList = features && features.length > 0 ? features : DEFAULT_FEATURES
  const title = heading || "REDEFINING THE STANDARD"
  const subtitle = subheading || "Not all cables are created equal. Here's why we stand apart."

  return (
    <section className="py-8 sm:py-14 lg:py-18" id="comparison">
      <div className="container-custom px-2 sm:px-2 md:px-3 overflow-x-hidden">
        <Reveal>
          <header className="text-center mb-8 sm:mb-10 lg:mb-14">
            <h2 className="text-foreground text-2xl sm:text-3xl lg:text-5xl font-semibold tracking-wide">
              {title}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto px-4 leading-relaxed">
              {subtitle}
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-x-auto max-w-full rounded-2xl border border-border bg-background">
            <Table className="text-sm sm:text-base w-full max-w-full table-fixed min-w-[320px]">
              <colgroup>
                <col className="w-[45%] md:w-auto" />
                <col className="w-[27.5%] md:w-auto" />
                <col className="w-[27.5%] md:w-auto" />
              </colgroup>
              <TableHeader>
                <TableRow className="border-b border-border bg-muted/20">
                  <TableHead className="py-4 text-muted-foreground px-2 lg:px-4">Feature</TableHead>
                  <TableHead className="py-4 text-center text-foreground px-2 lg:px-4 text-xs sm:text-sm lg:text-base font-semibold uppercase tracking-[0.14em]">
                    Ours
                  </TableHead>
                  <TableHead className="py-4 text-center text-foreground px-2 lg:px-4 text-xs sm:text-sm lg:text-base font-semibold uppercase tracking-[0.14em]">
                    Others
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {featureList.map((label) => (
                  <TableRow key={label} className="border-b border-border/70 last:border-b-0 hover:bg-muted/20 transition-colors">
                    <TableCell className="py-5 text-foreground px-2 lg:px-4 text-sm lg:text-base">{label}</TableCell>
                    <TableCell className="py-5 px-2 lg:px-4">
                      <div className="flex items-center justify-center">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
                          <CheckIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                        </span>
                        <span className="sr-only">{"Included in our product"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 px-2 lg:px-4">
                      <div className="flex items-center justify-center">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
                          <XIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                        </span>
                        <span className="sr-only">{"Not included in market products"}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default ComparisonSection
