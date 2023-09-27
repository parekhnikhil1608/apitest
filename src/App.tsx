// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar';
import Table from './components/Table';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from './components/Form';
import Login from './components/Login';
import State from './components/State';
import Temp from './components/NavLink';
import CalCulator from './components/CalCulator';


interface response {
  data: any
  totalRecords: any
}


function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Temp />}>
          <Route index element={<Table />} />
          <Route path='form' element={<Form />} />
          <Route path='/state' element={<State />} />
          <Route path="/cal" element={<CalCulator />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function PageNotFound() {
  return (
    <div style={{
      margin: "auto",
      color: "red",
      display: 'flex',
      textAlign: 'center',
      width: '70vh',
      height: '100vh',
      alignItems: 'center'
    }}>
      <h1>404 Page not found!</h1>
    </div>
  );
}

export default App;
