import './App.css';
import store  from './redux/store';
import ApartmentFilter from './GuestComponents/js/Guest';
import { Provider } from 'react-redux';
import { Home } from './homePage/homePage';
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Host from './host/Host';
import Guest from './GuestComponents/js/Guest';
import Login from './loginWithAuth/Login';

function App() {
  return (
    <>
    
      <header className="App-header">
        <> 
        <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/host" element={<Host />} />
            <Route path="/guest" element={<Guest />} />
          </Routes>

        </Router>

      </Provider>

        </>
      </header>
    
    </>
  );
}

export default App;
