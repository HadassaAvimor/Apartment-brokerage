import logo from './logo.svg';
import './App.css';
import ApartmentFilter from './GuestComponents/js/Guest';

import { Home } from './homePage/homePage';
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Host from './host/Host';
import Guest from './GuestComponents/js/Guest';

function App() {
  return (
    <>
    
      <header className="App-header">
        <>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/host" element={<Host />} />
            <Route path="/guest" element={<Guest />} />
          </Routes>
        </Router>
        </>
      </header>
    
    </>
  );
}

export default App;
