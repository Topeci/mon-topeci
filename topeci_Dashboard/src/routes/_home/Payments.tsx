import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/Payments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_home/Payments"!</div>
}
