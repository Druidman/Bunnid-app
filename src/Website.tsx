import {BrowserRouter, Routes, Route } from "react-router-dom"



import App from "../routes/App"
import MainPage from "../routes/MainPage"
import '@mantine/core/styles.css';


import { MantineProvider } from '@mantine/core';
import { GlobalsContextProvider } from "../context/globalsContext"
import { Toaster } from "react-hot-toast";

function Website() {

  return (
    <MantineProvider>
      <GlobalsContextProvider>
        <Toaster position="top-right" reverseOrder={true} toastOptions={{
          className: "!bg-[var(--bg-light)] !text-[var(--text)]"    
        }}/>
        <BrowserRouter>
          <Routes>
              <Route path="/app" element={<MainPage />} />
              <Route path="/app/app" element={<App />} />
      
          </Routes>
        </BrowserRouter>
      </GlobalsContextProvider>
          
    </MantineProvider>
    
  )
}

export default Website;
