import React, {useState} from 'react'
const AuthContext = React.createContext({
  user: null,
  setUser: () => {}
})
const AuthProvider = (props) => {
  const [user, setUserValue] = useState(localStorage.getItem('@user') ? JSON.parse(localStorage.getItem('@user')) : null)
  const setUser = (value) => {
    setUserValue(value)
    if (value) {
      localStorage.setItem('@user', JSON.stringify(value))
    } else {
      localStorage.removeItem('@user')
    }
  }
  return (
    <AuthContext.Provider value={{user, setUser}}>
      {props.children}
    </AuthContext.Provider>
  )
}
export {AuthContext, AuthProvider}
