import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';

function Auth({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      if (location.pathname === '/login' || location.pathname === '/login/signup') {
        navigate('/');
      }
    } else {
      if (location.pathname !== '/login' && location.pathname !== '/login/signup') {
        setTimeout(() => {
          navigate('/login')
        }, 1000);
      }
      if(location.pathname === '/login/signup'){
        navigate('login/signup')
      }
    }
  }, [token, location, navigate]);

  return <>{token ? <PageLayout /> : children}</>;
}

export default Auth;
