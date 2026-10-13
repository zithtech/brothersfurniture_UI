export type Category = 'Workstations' | 'Office Chairs' | 'Desks' | 'Meeting Tables' | 'Storage' | 'Lounge'

export interface Product {
  id: string
  name: string
  category: Category
  price: number
  oldPrice?: number
  rating: number
  image: string
  /** Image has a plain white background and can be blended onto tinted panels. */
  cutout?: boolean
  description: string
  material: string
  dimensions: string
  inStock: boolean
  featured?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

/** A listing in a type-filtered catalogue (ergonomic chairs, workstations, …). */
export interface CatalogueItem {
  id: string
  name: string
  type: string
  src: string
  /** `contain` for cut-out shots on white, `cover` for room photos. */
  fit: 'contain' | 'cover'
  typeLabel: string
  blurb: string
  features: string[]
}

export interface CatalogueType {
  id: string
  label: string
}
