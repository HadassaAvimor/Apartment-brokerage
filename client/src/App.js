import './App.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Host from './host/Host';
import Guest from './GuestComponents/Guest';
import Login from './loginWithAuth/Login';
// import { HomePage } from './homePage/homePage';
import { Header } from './Header';
// import Update from './host/update';
import HomePage from './homePage/homePage';


function App() {
  return (

    <>

      <Header></Header>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/host" element={<Host />} />
            <Route path="/guest" element={<Guest />} />
          </Routes>

        </Router>

      </Provider>
</>
  );
}

export default App;
