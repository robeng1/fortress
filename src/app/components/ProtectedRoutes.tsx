import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from 'app/features/authn/selectors';

export type ProtectedRouteProps = {} & RouteProps;

export default function ProtectedRoute({ path, ...rest }: ProtectedRouteProps) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  if (isAuthenticated) {
    return <Route path={path} {...rest} />;
  } else {
    return <Redirect to={{ pathname: '/signin', state: { from: path } }} />;
  }
}
