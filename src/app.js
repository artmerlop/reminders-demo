import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {AuthProvider} from './context/auth';
import {LoaderProvider} from './context/loader';
import {NotificationProvider} from './context/notification';
import PrivateRoute from './components/privateRoute';
import Layout from './components/layout';
import LoginView from './views/auth/login';
const SuspenseFallback = <span></span>
const TodosScene = React.lazy(() => import('./views/main/todos'));
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LoaderProvider>
          <NotificationProvider>
            <Routes>
              <Route path='/' element={<PrivateRoute element={Layout} />}>
                <Route path='/' element={<React.Suspense fallback={SuspenseFallback}><TodosScene /></React.Suspense>} />
              </Route>
              <Route path='/login' element={<PrivateRoute element={LoginView} />} />
              <Route path='*' element={<Navigate to="/login" />} />
            </Routes>
          </NotificationProvider>
        </LoaderProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
