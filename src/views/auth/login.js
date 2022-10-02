import React, {useState, useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {NotificationContext} from '../../context/notification';
import {TextInput} from '../../components/form';
import Button from '../../components/button';
export default function LoginView({setUser}) {
  const notification = useContext(NotificationContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const changeUsername = (e) => {
    let value = e.target.value;
    setUsername(value.replace(/[^A-Z0-9]/ig, ''));
  }
  const handleLogin = (e) => {
    e.preventDefault();
    if (!username) {
      notification.emit(`Debes ingresar un nombre de usuario para ingresar.`, 'danger');
      return;
    } else if (username.length < 5) {
      notification.emit(`Debes ingresar un nombre de usuario válido.`, 'danger');
      return;
    }
    setUser({name: username});
  }
  return (
    <div id="login">
      <div className="container">
        <h2><FontAwesomeIcon icon={['fas', 'check-circle']} /></h2>
        <div className="content">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <TextInput placeholder="Usuario" id="username" value={username} className="text-center"
                onChange={changeUsername} maxLength={16} />
            </div>
            <div className="form-group">
              <TextInput placeholder="Contraseña" id="password" type="password" value={password} className="text-center"
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button label="Iniciar sesión" type="submit" className="large" />
          </form>
        </div>
      </div>
    </div>
  );
}
