import React from "react";
import App from "./App";
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
if (!rootElement) throw Error(`element with id="root" don't exist!`);

const root = createRoot(rootElement);

root.render(<App/>);