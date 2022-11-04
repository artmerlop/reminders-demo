import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Button from './button';
import {useAuth} from '../context/auth';
export default function Navbar() {
  const session = useAuth()
  return (
    <nav>
      <div className="container">
        <div className="content">
          <div className="left">
            <div className="hero">
              <FontAwesomeIcon icon={['fas', 'check-circle']} />
            </div>
          </div>
          <div className="middle" />
          <div className="right">
            <div className="actions">
              <Button onClick={() => session.setUser(null)} icon="sign-out" className="danger" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
