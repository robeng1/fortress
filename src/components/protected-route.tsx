import React from "react"
import { Navigate, Route, RouteProps } from "react-router-dom"
import isEmpty from "lodash/isEmpty"
import { useSession } from "hooks/use-session"

export type ProtectedRouteProps = {} & RouteProps

export default function ProtectedRoute({ path, ...rest }: ProtectedRouteProps) {
  const { session } = useSession()
  const isAuthenticated = !isEmpty(session)
  if (isAuthenticated) {
    return <Route path={path} {...rest} />
  } else {
    return <Navigate to="/signin" state={{ from: path }} />
  }
}

export function RequireAuth({ children, path }) {
  const { session } = useSession()
  const isAuthenticated = !isEmpty(session)
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: path }} />
  )
}
