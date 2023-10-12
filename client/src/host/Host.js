// import * as yup from "yup";
// import axios from "axios";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Header } from "../Header";
// import { getToken } from "../loginWithAuth/TokenService";
// import { MDBContainer } from "mdb-react-ui-kit";
// import { useForm } from "react-hook-form";
// import "./Host.css"




// function Host() {
//     const baseUrl = process.env.REACT_APP_API_URL;
//     console.log(baseUrl);
//     const hostUrl = `${baseUrl}/auth/register`;
//     const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

//     const schema = yup.object().shape({
//         id: yup.string(),
//         name: yup.string().required("נא להכניס ערך"),
//         city: yup.string().required("נא להכניס ערך"),
//         accommodationUnit: yup.bool().required("נא לסמן"),
//         hasMMD: yup.bool().required("נא לסמן אם קיים מרחב מוגן"),
//         numOfBeds: yup.number().required("נא להכניס כמה מיטות יש לכם"),
//         numOfMattresses: yup.number().required("נא להכניס כמה מזרונים יש(ניתן להכניס 0)"),
//         numOfCribs: yup.number()/*.required("נא להכניס ערך(ניתן להכניס 0)")*/,
//         currentlyAvailable: yup.bool().required("נא לסמן"),
//         isAccessible: yup.bool(),
//         payment: yup.bool().required("נא לסמן"),
//         notes: yup.string(),
//         phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
//         whatsapp: yup.bool().required("נא לסמן"),
//         email: yup.string(),
//         password: yup.string().min(5).max(12).required()
//     });

//     const { register, handleSubmit, formState: { errors }, reset } = useForm({
//         resolver: yupResolver(schema),
//     });
//     var config = {
//         headers: { "x-access-token": getToken() }
//     };

//     const onSubmit = async (data) => {
//         console.log(data);
//         await axios.post(hostUrl, data, config)
//             .then(response => {
//                 if (response.status >= 200 && response.status < 300) {
//                     console.log(response.data);
//                 }

//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }

//     return (
//         <>
//             <div class="wrap">
//             <header>
//                 <Header></Header>
//             </header>

//                 <div className="container" style={{ width: "50vw", marginTop: "9vh" }}>
//                     <form className="form" onSubmit={handleSubmit(onSubmit)} style={{ width: "40vw", marginLeft: "6vw", marginRight: "3vw", padding: "10vh" }}>
//                         <>
//                             <div style={{ "display": "flex" }}>

//                                 <div class="form-group">
//                                     <input class="form-control"
//                                         type="text"
//                                         name="city"
//                                         {...register('city')}
//                                     />
//                                     <label id="label">עיר</label>
//                                     <small class="text-danger">
//                                         {errors?.city && errors.city.message}
//                                     </small>

//                                     <input class="form-control" type="text" name="name" id="name" {...register('name')} />
//                                     <label for="name" id="label">שם מלא</label>
//                                     <small class="text-danger">
//                                         {errors?.name && errors.name.message}
//                                     </small>
//                                 </div>

//                             </div>


//                             <div class="form-row">

//                                 <div class="form-group">
//                                     <div class="radio-row">
//                                         <label for="accommodationUnit-true" >כן</label>
//                                         <input type="radio" id="accommodationUnit-true" value="true" name="accommodationUnit" {...register('accommodationUnit')} />
//                                     </div>
//                                     <div class="radio-row">
//                                         <label for="accommodationUnit-false" >לא</label>
//                                         <input type="radio" id="accommodationUnit-false" value="false" name="accommodationUnit" {...register('accommodationUnit')} />
//                                     </div>
//                                     <label for="accommodationUnit" id="label">כניסה נפרדת</label>
//                                     <small class="text-danger">
//                                         {errors?.accommodationUnit && errors.accommodationUnit.message}
//                                     </small>

//                                     <div class="radio-row">
//                                         <label for="hasMMD-true">כן</label>
//                                         <input type="radio" id="hasMMD-true" value="true" name="hasMMD" {...register('hasMMD')} />
//                                     </div>
//                                     <div class="radio-row">
//                                         <label for="hasMMD-false">לא</label>
//                                         <input type="radio" id="hasMMD-false" value="false" name="hasMMD" {...register('hasMMD')} />
//                                     </div>
//                                     <label class="form-label" for="hasMMD" id="label">מרחב מוגן</label>
//                                     <small class="text-danger">
//                                         {errors?.hasMMD && errors.hasMMD.message}
//                                     </small>
//                                 </div>
//                             </div>

