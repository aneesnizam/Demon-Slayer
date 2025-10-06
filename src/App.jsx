import React, { useState, useEffect } from 'react';
import Nav from "./components/Nav";
import Spotlight from "./components/Spotlight";
import Search from "./components/Search";
import { Route, Routes } from "react-router-dom";
import Breathing from "./components/Breathing";
import Loading from "./components/Loading";
import Demons from './components/Demons';


export default function App() {
  const [loading,setLoading] = useState(true)
useEffect(() =>{
const timer = setTimeout(()=>{
  setLoading(false)
},6000)
return () => clearTimeout(timer)
},[])


  return (
    <div >
      {loading? <Loading/> :
      <>
         <Routes>
        <Route
          element={
            <>
              <Nav />
              <Spotlight />
            </>
          }
          path="/"
          />
        <Route
          element={
            <>
              <Nav active="/characters" />
              <Search />
            </>
          }
          path="/characters"
          />
        <Route
          element={
            <>
              <Nav active="/breathing" />
              <Breathing/>
            </>
          }
          path="/breathing"
          />
           <Route
          element={
            <>
              <Nav active="/demons" />
              <Demons />
            </>
          }
          path="/demons"
          />
        
      </Routes>
      
   <footer class="bg-gray-900 py-3">
  <div class="text-center text-gray-400 text-xs space-y-1">
    <p>© 2025 Demon Slayer | Fan Website</p>
    <p>Made with ❤️ by Anees</p>
  </div>
</footer>
          </>
      }
    </div>
  );
}
