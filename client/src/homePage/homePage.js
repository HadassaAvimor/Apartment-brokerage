import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/homePage.css";
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.jpg';
export function HomePage() {

  const navigate = useNavigate();
  const moveTohostMode = () => navigate('/login');
  const moveToguestMode = () => navigate('/guest');


  return (
    <>
    <div className='cards' dir='rtl'>
      <div class="card" style={{width:"20rem", textAlign: 'center'}}>
        <img src={img1} class="card-img-top" alt="..." />
        <div class="card-body" style={{backgroundColor: "white"}}>
          <h5 class="card-title" style={{backgroundColor: "white"}}>מעונין לארח?</h5>
          <p class="card-text" style={{backgroundColor: "white"}}>בוא והיה שותף באירוח משפחה מאזור המלחמה באפשרויות שביכולתך</p>
          <button type="button" class="btn btn-warning" onClick={moveTohostMode}>
            מלא טופס
          </button>
          </div>
      </div>

      <div class="card" style={{width:"20rem", textAlign: 'center'}}>
        <img src={img2} class="card-img-top" alt="..."/>
        <div class="card-body" style={{backgroundColor: "white"}}>
          <h5 class="card-title" style={{backgroundColor: "white"}}>מעונין להתארח?</h5>
          <p class="card-text" style={{backgroundColor: "white"}}>כאן תוכל למצוא את המארח המתאים בדיוק לצרכך, הוא מחכה רק לך!</p>
          <button type="button" class="btn btn-warning" onClick={moveToguestMode}>
            מצא מארח
          </button>
          </div>
      </div>
      </div>
    </>
  )
}
