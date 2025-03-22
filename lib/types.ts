export interface Product {
  id: string
  title: string
  description: string
  categories: string[]
  pros: string[]
  cons: string[]
  specifications: Record<string, string>
  imageUrl?: string
  relatedItems: RelatedProduct[]
  warning?: string
}

export interface RelatedProduct {
  id: string
  title: string
  description: string
  price: string
  imageUrl?: string
}

