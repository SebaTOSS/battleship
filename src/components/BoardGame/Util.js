import React from 'react';
import { Route } from 'react-router-dom';

function renderMergedProps(component, ...rest) {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

export function PropsRoute({ component, ...rest }) {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}
