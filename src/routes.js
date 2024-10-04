
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Main from './pages/Main';
import Repositorio from './pages/Repositorio';
import Header from './components/Header';
import Error from './pages/Error';

export default function AppRoutes(){
  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={ <Main/>}/>
        <Route path='/repositorio/:repositorio' element={ <Repositorio/>}/>

        <Route path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  )
}