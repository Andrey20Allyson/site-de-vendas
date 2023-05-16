import React from "react";
import { createRoot } from 'react-dom/client';
import 'react-loading-skeleton/dist/skeleton.css';
import App from "./App";
import './styles/globals.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw Error(`element with id="root" don't exist!`);

const root = createRoot(rootElement);

root.render(<App />);