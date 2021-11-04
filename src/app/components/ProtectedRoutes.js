import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute({ component: Component, path, ...rest }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: {
                prevLocation: path,
              },
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
