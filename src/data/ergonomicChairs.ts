import type { CatalogueItem } from '../types'

export type ChairType = 'high-back' | 'medium-back' | 'mesh-seat' | 'visitor'

export interface ErgonomicChair {
  id: string
  name: string
  type: ChairType
  /** File in /public/products/ergonomic */
  image: string
}

export const chairTypes: { id: ChairType; label: string; blurb: string; features: string[] }[] = [
  { id: 'high-back', label: 'High Back Chairs', blurb: 'Full spine and neck support with adjustable headrests — for long working days.', features: ['Adjustable headrest', 'Lumbar and spine support', 'Height-adjustable seat'] },
  { id: 'medium-back', label: 'Medium Back Chairs', blurb: 'Everyday task seating with lumbar support for open offices and workstations.', features: ['Lumbar support', 'Height-adjustable seat', 'Mesh or cushioned back'] },
  { id: 'mesh-seat', label: 'Mesh Seat Chairs', blurb: 'Breathable mesh seat and back that stay cool through extended hours.', features: ['Breathable mesh seat', 'Adjustable headrest', 'Lumbar and spine support'] },
  { id: 'visitor', label: 'Visitor Chairs', blurb: 'Cantilever and four-leg visitor seating for cabins, receptions and meeting rooms.', features: ['Fixed, stable frame', 'Mesh or cushioned back', 'Built for high-traffic areas'] },
]

