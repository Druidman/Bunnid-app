import {BrowserRouter, Routes, Route } from "react-router-dom"



import App from "../routes/App"
import MainPage from "../routes/MainPage"
import Auth from "../routes/Auth"
import '@mantine/core/styles.css';


import { MantineProvider } from '@mantine/core';

function Website() {

  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/app" element={<App />} />
            <Route path="/auth" element={<Auth />} />
            
     
        </Routes>
      </BrowserRouter>    
    </MantineProvider>
    
  )
}

export default Website;
