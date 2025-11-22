import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/setting')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_home/setting"!</div>
}
