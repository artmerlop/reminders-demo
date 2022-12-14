import React, {useEffect, useCallback} from 'react';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import {useAuth} from '../context/auth';
function PrivateRoute({element: Component}) {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const context = useAuth();
  const validate = useCallback(data => {
    if (!data) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [navigate]);
  useEffect(() => {
    validate(context.user);
  }, [validate, context]);
  if (context.user === null) {
    return <Component setUser={context.setUser} navigate={navigate} />
  } else {
    return (
      <Component user={context.user} setUser={context.setUser} navigate={navigate} params={params} location={location} />
    )
  }
}
export default PrivateRoute
