import Image from "next/image"

const shots = [
  { src: "/dek-red-6.webp", alt: "Streetwear portrait with cable" },
  { src: "/dek-blue-2.webp", alt: "Minimal still life charging" },
  { src: "/dek-yellow-5.webp", alt: "Desk flatlay" },
  { src: "/dek-black-6.webp", alt: "Macro braid detail" },
  { src: "/dek-white-7.webp", alt: "Lifestyle shot" },
  { src: "/dek-red-2.webp", alt: "Product on plinth" },
]

export function LookbookStrip() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold">{"Lookbook"}</h2>
        <a
          href="https://instagram.com/dekord.pk"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {"@dekord.pk on Instagram"}
        </a>
      </div>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {shots.map((s, i) => (
          <figure key={i} className="group relative rounded-lg ring-1 ring-border overflow-hidden">
            <Image
              src={s.src || "/placeholder.svg"}
              alt={s.alt}
              width={640}
              height={640}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </figure>
        ))}
      </div>
    </section>
  )
}
