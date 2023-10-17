import React from 'react';
import "./style/footer.css"



function Footer() {
  const emailAddress = "apartmentbrokerage22@gmail.com";
  return (
    <footer className="footer">
      <div className='text_for_footer'>

        <h6 id="h1-footer" dir='rtl' className='text_for_footer'> מצאתם מקום דרכינו? נשמח לשמוע! apartmentbrokerage22@gmail.com</h6>
        {/* <h6 id="h2-footer" dir='rtl' className='text_for_footer'>האתר בגרסת בטא, לתמיכה ודיווח על תקלות אנא כתבו לנו apartmentbrokerage22@gmail.com</h6> */}
        <h6>אנחנו מעריכים מאד את אחינו שפותחים את ביתם, ליבנו עם אחינו שנאלצים לצאת מביתם.
          אבל חשוב לנו להדגיש: הרישום לאתר הוא אוטומטי ואנחנו לא מכירים את הנרשמים.
          האחריות היא על המשתמשים באתר בלבד</h6>
      </div>
    </footer>
  );
}
export default Footer;