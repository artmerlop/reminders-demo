import React from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from './navbar';
export default function MainLayout({user, navigate}) {
  return (
    <React.Fragment>
      <Navbar />
      <div id="scene">
        <Outlet />
      </div>
    </React.Fragment>
  )
}
