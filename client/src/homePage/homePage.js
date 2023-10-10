import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/homePage.css";
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';

function HomePage() {

  const navigate = useNavigate();
  const moveTohostMode = () => navigate('/login');
  const moveToguestMode = () => navigate('/guest');


  return (
    <>
    <div className='cards' dir='rtl'>
      <div class="card" style={{width:"18rem", textAlign: 'center'}}>
        <img src={img1} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">מעונין לארח?</h5>
          <p class="card-text">בוא והיה שותף באירוח משפחה מאזור המלחמה</p>
          <button type="button" onClick={moveTohostMode}>
            Host
          </button>
          </div>
      </div>

      <div class="card" style={{width:"18rem", textAlign: 'center'}}>
        <img src={img2} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">מעונין להתארח?</h5>
          <p class="card-text">כאן תוכל למצוא את המארח המתאים בדיוק לצרכך, הוא מחכה רק לך!</p>
          <button type="button" onClick={moveToguestMode}>
            Guset

          </button>
          </div>
      </div>
      </div>
    </>
  )
}
export default HomePage;
