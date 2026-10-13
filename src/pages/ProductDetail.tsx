import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import SectionHeading from '../components/SectionHeading'
import { useCart } from '../context/cart'
import { formatPrice, getProduct, products } from '../data/products'

export default function ProductDetail() {
  const { id = '' } = useParams()
  const product = getProduct(id)
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 lg:px-10">
        <h1 className="text-4xl font-medium">Product not found</h1>
        <Link to="/shop" className="mt-8 btn-outline">
          Back to shop
        </Link>
      </div>
    )
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id)
  const more = (related.length ? related : products.filter((p) => p.id !== product.id)).slice(0, 4)

  const handleAdd = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-10">
      <nav className="text-sm text-muted">
        <Link to="/" className="hover:text-accent">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-accent">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-20">
        <div className="flex aspect-square items-center justify-center overflow-hidden bg-surface">
          <img
            src={product.cutout ? product.image : product.image.replace('w=900', 'w=1400')}
            alt={product.name}
            className={product.cutout ? 'w-full object-contain p-10 mix-blend-multiply' : 'h-full w-full object-cover'}
          />
        </div>

        <div className="lg:py-8">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">{product.category}</p>
          <h1 className="mt-4 text-4xl font-medium leading-tight tracking-tight md:text-5xl">{product.name}</h1>
          <p className="mt-3 text-sm text-muted">
            ★ {product.rating} <span className="mx-2">·</span>
            <span className={product.inStock ? 'text-ink' : 'text-accent'}>{product.inStock ? 'In stock' : 'Sold out'}</span>
          </p>

          <div className="mt-8 flex items-baseline gap-3">
            {product.oldPrice && <span className="text-lg text-muted line-through decoration-accent decoration-2">{formatPrice(product.oldPrice)}</span>}
            <span className="text-3xl font-medium text-ink">Starts from 4,XXX rs</span>
          </div>

          <p className="mt-8 leading-relaxed text-ink/75">{product.description}</p>

          <dl className="mt-8 divide-y divide-line border-y border-line text-sm">
            <div className="flex justify-between gap-6 py-4">
              <dt className="text-muted">Material</dt>
              <dd className="text-right">{product.material}</dd>
            </div>
            <div className="flex justify-between gap-6 py-4">
              <dt className="text-muted">Dimensions</dt>
              <dd className="text-right">{product.dimensions}</dd>
            </div>
          </dl>

          <div className="mt-10 flex gap-4">
            <div className="flex items-center border border-line">
              <button className="h-full px-4 text-lg hover:text-accent" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                −
              </button>
              <span className="w-8 text-center">{qty}</span>
              <button className="h-full px-4 text-lg hover:text-accent" onClick={() => setQty((q) => q + 1)} aria-label="Increase">
                +
              </button>
            </div>
            <button disabled={!product.inStock} onClick={handleAdd} className="btn-solid flex-1">
              {added ? 'Added to cart ✓' : product.inStock ? 'Add to cart' : 'Sold out'}
            </button>
          </div>
          <p className="mt-6 text-sm text-muted">
            Furnishing a whole office?{' '}
            <Link to="/contact" className="text-ink underline decoration-accent underline-offset-4 hover:text-accent">
              Ask for a bulk quote
            </Link>
          </p>
        </div>
      </div>

      <section className="mt-28">
        <SectionHeading eyebrow="You may also like" title="Complete the space" />
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {more.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
