import React from "react"
import { Redirect, Route } from "react-router-dom"
function PublicRoute({ component: Component, path, ...rest }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated")
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  )
}

export default PublicRoute
