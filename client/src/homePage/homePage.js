import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/homePage.css";
import h1 from "../images/h1.jpg";
import h2 from "../images/h2.jpg";

export function HomePage() {

  const navigate = useNavigate();
  const moveTohostMode = () => navigate('/host');
  const moveToguestMode = () => navigate('/guest');


  return (
    <>
    <div className='cards' dir='rtl'>
      <div class="card" style={{width:"18rem", textAlign: 'center', 
                              borderStyle: 'solid', 
                              borderColor: "black",
                              }}>
        <img src={h1} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">מעונין לארח?</h5>
          <p class="card-text">בוא ויהיה שותף באירוח משפחה מאזור המלחמה</p>
          <button type="button" class="btn btn-warning" onClick={moveTohostMode}>
            מלא טופס
          </button>
          </div>
      </div>

      <div class="card" style={{width:"18rem", textAlign: 'center', borderStyle: 'solid', borderColor: "black"}}>
        <img src={h2} class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">מעונין להתארח?</h5>
          <p class="card-text">כאן תוכל למצוא את המארח המתאים בדיוק לצרכך, הוא מחכה רק לך!</p>
          <button type="button" class="btn btn-warning" onClick={moveTohostMode}>
            מצא מארח
          </button>
          </div>
      </div>
      </div>
    </>
  )
}
