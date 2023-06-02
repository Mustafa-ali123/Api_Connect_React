import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react'
import MContent from '../App__Screen/MContent'
import PostData from '../App__Screen/PostData'
import PutData from '../App__Screen/Putdata'

function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<MContent />} />            
          <Route path="/postdata" element={<PostData />} />                        
          <Route path="/putdata" element={<PutData />} />                        
         </Routes>
      </BrowserRouter>

    </>
  )
}

export default AppRouter