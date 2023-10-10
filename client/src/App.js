import logo from './logo.svg';
import './App.css';
import ApartmentFilter from './GuestComponents/js/Guest';

import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Host from './host/Host';
import Guest from './GuestComponents/js/Guest';
import { Header } from './Header';
import { HomePage } from './homePage/homePage';

function App() {
  return (
    <>
    
      <header className="App-header">
        <Header></Header>
      </header>
      <body  dir="rtl">
      <>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/host" element={<Host />} />
            <Route path="/guest" element={<Guest />} />
          </Routes>
        </Router>
        </></body>
    </>
  );
}

export default App;
