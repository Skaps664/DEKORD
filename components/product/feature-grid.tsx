import { cn } from "@/lib/utils"

const features = [
  { title: "Premium braid", body: "Tightly woven nylon with soft-touch hand feel and high abrasion resistance." },
  { title: "Reinforced necks", body: "Overmolded strain relief prevents kinks and weak points near the connector." },
  { title: "60W PD", body: "USB Power Delivery for rapid charging on phones, tablets, and ultra-books." },
  {
    title: "Clean aesthetics",
    body: "Modern silhouette designed to complement minimal setups and fashion-forward carry.",
  },
  { title: "Tangle resistant", body: "Balanced stiffness-to-flex ratio that coils neatly without memory." },
  { title: "Tested durability", body: "Over 12,000 bend cycles in lab conditions—built to last." },
]

export function FeatureGrid() {
  return (
    <section className="container-custom py-6 sm:py-8 md:py-12">
      <h2 className={cn("text-pretty font-semibold text-xl sm:text-2xl md:text-3xl")}>{"Why you'll love it"}</h2>
      <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        {features.map((f, i) => (
          <div key={i} className="rounded-xl ring-1 ring-border p-4 sm:p-5 bg-card/40">
            <h3 className="font-medium text-sm sm:text-base">{f.title}</h3>
            <p className="text-muted-foreground mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
