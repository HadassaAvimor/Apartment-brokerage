import "./style/header.css";
import { useNavigate } from "react-router-dom";

export function Header() {
    const navigate = useNavigate();
    return (
        <>
            <div className="wrap-head">
                <br></br>
                <div className="head">
                    <h2 className="Achim"><svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: "20px" }} width="30" height="30" fill="currentColor" className="bi bi-heart-half" viewBox="0 0 16 16">
                        <path d="M8 2.748v11.047c3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>אחים מארחים אחים
                    </h2>
                    <a className="Achim" dir='rtl' id="linkToAbout" onClick={() => {
                        navigate('/about');
                    }}>קצת על המיזם</a>
                </div>
                <br></br>
            </div>
        </>
    )

}