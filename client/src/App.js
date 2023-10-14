import store from './redux/store';
import { Provider } from 'react-redux';
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Host from './host/Host';
import Guest from './GuestComponents/Guest';
import Login from './loginWithAuth/Login';
import { HomePage } from './homePage/homePage';
import { Header } from './Header';
import UpdateHost from './updateHost/UpdateHost';
// import Update from './host/update';
import Footer from './Footer'
<<<<<<< HEAD
import "./style/app.css";
=======

import { ExplanationModal } from './host/ExplanationModal';

import { ErrorModal } from './errorModel/ErrorModal';



>>>>>>> 0e2fb60a6fe0de3439c7deb01c8d3219cd72e8e8

function App() {
  return (

    <>
    <div className='app'>
      <Header></Header>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/host" element={<Host />} />
            <Route path="/guest" element={<Guest />} />
            <Route path="/updateHost" element={<UpdateHost />} />

            <Route path="/ExplanationModal" element={<ExplanationModal />} />

            <Route path="/error" element={<ErrorModal />} />


          </Routes>

        </Router>
        {/* <ExplanationModal></ExplanationModal> */}
      </Provider>
      <footer>

      </footer>
<<<<<<< HEAD
      </div>
</>
=======
    </>
>>>>>>> 0e2fb60a6fe0de3439c7deb01c8d3219cd72e8e8
  );
}

export default App;
