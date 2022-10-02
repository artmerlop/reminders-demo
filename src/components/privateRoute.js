import React, {useEffect, useCallback, useContext} from 'react';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import {AuthContext} from '../context/auth';
function PrivateRoute({element: Component, authContext = null, auth = false}) {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const context = useContext(AuthContext);
  const validate = useCallback(data => {
    if (!data) {
      navigate('/login');
    }
  }, [navigate]);
  useEffect(() => {
    validate(context.user);
  }, [validate, context]);
  if (context.user === null) {
    return null
  } else {
    return (
      <Component user={context.user} setUser={context.setUser} navigate={navigate} params={params} location={location} />
    )
  }
}
export default PrivateRoute