//                             <div class="form-row">
//                                 <div class="form-group">
//                                     <input class="form-control"
//                                         type="number"
//                                         name="numOfBeds"
//                                         min="0"
//                                         {...register('numOfBeds')}
//                                         defaultValue={0}
//                                     />
//                                     <label>מספר מיטות</label>
//                                     <small class="text-danger">
//                                         {errors?.numOfBeds && errors.numOfBeds.message}
//                                     </small>
//                                 </div>
//                                 <div class="form-group">
//                                     <input class="form-control"
//                                         type="number"
//                                         name="numOfMattresses"
//                                         min="0"
//                                         {...register('numOfMattresses')}
//                                         defaultValue={0}
//                                     />
//                                     <label >מספר מזרנים</label>
//                                     <small class="text-danger">
//                                         {errors?.numOfMattresses && errors.numOfMattresses.message}
//                                     </small>
//                                 </div>
//                                 <div class="form-group">
//                                     <input id="form3Example1m" class="form-control"
//                                         type="number"
//                                         name="numOfCribs"
//                                         min="0"
//                                         {...register('numOfBeds')}
//                                         defaultValue={0}
//                                     />
//                                     <label for="form3Example1m">מספר עריסות</label>
//                                     <small class="text-danger">
//                                         {errors?.numOfCribs && errors.numOfCribs.message}
//                                     </small>
//                                 </div>
//                             </div>
//                             <div class="form-row">
//                                 <div class="form-group">
//                                     <div class="radio-row">
//                                         <label for="currentlyAvailable-true">כן</label>
//                                         <input type="radio" id="currentlyAvailable-true" value="true" name="currentlyAvailable" {...register('currentlyAvailable')} />
//                                     </div>
//                                     <div class="radio-row">
//                                         <label for="currentlyAvailable-false">לא</label>
//                                         <input type="radio" id="currentlyAvailable-false" value="false" name="currentlyAvailable" {...register('currentlyAvailable')} />
//                                     </div>
//                                     <label class="form-label" for="currentlyAvailable" id="label"> זמין כרגע</label>
//                                     <small class="text-danger">
//                                         {errors?.currentlyAvailable && errors.currentlyAvailable.message}
//                                     </small>
//                                 </div>
//                                 <div class="form-group">
//                                     <div class="radio-row">
//                                         <label for="isAccessible-true">כן</label>
//                                         <input type="radio" id="isAccessible-true" value="true" name="isAccessible" {...register('isAccessible')} />
//                                     </div>
//                                     <div class="radio-row">
//                                         <label for="isAccessible-false">לא</label>
//                                         <input type="radio" id="isAccessible-false" value="false" name="isAccessible" {...register('isAccessible')} />
//                                     </div>
//                                     <label class="form-label" for="isAccessuble" id="label">מקום נגיש</label>
//                                     <small class="text-danger">
//                                         {errors?.isAccessible && errors.isAccessible.message}
//                                     </small>
//                                 </div>
//                                 <div class="form-group">
//                                     <div class="radio-row">
//                                         <label for="payment-true">כן</label>
//                                         <input type="radio" id="payment-true" value="true" name="payment" {...register('payment')} />
//                                     </div>
//                                     <div class="radio-row">
//                                         <label for="payment-false">לא</label>
//                                         <input type="radio" id="payment-false" value="false" name="payment" {...register('payment')} />
//                                     </div>
//                                     <label class="form-label" for="payment" id="label">בתשלום</label>
//                                     <small class="text-danger">
//                                         {errors?.payment && errors.payment.message}
//                                     </small>
//                                 </div>
//                             </div>
   
//                             <div class="form-row">
//                                 <div class="form-group">
                                    
//                                     <div class="radio-row">
//                                         <label for="whatsapp-true">כן</label>
//                                         <input type="radio" id="whatsapp-true" value="true" name="whatsapp" {...register('whatsapp')} />
//                                     </div>
//                                     <div class="radio-row">
//                                         <label for="whatsapp-false">לא</label>
//                                         <input type="radio" id="whatsapp-false" value="false" name="whatsapp" {...register('whatsapp')} />
//                                     </div>
//                                     <label class="form-label" for="whatsapp" id="label">יש ווצאפ</label>
//                                     <br></br>

//                                     <small class="text-danger">
//                                         {errors?.whatsapp && errors.payment.whatsapp}
//                                     </small>
//                                     <input
//                                         id="form3Example1m"
//                                         class="form-control"
//                                         type="text"
//                                         name="phone"
//                                         maxLength="10"
//                                         {...register('phone')}
//                                     />
//                                     <label for="form3Example1m" id="label">מספר טלפון</label>
//                                     <small class="text-danger">
//                                         {errors?.phone && errors.phone.message}
//                                     </small>
//                                 </div>
//                             </div>
//                             <div class="form-row">
//                                 <div class="form-group">
//                                     <input
//                                         id="form3Example1m"
//                                         class="form-control"
//                                         type="email"
//                                         name="email"
//                                         pattern="[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+"
//                                         maxLength="255"
//                                         {...register('email')}
//                                     />
//                                     <label id="label">דואר אלקטרוני</label>
//                                     <small class="text-danger">
//                                         {errors?.email && errors.email.message}
//                                     </small>
//                                 </div>

