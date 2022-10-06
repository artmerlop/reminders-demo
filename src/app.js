import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {AuthProvider} from './context/auth';
import {LoaderProvider} from './context/loader';
import {NotificationProvider} from './context/notification';
import PrivateRoute from './components/privateRoute';
import Layout from './components/layout';
import LoginView from './views/auth/login';
import TodosScene from './views/main/todos';
export default function App() {
  return (
    <AuthProvider>
      <LoaderProvider>
        <NotificationProvider>
          <Routes>
            <Route path='/' element={<PrivateRoute element={Layout} />}>
              <Route path='/' element={<TodosScene />} />
            </Route>
            <Route path='/login' element={<PrivateRoute element={LoginView} />} />
            <Route path='*' element={<Navigate to="/login" />} />
          </Routes>
        </NotificationProvider>
      </LoaderProvider>
    </AuthProvider>
  );
}
