export function CareWarranty() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
      <div className="rounded-xl ring-1 ring-border p-6 md:p-8 bg-card/40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium">{"Care"}</h3>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              {"Wipe with a soft cloth. Avoid harsh solvents. Coil loosely—no tight bends."}
            </p>
          </div>
          <div>
            <h3 className="font-medium">{"Shipping & returns"}</h3>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              {"Free standard shipping over Rs. 5000. 30‑day returns—items must be in like‑new condition."}
            </p>
          </div>
          <div>
            <h3 className="font-medium">{"Warranty"}</h3>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              {"Lifetime fray‑replacement. If the braid or neck wears prematurely, we’ll replace it."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
