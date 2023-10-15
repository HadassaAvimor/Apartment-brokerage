import * as yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Header } from "../Header";
import { getToken } from "../loginWithAuth/TokenService";
import { MDBContainer } from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExplanationModal } from "../host/ExplanationModal";

function UpdateHost() {
    const numOfBedsIsOK = useRef(true);
    const baseUrl = process.env.REACT_APP_API_URL;
    const hostUrl = `${baseUrl}/hosts`;
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
        phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        whatsapp: yup.bool().required("נא לסמן"),
    });
    const user = useSelector((state) => state.userReducer);

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
            data.password = user.password;
            data.email = user.email;
            await axios.put(hostUrl, data, config)
                .then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        navigate('/explanationModal')
                    }

                })
                .catch(error => {
                    if (error.response.status === 404) {
                        navigate("/error", { state: { error: "דף זה לא נמצא (שגיאת 404) נסה שוב מאוחר יותר" } });
                    }
                    else if (error.response.status >= 400 && error.response.status < 500) {
                        navigate("/error", { state: { error: "שגיאת לקוח. נסה שוב מאוחר יותר, באם התקלה ממשיכה אנא צור קשר" } });

                    }
                    else {
                        navigate("/error", { state: { error: "שגיאת שרת. נסה שוב מאוחר יותר, באם התקלה ממשיכה אנא צור קשר" } });
                    }
                });
        }
    }
    return (
        <>
            <div class="host-wrap" id="host-wrap">
                <header>
                    <div style={{ height: "8vh" }}></div>
                </header>
                <h3 style={{ "letterSpacing": "1px", margin: "auto", marginBottom: "30px" }}>עדכון פרטי דירה</h3>
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
                                            defaultValue={user.name}
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
                                            defaultValue={user.phone}
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
                                                checked={user.whatsapp}
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
                                            defaultValue={user.city}
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
                                            defaultValue={user.email}
                                            {...register('email')}
                                        />
                                        <small className="text-danger">
                                            {errors?.email && errors.email.message}
                                        </small>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4 mb-4">
                                            <label className="form-label" for="numOfBeds">מספר מיטות</label>
                                            <input id="numOfBeds" className="form-control"
                                                type="number"
                                                name="numOfBeds"
                                                defaultValue={user.numOfBeds}
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
                                                defaultValue={user.numOfMattresses}
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
                                                defaultValue={user.numOfCribs}
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
                                                checked={user.accommodationUnit}
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
                                                checked={user.hasMMD}
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
                                                checked={user.currentlyAvailable}
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
                                                name="isAccessible"
                                                id="flexCheckDefault"
                                                checked={user.isAccessible}
                                                {...register('isAccessible')} />
                                            <label class="form-check-label" for="flexCheckDefault">
                                                מקום נגיש
                                            </label>
                                            <small class="text-danger">
                                                {errors?.isAccessible && errors.isAccessible}
                                            </small>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input"
                                                type="checkbox"
                                                value=""
                                                name="payment"
                                                id="flexCheckDefault"
                                                checked={user.payment}
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
                                                defaultValue={user.notes}
                                                {...register('notes')} />
                                        </div>
                                    </div>
                                    <br></br>
                                    <button className="btn btn-dark btn-lg btn-block">עדכון</button>
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
export default UpdateHost;