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
function Login() {
    const baseUrl = process.env.REACT_APP_API_URL;
    const dispatch = useDispatch();
    let user = useSelector((state) => state.userReducer);
    const navigate = useNavigate();
    const [centredModal, setCentredModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const toggleShow = () => setCentredModal(!centredModal);

    useEffect(() => {
        dispatch(userLogin({}));
        console.log("useEffect");
        setCentredModal(!centredModal);
    }, [])

    const schema = yup.object().shape({
        email: yup.string().email("כתובת מייל לא תקינה").required("נא הזן.י כתובת מייל"),
        password: yup
            .string().required("נא הזן.י סיסמא")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmitHandler = (data) => {
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
                            setTokens(response.data.token);
                            navigate('/host');
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                    else {
                        { document.getElementById('errorMassege').hidden = false }
                    }
                }
            })
            .catch(error => {
                { document.getElementById('errorMassege').hidden = false }
            })
    }

    return (
        <>
            <MDBModal className='login-modal' tabIndex='-1' show={centredModal} staticBackdrop={Login} /*setShow={setCentredModal}*/>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalBody className='login-body' >
                            <form onSubmit={handleSubmit(onSubmitHandler)}>
                                <input className='login-input mail-icom' placeholder='כתובת מייל' type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    {...register('email')}>
                                </input>
                                <p style={{ "color": "red" }}>{errors.email?.message}</p>
                                <input className='login-input lock-icom' placeholder='סיסמא' type='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    {...register('password')}>
                                </input>
                                <p style={{ "color": "red" }}>{errors.password?.message}</p>
                                <p style={{ "color": "red" }} id='errorMassege' hidden='true'>כתובת מייל או סיסמא שגויים</p>
                                <br></br>
                                <a href='https://www.google.com/search?q=%D7%AA%D7%A8%D7%92%D7%95%D7%9E%D7%95%D7%9F&rlz=1C1SQJL_iwIL974IL974&oq=&aqs=chrome.2.35i39i362l6j46i39i362j35i39i362.490596j0j7&sourceid=chrome&ie=UTF-8'>שכחת סיסמא?</a>
                                <br></br>
                                <MDBBtn type='submit' className='login-connect'>התחברות</MDBBtn>
                            </form>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal >
        </>
    );
}
export default Login;