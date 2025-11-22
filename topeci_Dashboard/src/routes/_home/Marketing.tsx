import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/Marketing')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_home/Marketing"!</div>
}
