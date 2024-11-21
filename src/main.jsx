import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Admin from "./pages/Admin.jsx"

const router = createBrowserRouter([{
  path: "/", // Indica la ruta raíz de la web, por ejemplo: http://to.com
  element: <App />, // Indica el elemento que se deberá renderizar cuando se pida la ruta anterior 
  errorElement: <App />, // Página de error
},{
  path: "/admin",
  element: <Admin />,
},
]); // Array de objetos


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)