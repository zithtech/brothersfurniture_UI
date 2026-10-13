import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useCart } from '../context/cart'
import { formatPrice } from '../data/products'

const FREE_DELIVERY_THRESHOLD = 40000
const DELIVERY_FEE = 1500

export default function Cart() {
  const { items, count, subtotal, updateQuantity, removeItem, clear } = useCart()
  const [ordered, setOrdered] = useState(false)

  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_FEE
  const total = subtotal + delivery

  if (ordered || !items.length) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center sm:px-6 lg:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">{ordered ? 'Order placed' : 'Cart'}</p>
        <h1 className="mt-4 text-4xl font-medium">{ordered ? 'Thank you for your order' : 'Your cart is empty'}</h1>
        <p className="mt-4 text-muted">
          {ordered ? "We'll be in touch shortly to schedule delivery and installation." : 'Start with a chair, or the whole floor.'}
        </p>
        <Link to="/shop" className="mt-10 btn-outline">
          {ordered ? 'Continue shopping' : 'Browse the collection'}
        </Link>
      </div>
    )
  }

  return (
    <>
      <PageHeader eyebrow={`${count} ${count === 1 ? 'item' : 'items'}`} title="Your cart" />

      <div className="mx-auto mt-12 grid max-w-7xl gap-12 px-4 sm:px-6 lg:px-10 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-line border-y border-line">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="flex gap-6 py-6">
              <Link to={`/product/${product.id}`} className="h-28 w-28 shrink-0 bg-surface">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`h-full w-full ${product.cutout ? 'object-contain p-2 mix-blend-multiply' : 'object-cover'}`}
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link to={`/product/${product.id}`} className="hover:text-accent">
                      {product.name}
                    </Link>
                    <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-muted">{product.category}</p>
                  </div>
                  <span className="font-medium">{formatPrice(product.price * quantity)}</span>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center border border-line">
                    <button className="px-3 py-1.5 hover:text-accent" onClick={() => updateQuantity(product.id, quantity - 1)} aria-label="Decrease">
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{quantity}</span>
                    <button className="px-3 py-1.5 hover:text-accent" onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Increase">
                      +
                    </button>
                  </div>
                  <button onClick={() => removeItem(product.id)} className="text-sm text-muted underline-offset-4 hover:text-accent hover:underline">
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit bg-surface p-8">
          <h2 className="text-xs font-medium uppercase tracking-[0.25em]">Order summary</h2>
          <dl className="mt-6 space-y-3 text-[15px]">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Delivery & install</dt>
              <dd>{delivery ? formatPrice(delivery) : 'Free'}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-4 text-lg font-medium">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          {delivery > 0 && (
            <p className="mt-4 text-sm text-muted">Add {formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)} more for free delivery.</p>
          )}
          <button
            onClick={() => {
              clear()
              setOrdered(true)
            }}
            className="btn-solid mt-8 w-full"
          >
            Checkout
          </button>
        </aside>
      </div>
    </>
  )
}
