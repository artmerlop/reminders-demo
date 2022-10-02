import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {TextInput} from '../../components/form';
import Button from '../../components/button';
export default function LoginView({setUser}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
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
                onChange={(e) => setUsername(e.target.value)} />
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
