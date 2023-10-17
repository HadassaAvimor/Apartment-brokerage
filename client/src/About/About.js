import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import "../style/about.css";

function About() {
    const navigate = useNavigate();


    return (
        <>
            <div className="about">
                <br></br>
                <h3>?אז מי עומד מאחורי המיזם</h3>
                <p>היי!  אנחנו כמה חברות שסיימו מסלול הנדסת תוכנה בסמינר בית יעקב בירושלים</p>
                <p>                    (:מייד כשהתחילה המלחמה ידענו שאנחנו רוצות לתרום למען עם ישראל, ועדיף בדבר שאנחנו הכי טובות בו- בקידוד
                </p>
                <p>
                    כשצפינו במאות ההודעות המתפרסמות ברשת ללא תיאום וסנכרון ביניהם ומציעות לארח אנשים בדירתם, ידענו בדיוק מה אנחנו צריכות לעשות ותוך 72 שעות הקמנו אתר שכל מי שרוצה להתארח או לארח יוכל להשתמש בו בקלות
                </p>
                <p>
                    apartmentbrokerage22@gmail.com ניתן לפנות אלינו בכל עת במייל
                </p>
                <p>.מקוות שהועלנו לעם ישראל:) צוות פיתוח- פסי מרגלית, מרים יומטוביאן, חוי דייטש, חוה שץ, בת שבע ימין והדסה אבימור</p>
                <Button variant="Light" id="linkToHomePage"
                    onClick={() =>  navigate('/')} >
                    חזרה לדף הבית
                </Button>

            </div>
        </>
    );
}
export default About;