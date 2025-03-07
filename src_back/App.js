import { components } from 'daisyui/imports';
import './App.css';
import Dashboard from './Dashboard';
import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';


function App() {
  return (
    
    <div className="App">
      <Navbar></Navbar>
      <Dashboard />

    </div>
  );
}


export default App;
