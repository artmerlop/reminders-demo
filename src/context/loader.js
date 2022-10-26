import React, {useReducer} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Button from '../components/button'
const LoaderContext = React.createContext({
  emit: () => {}
})
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
export {LoaderProvider, LoaderContext}
