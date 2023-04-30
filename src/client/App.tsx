import React from 'react';
import './App.css';
import { Router } from './routes';
import { Provider } from 'react-redux';
import { store } from './app/store';

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}