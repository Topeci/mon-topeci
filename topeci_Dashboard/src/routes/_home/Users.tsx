import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/Users')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_home/Users"!</div>
}
