import {BrowserRouter, Routes, Route } from "react-router-dom"



import App from "../routes/App"
import MainPage from "../routes/MainPage"
import '@mantine/core/styles.css';


import { MantineProvider } from '@mantine/core';
import { GlobalsContextProvider } from "../context/globalsContext"

function Website() {

  return (
    <MantineProvider>
      <GlobalsContextProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/app" element={<App />} />
      
          </Routes>
        </BrowserRouter>
      </GlobalsContextProvider>
          
    </MantineProvider>
    
  )
}

export default Website;
