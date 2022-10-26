import React, {useReducer} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Button from '../components/button';
const NotificationContext = React.createContext({
  notification: null,
  notificationText: null,
  emit: () => {}
});
function NotificationProvider(props) {
  //const reducer = (prev, {text, type}) => {
  //  return {text, type}
  //}
  const [state, dispatch] = useReducer((prevState, newState) => newState, {text: null, type: null});
  const emit = (text, type = 'simple') => {
    dispatch({text, type})
  };
  const clear = () => {
    dispatch({text: null, type: null})
  };
  return (
    <NotificationContext.Provider value={{emit, clear}}>
      {props.children}
      <div id="notification" className={state.type ? 'active' : ''}>
        <div className="container">
          <div className="content">
            {state.type !== 'simple' ?
              <div className={`icon ${state.type === 'success' ? 'success' : (state.type === 'danger' ? 'danger' : 'love')}`}>
                <FontAwesomeIcon icon={['fas', state.type === 'success' ? 'check' : (state.type === 'danger' ? 'times' : 'heart')]} />
              </div>
            : null}
            <div className="body">
              <p className="text-center">{state.text}</p>
            </div>
            <div className="actions text-center">
              <Button className="border" label="Cerrar" onClick={() => clear()} />
            </div>
          </div>
        </div>
      </div>
    </NotificationContext.Provider>
  );
};
export {NotificationProvider, NotificationContext}
