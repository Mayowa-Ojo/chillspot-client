import React from 'react';
import { Redirect, Route } from "react-router-dom";

import LocalStorage from "../../utils/localstorage";

const ls = new LocalStorage();

const ProtectedRoute = ({children, ...rest}) => {
   const { token } = ls.get("user") || {};

   return (
      <Route
         {...rest}
         render={({ location }) => token ?
            (
               children
            )
            :
            (
               <Redirect to={{ pathname: "/login", state: { from: location }}} />
            )
         }
      />
   )
}

export default ProtectedRoute;
