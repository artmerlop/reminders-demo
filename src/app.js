import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {AuthProvider} from './context/auth';
import {NotificationProvider} from './context/notification';
import AuthRoute from './components/authRoute';
import PrivateRoute from './components/privateRoute';
import Layout from './components/layout';
import LoginView from './views/auth/login';
import TodosScene from './views/main/todos';
const Context = React.createContext();
export default function App() {
  const [user, setUser] = React.useState(null);
  return (
    <AuthProvider>
      <NotificationProvider>
        <Routes>
          <Route path='/' element={<PrivateRoute element={Layout} />}>
            <Route path='/' element={<TodosScene />} />
          </Route>
          <Route path='/login' element={<AuthRoute element={LoginView} />} />
          <Route path='*' element={<Navigate to="/login" />} />
        </Routes>
      </NotificationProvider>
    </AuthProvider>
  );
}
