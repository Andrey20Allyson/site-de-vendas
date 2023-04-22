import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useDevLocation from '../hooks/useDevLocation';
import useRedirectPath from '../hooks/useRedirectPath';
import Home from '../pages/Home';
import Search from '../pages/Search';
import Product from '../pages/Product';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export function Router() {
  return (
    <BrowserRouter window={window}>
      <AppRoutes />
    </BrowserRouter>
  )
}

export function AppRoutes() {
  useDevLocation();
  useRedirectPath();

  return (
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/search' Component={Search} />
      <Route path='/sign-in' Component={SignIn} />
      <Route path='/sign-up' Component={SignUp} />
      <Route path='/product/:id' Component={Product} />
    </Routes>
  )
}