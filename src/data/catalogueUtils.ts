import type { CatalogueItem } from '../types'

export interface CatalogueTypeDef {
  id: string
  label: string
  blurb: string
  features: string[]
}

export interface RawItem {
  id: string
  name: string
  type: string
  /** File name inside /public/products/<folder> */
  image: string
  fit?: 'contain' | 'cover'
}

/** Expand raw rows into catalogue items, attaching each type's label, blurb and features. */
export const buildCatalogue = (folder: string, types: CatalogueTypeDef[], rows: RawItem[]): CatalogueItem[] =>
  rows.map((r) => {
    const t = types.find((x) => x.id === r.type)!
    return {
      id: r.id,
      name: r.name,
      type: r.type,
      src: `/products/${folder}/${r.image}`,
      fit: r.fit ?? 'contain',
      typeLabel: t.label,
      blurb: t.blurb,
      features: t.features,
    }
  })