/** Source: brothersfurniture.co.in/ergonomic-chair-manufacturers-in-chennai.php. Add new models here. */
export const ergonomicChairs: ErgonomicChair[] = [
  { id: 'godrez-hb', name: 'Godrez HB Chair', type: 'high-back', image: 'godrez-hb-chair.webp' },
  { id: 'grandeur-hb-brown', name: 'Grandeur HB Brown Chair', type: 'high-back', image: 'grandeur-hb-brown-chair.webp' },
  { id: 'grandeur-hb-white', name: 'Grandeur HB White Chair', type: 'high-back', image: 'grandeur-hb-white-chair.webp' },
  { id: 'haux-hb-grey', name: 'Haux HB Grey Chair', type: 'high-back', image: 'haux-hb-grey.webp' },
  { id: 'optimus-elite', name: 'Optimus Elite HB Chair', type: 'high-back', image: 'optimus-elite.webp' },
  { id: 'optimus-premium', name: 'Optimus Premium HB Chair', type: 'high-back', image: 'optimus-premium.webp' },
  { id: 'twister-hb', name: 'Twister HB Chair', type: 'high-back', image: 'twister-hb.webp' },
  { id: 'bonai-hb', name: 'Bonai HB Chair', type: 'high-back', image: 'bonai-hb.webp' },
  { id: 'breeze-hb', name: 'Breeze HB Chair', type: 'high-back', image: 'breeze-hb.webp' },
  { id: 'butterfly-hb', name: 'Butterfly HB Chair', type: 'high-back', image: 'butterfly-hb.webp' },
  { id: 'comfy-hb', name: 'Comfy HB Chair', type: 'high-back', image: 'comfy-hb.webp' },
  { id: 'dynamic-hb', name: 'Dynamic HB Chair', type: 'high-back', image: 'dynamic-hb.webp' },
  { id: 'gilma-hb', name: 'Gilma HB Chair', type: 'high-back', image: 'gilma-hb.webp' },
  { id: 'hi-lite-hb', name: 'Hi Lite HB Chair', type: 'high-back', image: 'hi-lite-hb.webp' },
  { id: 'jazz-hb', name: 'Jazz HB Chair', type: 'high-back', image: 'jazz-hb.webp' },
  { id: 'majesty-hb', name: 'Majesty HB Chair', type: 'high-back', image: 'majesty-hb.webp' },
  { id: 'marvel-1-hb', name: 'Marvel 1 HB Chair', type: 'high-back', image: 'marvel-1-hb.webp' },
  { id: 'marvel-2-hb', name: 'Marvel 2 HB Chair', type: 'high-back', image: 'marvel-2-hb.webp' },
  { id: 'matrix-hb', name: 'Matrix HB Chair', type: 'high-back', image: 'matrix-hb.webp' },
  { id: 'mystic-hb', name: 'Mystic HB Chair', type: 'high-back', image: 'mystic-hb.webp' },
  { id: 'optimus-eco-hb', name: 'Optimus Eco HB Chair', type: 'high-back', image: 'optimus-eco-hb.webp' },
  { id: 'yaris-hb', name: 'Yaris HB Chair', type: 'high-back', image: 'yaris-hb.webp' },
  { id: 'rio-hb', name: 'Rio HB Chair', type: 'high-back', image: 'rio-hb.webp' },
  { id: 'godrez-mb', name: 'Godrez MB Chair', type: 'medium-back', image: 'godrez-mb-chair.webp' },
  { id: 'matrix-mb', name: 'Matrix MB Chair', type: 'medium-back', image: 'matrix-mb.webp' },
  { id: 'mystic-mb', name: 'Mystic MB Chair', type: 'medium-back', image: 'mystic-mb.webp' },
  { id: 'optimus-eco-mb', name: 'Optimus Eco MB Chair', type: 'medium-back', image: 'optimus-eco-mb.webp' },
  { id: 'optimus-elite-mb', name: 'Optimus Elite MB Chair', type: 'medium-back', image: 'optimus-elite-mb.webp' },
  { id: 'optimus-premium-mb', name: 'Optimus Premium MB Chair', type: 'medium-back', image: 'optimus-premium-mb.webp' },
  { id: 'pears-mb', name: 'Pears MB Chair', type: 'medium-back', image: 'pears-mb.webp' },
  { id: 'spencer-mb', name: 'Spencer Chair', type: 'medium-back', image: 'spencer-mb.webp' },
  { id: 'twister-mb', name: 'Twister MB Chair', type: 'medium-back', image: 'twister-mb.webp' },
  { id: 'x-mesh-mb', name: 'X Mesh Chair', type: 'medium-back', image: 'x-mesh-mb.webp' },
  { id: 'yuva-mesh-mb', name: 'Yuva Mesh Chair', type: 'medium-back', image: 'yuva-mesh-mb.webp' },
  { id: '802-cushion-mb', name: '802 Cushion Chair', type: 'medium-back', image: '802-cushion-mb.webp' },
  { id: '802-mesh-mb', name: '802 Mesh Chair', type: 'medium-back', image: '802-mesh-mb.webp' },
  { id: '803-cushion-mb', name: '803 Cushion Chair', type: 'medium-back', image: '803-cushion-mb.webp' },
  { id: '803-mesh-mb', name: '803 Mesh Chair', type: 'medium-back', image: '803-mesh-mb.webp' },
  { id: '804-mesh-mb', name: '804 Mesh Chair', type: 'medium-back', image: '804-mesh-mb.webp' },
  { id: '805-mesh-mb', name: '805 Mesh Chair', type: 'medium-back', image: '805-mesh-mb.webp' },
  { id: 'accord-mesh-mb', name: 'Accord Mesh Chair', type: 'medium-back', image: 'accord-mesh-mb.webp' },
  { id: 'array-mb', name: 'Array Chair', type: 'medium-back', image: 'array-mb.webp' },
  { id: 'bonai-mb', name: 'Bonai MB Chair', type: 'medium-back', image: 'bonai-mb.webp' },
  { id: 'breeze-mb', name: 'Breeze MB Chair', type: 'medium-back', image: 'breeze-mb.webp' },
  { id: 'butterfly-mb', name: 'Butterfly MB Chair', type: 'medium-back', image: 'butterfly-mb.webp' },
  { id: 'cherry-mb', name: 'Cherry MB Chair', type: 'medium-back', image: 'cherry-mb.webp' },
  { id: 'comfy-mb', name: 'Comfy MB Chair', type: 'medium-back', image: 'comfy-mb.webp' },
  { id: 'dynamic-mb', name: 'Dynamic MB Chair', type: 'medium-back', image: 'dynamic-mb.webp' },
  { id: 'edge-mb', name: 'Edge MB Chair', type: 'medium-back', image: 'edge-mb.webp' },
  { id: 'flash-mb', name: 'Flash MB Chair', type: 'medium-back', image: 'flash-mb.webp' },
  { id: 'flexi-mb', name: 'Flexi MB Chair', type: 'medium-back', image: 'flexi-mb.webp' },
  { id: 'gilma-mb', name: 'Gilma MB Chair', type: 'medium-back', image: 'gilma-mb.webp' },
  { id: 'hi-lite-mb', name: 'Hi Lite MB Chair', type: 'medium-back', image: 'hi-lite-mb.webp' },
  { id: 'jazz-mb', name: 'Jazz MB Chair', type: 'medium-back', image: 'jazz-mb.webp' },
  { id: 'kaabel-mb', name: 'Kaabel MB Chair', type: 'medium-back', image: 'kaabel-mb.webp' },
  { id: 'majesty-mb', name: 'Majesty MB Chair', type: 'medium-back', image: 'majesty-mb.webp' },
  { id: 'marvel1-mb', name: 'Marvel 1 MB Chair', type: 'medium-back', image: 'marvel1-mb.webp' },
  { id: 'marvel2-mb', name: 'Marvel 2 MB Chair', type: 'medium-back', image: 'marvel2-mb.webp' },
  { id: 'yaris-mb', name: 'Yaris MB Chair', type: 'medium-back', image: 'yaris-mb.webp' },
  { id: 'ecco-mb', name: 'Ecco MB Chair', type: 'medium-back', image: 'ecco-mb.webp' },
  { id: 'rio-mb', name: 'Rio MB Chair', type: 'medium-back', image: 'rio-mb.webp' },
  { id: 'vento-mb', name: 'Vento MB Chair', type: 'medium-back', image: 'vento-mb.webp' },
  { id: 'optimus-elite-mesh', name: 'Optimus Elite HB Chair with Mesh Seat', type: 'mesh-seat', image: 'optimus-elite-mesh.webp' },
  { id: 'twister-mesh', name: 'Twister HB Chair with Mesh Seat', type: 'mesh-seat', image: 'twister-mesh.webp' },
  { id: 'comfy-mesh', name: 'Comfy HB Chair with Mesh Seat', type: 'mesh-seat', image: 'comfy-mesh.webp' },
  { id: 'mystic-mesh', name: 'Mystic HB Chair with Mesh Seat', type: 'mesh-seat', image: 'mystic-mesh.webp' },
  { id: 'godrez-visitor', name: 'Godrez Visitor Chair', type: 'visitor', image: 'godrez-visitor-chair.webp' },
  { id: '805-mesh-visitor', name: '805 Mesh Visitor Chair', type: 'visitor', image: '805-mesh-visitor.webp' },
  { id: 'flexi-visitor', name: 'Flexi Visitor Chair', type: 'visitor', image: 'flexi-visitor.webp' },
  { id: 'gama-visitor', name: 'Gama Visitor Chair', type: 'visitor', image: 'gama-visitor.webp' },
  { id: 'gilma-visitor', name: 'Gilma Visitor Chair', type: 'visitor', image: 'gilma-visitor.webp' },
  { id: 'jazz-visitor', name: 'Jazz Visitor Chair', type: 'visitor', image: 'jazz-visitor.webp' },
  { id: 'kaabel-mesh-visitor', name: 'Kaabel Mesh Visitor Chair', type: 'visitor', image: 'kaabel-mesh-visitor.webp' },
  { id: 'marvel-2-visitor', name: 'Marvel 2 Visitor Chair', type: 'visitor', image: 'marvel-2-visitor.webp' },
  { id: 'visitor-mesh-visitor', name: 'Visitor Mesh Chair', type: 'visitor', image: 'visitor-mesh-visitor.webp' },
  { id: '803-cushion-visitor', name: '803 Cushion Visitor Chair', type: 'visitor', image: '803-cushion-visitor.webp' },
  { id: '804-mesh-visitor', name: '804 Mesh Visitor Chair', type: 'visitor', image: '804-mesh-visitor.webp' },
]

export const chairImage = (c: ErgonomicChair) => `/products/ergonomic/${c.image}`

export const countOfType = (type: ChairType) => ergonomicChairs.filter((c) => c.type === type).length

/** Chairs in the shared catalogue shape used by the grid and lightbox. */
export const chairCatalogue: CatalogueItem[] = ergonomicChairs.map((c) => {
  const t = chairTypes.find((x) => x.id === c.type)!
  return {
    id: c.id,
    name: c.name,
    type: c.type,
    src: chairImage(c),
    fit: 'contain',
    typeLabel: t.label,
    blurb: t.blurb,
    features: t.features,
  }
})
