import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/livraison')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/livraison"!</div>
}
