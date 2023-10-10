import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/homePage.css";
export function HomePage() {

  const navigate = useNavigate();
  const moveTohostMode = () => navigate('/login');
  const moveToguestMode = () => navigate('/guest');


  return (
    <>
    <div className='cards' dir='rtl'>
      <div class="card" style={{width:"18rem", textAlign: 'center'}}>
        <img src="..." class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">מעונין לארח?</h5>
          <p class="card-text">בוא ויהיה שותף באירוח משפחה מאזור המלחמה</p>
          <button type="button" onClick={moveTohostMode}>
            Host
          </button>
          </div>
      </div>

      <div class="card" style={{width:"18rem", textAlign: 'center'}}>
        <img src="..." class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">מעונין להתארח?</h5>
          <p class="card-text">כאן תוכל למצוא את המארח המתאים בדיוק לצרכך, הוא מחכה רק לך!</p>
          <button type="button" onClick={moveToguestMode}>
            Guest
          </button>
          </div>
      </div>
      </div>
    </>
  )
}
