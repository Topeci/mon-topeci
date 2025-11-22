import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/Deliveries')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_home/Deliveries"!</div>
}
