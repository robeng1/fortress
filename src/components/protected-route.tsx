import React from "react"
import { Navigate, Route, RouteProps } from "react-router-dom"
import isEmpty from "lodash/isEmpty"
import { useAtom } from "jotai"
import { sessionAtom } from "store/authorization-atom"

export type ProtectedRouteProps = {} & RouteProps

export default function ProtectedRoute({ path, ...rest }: ProtectedRouteProps) {
  const [session] = useAtom(sessionAtom)
  const isAuthenticated = !isEmpty(session)
  if (isAuthenticated) {
    return <Route path={path} {...rest} />
  } else {
    return <Navigate to="/signin" state={{ from: path }} />
  }
}

export function RequireAuth({ children, path }) {
  const [session] = useAtom(sessionAtom)
  const isAuthenticated = !isEmpty(session)
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: path }} />
  )
}
