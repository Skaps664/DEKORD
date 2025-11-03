export function SpecsTable() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="rounded-xl ring-1 ring-border overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <dl className="p-6 border-b md:border-b-0 md:border-r border-border">
            <dt className="text-sm text-muted-foreground">{"Compatibility"}</dt>
            <dd className="mt-1">{"USB‑C devices, PD chargers, laptops, tablets, and phones"}</dd>
          </dl>
          <dl className="p-6 border-b md:border-b-0 md:border-r border-border">
            <dt className="text-sm text-muted-foreground">{"Materials"}</dt>
            <dd className="mt-1">{"Nylon braid, TPE overmold, aluminum shell (anodized)"}</dd>
          </dl>
          <dl className="p-6">
            <dt className="text-sm text-muted-foreground">{"In the box"}</dt>
            <dd className="mt-1">{"Cable, reusable cable tie, care card"}</dd>
          </dl>
        </div>
      </div>
    </section>
  )
}
