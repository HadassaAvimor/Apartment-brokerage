import { useEffect, useRef } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import '../style/modal.css';

export function ExplanationModal() {

    const [show, setShow] = useState(false);
    const handeClose = () => setShow(false);
    const handeShow = () => setShow(true);
    const navigate = useNavigate();
    const handeCloseNavigate = () => {
        handeClose()
        navigate('/')
    }

    const b = useRef(false);
    useEffect(() => {
        handeShow();
        debugger
    }, [])


    return (
        <>
            <Modal id="modal" show={show} onHide={() => setShow(false)} style={{ margin: "2vw" }}>
                <h4 className="text-modal">!הדירה נוספה בהצלחה</h4>
                <h5 className="text-modal">ניתן לעדכן את פרטי הדירה בכל עת ע"י כניסה לאתר עם שם המשתמש והסיסמה שלך</h5>
                    {/* <br></br> */}
                    <h5 className="text-modal">באם הדירה לא רלוונטית כרגע אנא הפוך אותה ללא זמינה, על מנת שלא תוצג</h5>
                    {/* <br></br> */}
                    <h5 className="text-modal">אירחת אנשים דרך האתר שלנו? נשמח מאוד לדעת על כך </h5>
                    <br></br>
                <Button className="modal-Button" onClick={handeCloseNavigate}>הבנתי</Button>
            </Modal>
        </>
    )

}