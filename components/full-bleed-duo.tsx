import Image from "next/image"

type SideImage = {
  src: string
  alt: string
}

export function FullBleedDuo({
  left,
  right,
  priority = false,
}: {
  left: SideImage
  right: SideImage
  priority?: boolean
}) {
  return (
    // Full-bleed wrapper: escapes any parent padding to span viewport edges
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="relative w-full aspect-square">
          <Image
            src={left.src || "/duo-1.webp"}
            alt={left.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
          />
        </div>

        {/* Right image */}
        <div className="relative w-full aspect-square">
          <Image
            src={right.src || "/duo-2.webp"}
            alt={right.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            loading={priority ? "eager" : "lazy"}
            priority={priority}
          />
        </div>
      </div>
    </section>
  )
}
