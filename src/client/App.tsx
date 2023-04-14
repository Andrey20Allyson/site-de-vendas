import React from 'react';
import './App.css';
import { Router } from './routes';
import { ThemeProvider } from './contexts/theme';

export default function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  )
}