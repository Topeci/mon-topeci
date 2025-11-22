import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/Settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_home/Settings"!</div>
}
