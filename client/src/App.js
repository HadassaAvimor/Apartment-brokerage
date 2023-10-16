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
import Footer from './Footer'
import "./style/app.css";
import { ExplanationModal } from './host/ExplanationModal';
import { ErrorModal } from './errorModel/ErrorModal';
import About from './About/About';

function App() {
  return (
    <>
      <div className='app'>
        <Provider store={store}>
          <Router>
          <Header></Header>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/host" element={<Host />} />
              <Route path="/guest" element={<Guest />} />
              <Route path="/updateHost" element={<UpdateHost />} />
              <Route path="/explanationModal" element={<ExplanationModal />} />
              <Route path="/error" element={<ErrorModal />} />
              <Route path='/about' element={<About />} />
            </Routes>
            <footer className='footer-app'>
              <Footer />
            </footer>
          </Router>
        </Provider>

      </div>
    </>
  );
}

export default App;
