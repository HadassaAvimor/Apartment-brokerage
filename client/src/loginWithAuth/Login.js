import { useState, useEffect } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalBody,
}
from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { userLogin } from "../redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { setTokens } from "./TokenService";
import img1 from "../images/img1.jpg";
import { Link } from "react-router-dom";
import "../style/login.css";
function Login() {
    const baseUrl = process.env.REACT_APP_API_URL;
    const dispatch = useDispatch();
    let user = useSelector((state) => state.userReducer);
    const navigate = useNavigate();
    const [centredModal, setCentredModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [UserAuthentication, setUserAuthentication] = useState(true);

    const toggleShow = () => setCentredModal(!centredModal);

    useEffect(() => {
        dispatch(userLogin({}));
        setCentredModal(!centredModal);
    }, [])

    const schema = yup.object().shape({
        email: yup.string().email("כתובת מייל לא תקינה").required("נא הזן/י כתובת מייל"),
        password: yup
            .string().required("נא הזן/י סיסמא")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmitHandler = (data) => {
        console.log("data", data);
        axios.post(`${baseUrl}/auth/login`,data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    if (response.data != "") {
                        try {
                            dispatch(userLogin(response.data.user));
                            console.log(response.data.token);
                            setTokens(response.data.token);
                            navigate('/updateHost');
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                    else {
                        setUserAuthentication(true)
                    }
                }
            })
            .catch(error => {
                setUserAuthentication(false)

            })
    }

    return (
        <>
                <div className="container py-5 h-80" >
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" id="login" style={{ "borderRadius": "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img src={img1}
                                            alt="login form" className="img-fluid" style={{ "borderRadius": "1rem", marginLeft: "40px" }} />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">

                                            <form onSubmit={handleSubmit(onSubmitHandler)}>
                                                <h5 className="fw-normal mb-3 pb-3" style={{ "letterSpacing": "1px" }}>הכנס לחשבונך</h5>

                                                <div className="form-outline mb-4">
                                                    <input id="form2Example17" className="form-control form-control-lg"
                                                        type="email"
                                                        name="email"
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        {...register('email')}
                                                    />
                                                    <small className="text-danger">
                                                        {errors?.email && errors.email.message}
                                                    </small>
                                                    <label className="form-label" for="form2Example17">כתובת מייל</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input id="form2Example27" className="form-control form-control-lg"
                                                        type="password"
                                                        name="password"
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        {...register('password')}
                                                    />
                                                    <small className="text-danger">
                                                        {errors?.password && errors.password.message}
                                                    </small>
                                                    <label className="form-label" for="form2Example27">סיסמה</label>
                                                </div>
                                                <div className="pt-1 mb-4">
                                                    <button className="btn btn-dark btn-lg btn-block">כניסה</button>
                                                    {UserAuthentication == false &&
                                                        <small className="text-danger">
                                                            שם משתמש או סיסמא שגויים, נסה שוב
                                                        </small>}
                                                </div>
                                                <p className="mb-5 pb-lg-2" style={{ "color": "#393f81" }}>אין לך חשבון?<Link to="/host">הרשם כאן</Link></p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* <Footer></Footer> */}
        </>
    );
}

export default Login;