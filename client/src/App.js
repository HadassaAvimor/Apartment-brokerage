import logo from './logo.svg';
import './App.css';
import { H } from './homePage/h';
import { G } from './homePage/g';
import { Home } from './homePage/homePage';
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Host from './host/Host';
import Guest from './guest/Guest';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/host" element={<H />} />
            <Route path="/guest" element={<G />} />
            {/* <Route path="/host" element={<Host />} />
            <Route path="/guest" element={<Guest />} /> */}
          </Routes>
        </Router>
        </>
      </header>
    </div>
  );
}

export default App;
