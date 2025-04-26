import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import Usercontext from "./context/Usercontext.jsx";  // if the file is in a 'context' folder


createRoot(document.getElementById('root')).render(
  <Usercontext>
    <App />
  </Usercontext>,
)
