import React, {useReducer, useContext} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
const LoaderContext = React.createContext()
const LoaderProvider = (props) => {
  const [state, emit] = useReducer((prevState, newState) => ({show: newState}), {show: false})
  return (
    <LoaderContext.Provider value={{emit}}>
      {props.children}
      <div id="loader" className={state.show ? 'active' : ''}>
        <div className="container">
          <div className="content">
            <div className="icon">
              <FontAwesomeIcon icon={['fas', 'spinner']} spin />
            </div>
          </div>
        </div>
      </div>
    </LoaderContext.Provider>
  )
}
function useLoader() {
  const context = useContext(LoaderContext)
  if (!context) {
    throw new Error('useLoader must be called within LoaderProvider')
  }
  return context
}
export {LoaderProvider, useLoader}
