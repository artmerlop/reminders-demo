import React, {useState} from 'react'
import {storage} from '../helpers'
const AuthContext = React.createContext({
  user: null,
  setUser: () => {}
})
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
export {AuthContext, AuthProvider}
