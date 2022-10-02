import React, {useState} from 'react';
const AuthContext = React.createContext({
  user: null,
  setUser: () => {}
});
const AuthProvider = (props) => {
  const [user, setUserValue] = useState(null);
  const setUser = (value) => {
    setUserValue(value);
  };
  return (
    <AuthContext.Provider value={{user, setUser}}>
      {props.children}
    </AuthContext.Provider>
  );
};
export {AuthContext, AuthProvider}
