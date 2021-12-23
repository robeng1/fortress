import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { useAtom } from 'jotai';
import { sessionAtom } from 'store/atoms/authorization-atom';

export type ProtectedRouteProps = {} & RouteProps;

export default function ProtectedRoute({ path, ...rest }: ProtectedRouteProps) {
  const [session] = useAtom(sessionAtom);
  const isAuthenticated = !isEmpty(session);
  if (isAuthenticated) {
    return <Route path={path} {...rest} />;
  } else {
    return <Redirect to={{ pathname: '/signin', state: { from: path } }} />;
  }
}