//                                 <div class="form-group">
//                                     <input type="password" class="form-control" placeholder="password" {...register("password")}></input>
//                                     <label for="form3Example1m" id="label">סיסמה</label>

//                                     <p>{errors.password?.message}</p>
//                                 </div>

//                                 <div class="form-group">
//                                     <textarea
//                                         id="form3Example1m"
//                                         class="form-control"
//                                         name="notes"
//                                         {...register('notes')} />
//                                     <label for="form3Example1m">הערות</label>
//                                     <small class="text-danger">
//                                         {errors?.isAccessible && errors.isAccessible.message}
//                                     </small>
//                                 </div>

//                             </div>

//                         </>
//                         <input class="btn btn-outline-dark" type="submit"></input>
//                     </form>
//                 </div>
//             </div >
//         </>);
// }
// export default Host








import * as yup from "yup";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Header } from "../Header";
import { getToken } from "../loginWithAuth/TokenService";
import { MDBContainer } from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";
import "./Host.css"




function Host() {
    const baseUrl = process.env.REACT_APP_API_URL;
    console.log(baseUrl);
    const hostUrl = `${baseUrl}/auth/register`;
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
        email: yup.string(),
        password: yup.string().min(5).max(12).required()
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    var config = {
        headers: { "x-access-token": getToken() }
    };

    const onSubmit = async (data) => {
        console.log(data);
        await axios.post(hostUrl, data, config)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    console.log(response.data);
                }

            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <div class="wrap">
                <header>
                    <div style={{ height: "8vh" }}></div>
                </header>

                <div className="container" style={{ width: "50vw", marginTop: "9vh" }}>
                    <form className="form" onSubmit={handleSubmit(onSubmit)} style={{ width: "40vw", marginLeft: "6vw", marginRight: "3vw", padding: "10vh" }}>
                        <>
                            <div style={{ "display": "flex" }}>

                                <div class="form-group">
                                    <input class="form-control"
                                        type="text"
                                        name="city"
                                        {...register('city')}
                                    />
                                    <label id="label">עיר</label>
                                    <small class="text-danger">
                                        {errors?.city && errors.city.message}
                                    </small>

                                    <input class="form-control" type="text" name="name" id="name" {...register('name')} />
                                    <label for="name" id="label">שם מלא</label>
                                    <small class="text-danger">
                                        {errors?.name && errors.name.message}
                                    </small>
                                </div>

                            </div>


                            <div class="form-row">

                                <div class="form-group">
                                    <div class="radio-row">
                                        <label for="accommodationUnit-true" >כן</label>
                                        <input type="radio" id="accommodationUnit-true" value="true" name="accommodationUnit" {...register('accommodationUnit')} />
                                    </div>
                                    <div class="radio-row">
                                        <label for="accommodationUnit-false" >לא</label>
                                        <input type="radio" id="accommodationUnit-false" value="false" name="accommodationUnit" {...register('accommodationUnit')} />
                                    </div>
                                    <label for="accommodationUnit" id="label">כניסה נפרדת</label>
                                    <small class="text-danger">
                                        {errors?.accommodationUnit && errors.accommodationUnit.message}
                                    </small>

                                    <div class="radio-row">
                                        <label for="hasMMD-true">כן</label>
                                        <input type="radio" id="hasMMD-true" value="true" name="hasMMD" {...register('hasMMD')} />
                                    </div>
                                    <div class="radio-row">
                                        <label for="hasMMD-false">לא</label>
                                        <input type="radio" id="hasMMD-false" value="false" name="hasMMD" {...register('hasMMD')} />
                                    </div>
                                    <label class="form-label" for="hasMMD" id="label">מרחב מוגן</label>
                                    <small class="text-danger">
                                        {errors?.hasMMD && errors.hasMMD.message}
                                    </small>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <input class="form-control"
                                        type="number"
                                        name="numOfBeds"
                                        min="0"
                                        {...register('numOfBeds')}
                                        defaultValue={0}
                                    />
                                    <label>מספר מיטות</label>
                                    <small class="text-danger">
                                        {errors?.numOfBeds && errors.numOfBeds.message}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <input class="form-control"
                                        type="number"
                                        name="numOfMattresses"
                                        min="0"
                                        {...register('numOfMattresses')}
                                        defaultValue={0}
                                    />
                                    <label >מספר מזרנים</label>
                                    <small class="text-danger">
                                        {errors?.numOfMattresses && errors.numOfMattresses.message}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <input id="form3Example1m" class="form-control"
                                        type="number"
                                        name="numOfCribs"
                                        min="0"
                                        {...register('numOfBeds')}
                                        defaultValue={0}
                                    />
                                    <label for="form3Example1m">מספר עריסות</label>
                                    <small class="text-danger">
                                        {errors?.numOfCribs && errors.numOfCribs.message}
                                    </small>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <div class="radio-row">
                                        <label for="currentlyAvailable-true">כן</label>
                                        <input type="radio" id="currentlyAvailable-true" value="true" name="currentlyAvailable" {...register('currentlyAvailable')} />
                                    </div>
                                    <div class="radio-row">
                                        <label for="currentlyAvailable-false">לא</label>
                                        <input type="radio" id="currentlyAvailable-false" value="false" name="currentlyAvailable" {...register('currentlyAvailable')} />
                                    </div>
                                    <label class="form-label" for="currentlyAvailable" id="label"> זמין כרגע</label>
                                    <small class="text-danger">
                                        {errors?.currentlyAvailable && errors.currentlyAvailable.message}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <div class="radio-row">
                                        <label for="isAccessible-true">כן</label>
                                        <input type="radio" id="isAccessible-true" value="true" name="isAccessible" {...register('isAccessible')} />
                                    </div>
                                    <div class="radio-row">
                                        <label for="isAccessible-false">לא</label>
                                        <input type="radio" id="isAccessible-false" value="false" name="isAccessible" {...register('isAccessible')} />
                                    </div>
                                    <label class="form-label" for="isAccessuble" id="label">מקום נגיש</label>
                                    <small class="text-danger">
                                        {errors?.isAccessible && errors.isAccessible.message}
                                    </small>
                                </div>
                                <div class="form-group">
                                    <div class="radio-row">
                                        <label for="payment-true">כן</label>
                                        <input type="radio" id="payment-true" value="true" name="payment" {...register('payment')} />
                                    </div>
                                    <div class="radio-row">
                                        <label for="payment-false">לא</label>
                                        <input type="radio" id="payment-false" value="false" name="payment" {...register('payment')} />
                                    </div>
                                    <label class="form-label" for="payment" id="label">בתשלום</label>
                                    <small class="text-danger">
                                        {errors?.payment && errors.payment.message}
                                    </small>
                                </div>
                            </div>
   
                            <div class="form-row">
                                <div class="form-group">
                                    
                                    <div class="radio-row">
                                        <label for="whatsapp-true">כן</label>
                                        <input type="radio" id="whatsapp-true" value="true" name="whatsapp" {...register('whatsapp')} />
                                    </div>
                                    <div class="radio-row">
                                        <label for="whatsapp-false">לא</label>
                                        <input type="radio" id="whatsapp-false" value="false" name="whatsapp" {...register('whatsapp')} />
                                    </div>
                                    <label class="form-label" for="whatsapp" id="label">יש ווצאפ</label>
                                    <br></br>

                                    <small class="text-danger">
                                        {errors?.whatsapp && errors.payment.whatsapp}
                                    </small>
                                    <input
                                        id="form3Example1m"
                                        class="form-control"
                                        type="text"
                                        name="phone"
                                        maxLength="10"
                                        {...register('phone')}
                                    />
                                    <label for="form3Example1m" id="label">מספר טלפון</label>
                                    <small class="text-danger">
                                        {errors?.phone && errors.phone.message}
                                    </small>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <input
                                        id="form3Example1m"
                                        class="form-control"
                                        type="email"
                                        name="email"
                                        pattern="[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+"
                                        maxLength="255"
                                        {...register('email')}
                                    />
                                    <label id="label">דואר אלקטרוני</label>
                                    <small class="text-danger">
                                        {errors?.email && errors.email.message}
                                    </small>
                                </div>

                                <div class="form-group">
                                    <input type="password" class="form-control" placeholder="password" {...register("password")}></input>
                                    <label for="form3Example1m" id="label">סיסמה</label>

                                    <p>{errors.password?.message}</p>
                                </div>

                                <div class="form-group">
                                    <textarea
                                        id="form3Example1m"
                                        class="form-control"
                                        name="notes"
                                        {...register('notes')} />
                                    <label for="form3Example1m">הערות</label>
                                    <small class="text-danger">
                                        {errors?.isAccessible && errors.isAccessible.message}
                                    </small>
                                </div>

                            </div>

                        </>
                        <input class="btn btn-outline-dark" type="submit"></input>
                    </form>
                </div>
            </div >
        </>);
}
export default Host