import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

function RootComponent() {
  return (
    <>
      <React.Suspense fallback={null}>
        <TanStackRouterDevtools />
      </React.Suspense>
      <Outlet />
    </>
  );
}
