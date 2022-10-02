import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Button from '../components/button';
const NotificationContext = React.createContext({
  notification: null,
  notificationText: null,
  emit: () => {}
});
const NotificationProvider = (props) => {
  const [notification, setNotification] = useState(null);
  const [notificationText, setNotificationText] = useState(null);
  const emit = (text, type = 'simple') => {
    setNotificationText(text);
    setNotification(type);
  };
  const clear = () => {
    setNotificationText(null);
    setNotification(null);
  };
  return (
    <NotificationContext.Provider value={{emit, clear, notification, notificationText}}>
      {props.children}
      <div id="notification" className={notification ? 'active' : ''}>
        <div className="container">
          <div className="content">
            {notification !== 'simple' ?
              <div className={`icon ${notification === 'success' ? 'success' : (notification === 'danger' ? 'danger' : 'love')}`}>
                <FontAwesomeIcon icon={['fas', notification === 'success' ? 'check' : (notification === 'danger' ? 'times' : 'heart')]} />
              </div>
            : null}
            <div className="body">
              <p className="text-center">{notificationText}</p>
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
