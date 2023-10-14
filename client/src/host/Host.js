import * as yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Header } from "../Header";
import { getToken } from "../loginWithAuth/TokenService";
import { MDBContainer } from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";
import "./Host.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExplanationModal } from "./ExplanationModal";




function Host() {
    const numOfBedsIsOK = useRef(true);
    const baseUrl = process.env.REACT_APP_API_URL;
    const hostUrl = `${baseUrl}/auth/register`;
    const isSendSuccessfuly = useRef(false);
    const navigate = useNavigate();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const schema = yup.object().shape({
        id: yup.string(),
        name: yup.string().required("נא להכניס ערך"),
        city: yup.string().required("נא להכניס ערך"),
        accommodationUnit: yup.bool().required("נא לסמן"),
        hasMMD: yup.bool().required("נא לסמן אם קיים מרחב מוגן"),
        numOfBeds: yup.number().required("נא להכניס כמה מיטות יש לכם"),
        numOfMattresses: yup.number().required("נא להכניס כמה מזרונים יש(ניתן להכניס 0)"),
        numOfCribs: yup.number()/*.required("נא להכניס ערך(ניתן להכניס 0)")*/,
        currentlyAvailable: yup.bool().required("נא לסמן"),
        isAccessible: yup.bool(),
        payment: yup.bool().required("נא לסמן"),
        notes: yup.string(),
        phone: yup.string().matches(phoneRegExp, 'נא הכנס פאלאפון תקין'),
        whatsapp: yup.bool(),
        email: yup.string().required("נא להכניס כתובת מייל"),
        password: yup.string().min(5, "סיסמה חייבת להיות לפחות 5 תווים").max(12).required()
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    var config = {
        headers: { "x-access-token": getToken() }
    };

    const onSubmit = async (data) => {
        if (data.numOfBeds + data.numOfMattresses === 0) {
            numOfBedsIsOK.current = false
        }
        else {
            numOfBedsIsOK.current = true;
            await axios.post(hostUrl, data, config)
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        isSendSuccessfuly.current = true;
                        navigate('/ExplanationModal')

                    }

                })
                .catch(error => {
                    if(error.response.status === 404){
                        navigate("/error", { state: { error: "דף זה לא נמצא (שגיאת 404) נסה שוב מאוחר יותר" } } );
                    }
                    else if(error.response.status >= 400 && error.response.status <500){
                        navigate("/error", { state: { error: "שגיאת לקוח. נסה שוב מאוחר יותר, באם התקלה ממשיכה אנא צור קשר" } } );
    
                    }
                    else{
                        navigate("/error", { state: { error: "שגיאת שרת. נסה שוב מאוחר יותר, באם התקלה ממשיכה אנא צור קשר" } } );
                    }                });
        }
    }


    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
    }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    return (
        <>
            <div class="host-wrap" id="host-wrap">
                <header>
                    <div style={{ height: "8vh" }}></div>
                </header>
                <h3 style={{ "letterSpacing": "1px", margin: "auto", marginBottom: "30px" }}>הרשמה ופרסום דירה</h3>
                <div className="col">
                    <div className="row g-0">
                        <div className="col-xl-6" id="form-host">
                            <div className="card-body p-md-5 text-black">
                                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="form3Example1m">איש קשר</label>
                                        <input id="form3Example1m" className="form-control"
                                            type="text"
                                            name="name"
                                            {...register('name')}
                                        />
                                        <small className="text-danger">
                                            {errors?.name && errors.name.message}
                                        </small>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="form3Example1m">פלאפון</label>
                                        <input id="form3Example1m" className="form-control"
                                            type="text"
                                            name="phone"
                                            {...register('phone')}
                                        />
                                        <small className="text-danger">
                                            {errors?.phone && errors.phone.message}
                                        </small>
                                        <div class="form-check">
                                            <input class="form-check-input"
                                                type="checkbox"
                                                value=""
                                                name="whatsapp"
                                                id="flexCheckDefault"
                                                {...register('whatsapp')} />
                                            <label class="form-check-label" for="flexCheckDefault">
                                                whatsapp
                                            </label>
                                            <small class="text-danger">
                                                {errors?.whatsapp && errors.payment.whatsapp}
                                            </small>
                                        </div>
                                    </div>


                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="form3Example1m">עיר</label>
                                        <input id="form3Example1m" className="form-control"
                                            type="text"
                                            name="city"
                                            {...register('city')}
                                        />
                                        <small className="text-danger">
                                            {errors?.city && errors.city.message}
                                        </small>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="form3Example1m">כתובת מייל</label>
                                        <input id="form3Example1m" className="form-control"
                                            type="email"
                                            name="email"
                                            pattern="[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+"
                                            maxLength="255"
                                            {...register('email')}
                                        />
                                        <small className="text-danger">
                                            {errors?.email && errors.email.message}
                                        </small>
                                    </div>

                                    <div className="form-group md-6">
                                        <label for="inputPassword4">סיסמה</label>
                                        <div style={{ display: "flex" }}>
                                            <input id="inputPassword4" className="form-control"
                                                name="password"
                                                {...register('password')}
                                                type={passwordType} onChange={handlePasswordChange}
                                                value={passwordInput}
                                            />
                                            <div className="input-group-btn">
                                                <p className="btn btn-outline-dark" onClick={togglePassword}>
                                                    {passwordType === "password" ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                                    </svg>}
                                                </p>
                                            </div>
                                        </div>

                                        <small className="text-danger">
                                            {errors?.password && errors.password.message}
                                        </small>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 mb-4">
                                            <label className="form-label" for="numOfBeds">מספר מיטות</label>
                                            <input id="numOfBeds" className="form-control"
                                                type="number"
                                                name="numOfBeds"
                                                defaultValue={0}
                                                {...register('numOfBeds')}
                                            />
                                            <small className="text-danger">
                                                {errors.numOfBeds && errors.numOfBeds.message}
                                            </small>
                                        </div>
                                        <div className="col-md-4 mb-4">
                                            <label className="form-label" for="form3Example1m">מספר מזרנים</label>
                                            <input id="form3Example1m" className="form-control"
                                                type="number"
                                                name="numOfMattresses"
                                                defaultValue={0}
                                                {...register('numOfMattresses')}
                                            />
                                            <small className="text-danger">
                                                {errors.numOfMattresses && errors.numOfMattresses.message}
                                            </small>
                                        </div>
                                        <div className="col-md-4 mb-4">
                                            <label className="form-label" for="form3Example1m">מספר עריסות</label>
                                            <input dir="rtl" id="form3Example1m" className="form-control"
                                                type="number"
                                                name="numOfCribs"
                                                defaultValue={0}
                                                {...register('numOfCribs')}
                                            />
                                            <small className="text-danger">
                                                {errors.numOfCribs && errors.numOfCribs.message}
                                            </small>
                                        </div>
                                        <div>
                                            {numOfBedsIsOK.current == false && <p style={{ color: "red" }}>יש להכניס מספר מיטות/מזרונים תקין</p>}
                                        </div>
                                    </div>
                                    <div className="row" id="checkboxes">
                                        <div class="form-check">
                                            <input class="form-check-input"
                                                type="checkbox"
                                                value=""
                                                name="accommodationUnit"
                                                id="flexCheckDefault"
                                                {...register('accommodationUnit')} />
                                            <label class="form-check-label" for="flexCheckDefault">
                                                כניסה נפרדת
                                            </label>
                                            <small class="text-danger">
                                                {errors?.accommodationUnit && errors.accommodationUnit}
                                            </small>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input"
                                                type="checkbox"
                                                value=""
                                                name="hasMMD"
                                                id="flexCheckDefault"
                                                {...register('hasMMD')} />
                                            <label class="form-check-label" for="flexCheckDefault">
                                                יש ממ"ד
                                            </label>
                                            <small class="text-danger">
                                                {errors?.hasMMD && errors.hasMMD}
                                            </small>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input"
                                                type="checkbox"
                                                value=""
                                                name="currentlyAvailable"
                                                id="flexCheckDefault"
                                                {...register('currentlyAvailable')} />
                                            <label class="form-check-label" for="flexCheckDefault">
                                                זמין כרגע
                                            </label>
                                            <small class="text-danger">
                                                {errors?.currentlyAvailable && errors.currentlyAvailable}
                                            </small>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input"
                                                type="checkbox"
                                                value=""
                                                name="isAccessuble"
                                                id="flexCheckDefault"
                                                {...register('isAccessuble')} />
                                            <label class="form-check-label" for="flexCheckDefault">
                                                מקום נגיש
                                            </label>
                                            <small class="text-danger">
                                                {errors?.isAccessuble && errors.isAccessuble}
                                            </small>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input"
                                                type="checkbox"
                                                value=""
                                                name="payment"
                                                id="flexCheckDefault"
                                                {...register('payment')} />
                                            <label class="form-check-label" for="flexCheckDefault">
                                                בתשלום
                                            </label>
                                            <small class="text-danger">
                                                {errors?.payment && errors.payment}
                                            </small>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="row">
                                        <div class="form-group">
                                            <label for="form3Example1m">הערות</label>
                                            <textarea
                                                id="form3Example1m"
                                                class="form-control"
                                                name="notes"
                                                defaultValue={" "}
                                                {...register('notes')} />
                                        </div>
                                    </div>
                                    <br></br>
                                    <button className="btn btn-dark btn-lg btn-block">הרשמה</button>
                                    {isSendSuccessfuly.current == true ? <h3>
                                        הדירה נוספה בהצלחה. תודה רבה! תוכל לעדכן את הפרטים בכל עת.
                                    </h3> : <></>}
                                </form>
                                <br></br>
                                <br></br>

                            </div>
                        </div>
                    </div>
                    <br></br>
                </div>
            </div >
        </>);
}
export default Host