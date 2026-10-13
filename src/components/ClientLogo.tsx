import { clientLogo, type Client } from '../data/clients'

/** Always shows full colour logo. */
export default function ClientLogo({ client, className = 'max-h-12' }: { client: Client; className?: string }) {
  return (
    <img
      src={clientLogo(client)}
      alt={client.name}
      title={client.name}
      loading="lazy"
      className={`max-w-full object-contain mix-blend-multiply ${className}`}
    />
  )
}
