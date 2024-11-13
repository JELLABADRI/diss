import {Navigate, Outlet,Route} from 'react-router-dom'
import Cookie from 'js-cookie'

const ProtectedRoute = props => {
  const token = Cookie.get('jwt_token')
  if (token === undefined) {
    return <Navigate to="/login" replace />;

  }
  return <Outlet />
}

export default ProtectedRoute
