import React, {useContext} from 'react';
import {Navigate, useNavigate, useParams, useLocation} from 'react-router-dom';
import {AuthContext} from '../context/auth';
function AuthRoute({element: Component}) {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const context = useContext(AuthContext);
  const user = context.user;
  if (user !== null) {
    return <Navigate to="/" />
  } else {
    return (
      <Component navigate={navigate} params={params} location={location} setUser={context.setUser} />
    )
  }
}
export default AuthRoute
