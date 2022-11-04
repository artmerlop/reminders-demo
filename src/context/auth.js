import React, {useContext, useState} from 'react'
import {storage} from '../helpers'
const AuthContext = React.createContext()
const AuthProvider = (props) => {
  const [user, setUserValue] = useState(storage('get', '@user'))
  const setUser = (value) => {
    setUserValue(value)
    if (value) {
      storage('set', '@user', value)
    } else {
      storage('remove', '@user')
    }
  }
  return (
    <AuthContext.Provider value={{user, setUser}}>
      {props.children}
    </AuthContext.Provider>
  )
}
function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be called within an AuthProvider.')
  }
  return context
}
export {AuthProvider, useAuth}
