import { Suspense } from "react"
import { getAllProductsServer } from "@/lib/services/products.server"
import type { Product } from "@/lib/types/database"
import CatalogClient from "./catalog-client"

export const revalidate = 900

async function CatalogContent() {
  const { data: products } = await getAllProductsServer()
  return <CatalogClient initialProducts={(products || []) as Product[]} />
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CatalogContent />
    </Suspense>
  )
}
