import { Route, NavLink, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from './AuthProvider'

export function PrivateRoute({children, ...rest}) {
    let {user} = useContext(AuthContext)
    //let user = false
    return (
      user ? children : <Navigate to="/login" replace/>
    )
}