import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

import '../src/css/Index.css';

const root = ReactDom.createRoot(document.getElementById('root'))

root.render(
    <BrowserRouter>
            <App />
    </BrowserRouter>
)
