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

const FEATURES = [
  "Durability Tested",
  "100% Pure Copper",
  "Double-Layer Insulation",
  "Reinforced  Joints",
  "High-Density Braided",
  "Stable PD Chipset",
]

export function ComparisonSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-28" id="comparison">
  <div className="container-custom px-2 sm:px-2 md:px-3 overflow-x-hidden">
        <Reveal>
          <header className="text-center mb-8 sm:mb-10 lg:mb-14">
            <h2 className="text-neutral-900 text-2xl sm:text-3xl lg:text-5xl font-semibold tracking-wide">
              REDEFINING THE STANDARD
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto px-4">
              Not all cables are created equal. Here&apos;s why we stand apart.
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-none overflow-x-auto max-w-full">
            <Table className="text-sm sm:text-base w-full max-w-full table-fixed min-w-[320px]">
              <colgroup>
                <col className="w-[45%] md:w-auto" />
                <col className="w-[27.5%] md:w-auto" />
                <col className="w-[27.5%] md:w-auto" />
              </colgroup>
              <TableHeader>
                <TableRow className="border-t">
                  <TableHead className="py-4 text-neutral-700 px-2 lg:px-4"> </TableHead>
                  <TableHead className="py-4 text-center text-neutral-900 px-2 lg:px-4 text-sm lg:text-base">
                    Our Product
                  </TableHead>
                  <TableHead className="py-4 text-center text-neutral-900 px-2 lg:px-4 text-sm lg:text-base">
                    Others
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FEATURES.map((label) => (
                  <TableRow key={label}>
                    <TableCell className="py-5 text-neutral-900 px-2 lg:px-4 text-sm lg:text-base">{label}</TableCell>
                    <TableCell className="py-5 px-2 lg:px-4">
                      <div className="flex items-center justify-center">
                        <CheckIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                        <span className="sr-only">{"Included in our product"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-5 px-2 lg:px-4">
                      <div className="flex items-center justify-center">
                        <XIcon className="w-5 h-5 lg:w-6 lg:h-6" />
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
