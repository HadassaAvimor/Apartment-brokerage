import logo from './logo.svg';
import './App.css';
import ApartmentFilter from './GuestComponents/js/Guest';

import { HomePage } from './homePage/HomePage';
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Host from './host/Host';
import Guest from './GuestComponents/js/Guest';
import { Header } from './Header';

function App() {
  return (
    <>
    
      <header className="App-header">
        <Header></Header>
      </header>
      <>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/host" element={<Host />} />
            <Route path="/guest" element={<Guest />} />
          </Routes>
        </Router>
        </>
    </>
  );
}

export default App;
