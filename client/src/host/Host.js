import * as yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// import { useDispatch, useSelector } from "react-redux";


const schema = yup.object().shape({
    id: yup.string(),
    name: yup.string().required("נא להכניס ערך"),
    city: yup.string().required("נא להכניס ערך"),
    accommodationUnit: yup.bool().required("נא לסמן"),
    hasMMD: yup.bool().required("נא לסמן אם קיים מרחב מוגן"),
    numOfBeds: yup.number().required("נא להכניס כמה מיטות יש לכם"),
    numOfMattresses: yup.number().required("נא להכניס כמה מזרונים יש(ניתן להכניס 0)"),
    numOfCribs: yup.number().required("נא להכניס ערך(ניתן להכניס 0)"),
    currentlyAvailable: yup.bool().required("נא לסמן"),
    isAccessible: yup.bool(),
    payment: yup.bool().required("נא לסמן"),
    notes: yup.string(),
    phone: yup.string().required().matches(phoneRegExp, 'Phone number is not valid'),
    whatsapp: yup.bool().required("נא לסמן"),
    email: yup.string(),
});
function Host() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    return (
    <>
        <div dir="rtl" className="card card-registration my-10">
            <div className="row g-0">
                <div className="card-body p-md-5 text-black">
                    <form className="form" onSubmit={}>
                        <>
                        <div style={{ "display": "flex" }}>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="form3Example1m">שם מלא</label>
                            <input id="form3Example1m" className="form-control"
                                type="text"
                                name="name"
                                {...register('name')} />
                            <small className="text-danger">
                                {errors?.name && errors.name.message}
                            </small>
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
                            <label className="form-label" for="form3Example1m">האם יש כניסה נפרדת?</label>
                            <br />
                            <label className="form-label" for="form3Example1m">כן</label>
                            <input type="radio" value="true" name="accommodationUnit"
                                {...register('accommodationUnit')} />
                            <br />
                            <label className="form-label" for="form3Example1m">לא</label>
                            <input type="radio" value="false" name="accommodationUnit"
                                {...register('accommodationUnit')}
                            />
                            <small className="text-danger">
                                {errors?.accommodationUnit && errors.accommodationUnit.message}
                            </small>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="form3Example1m">האם יש מרחב מוגן?</label>
                            <br />
                            <label className="form-label" for="form3Example1m">כן</label>
                            <input type="radio" value="true" name="hasMMD"
                                {...register('hasMMD')}
                            />
                            <br />
                            <label className="form-label" for="form3Example1m">לא</label>
                            <input type="radio" value="false" name="hasMMD"
                                {...register('hasMMD')} />
                            <small className="text-danger">
                                {errors?.hasMMD && errors.hasMMD.message}
                            </small>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="form3Example1m">מספר מיטות</label>
                            <input id="form3Example1m" className="form-control"
                                type="number"
                                name="numOfBeds"
                                min="0"
                                {...register('numOfBeds')}
                                defaultValue={0}
                            />
                            <small className="text-danger">
                                {errors?.numOfBeds && errors.numOfBeds.message}
                            </small>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="form3Example1m">מספר מזרנים</label>
                            <input id="form3Example1m" className="form-control"
                                type="number"
                                name="numOfMattresses"
                                min="0"
                                {...register('numOfMattresses')}
                                defaultValue={0}
                            />
                            <small className="text-danger">
                                {errors?.numOfMattresses && errors.numOfMattresses.message}
                            </small>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="form3Example1m">מספר עריסות</label>
                            <input id="form3Example1m" className="form-control"
                                type="number"
                                name="numOfCribs"
                                min="0"
                                {...register('numOfBeds')}
                                defaultValue={0}
                            />
                            <small className="text-danger">
                                {errors?.numOfCribs && errors.numOfCribs.message}
                            </small>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="form3Example1m">הא זמין כרגע?</label>
                            <br />
                            <label className="form-label" for="form3Example1m">כן</label>
                            <input type="radio" value="true" name="currentlyAvailable"
                                {...register('currentlyAvailable')} />
                            <br />
                            <label className="form-label" for="form3Example1m">לא</label>
                            <input type="radio" value="false" name="currentlyAvailable"
                                {...register('currentlyAvailable')} />
                            <small className="text-danger">
                                {errors?.currentlyAvailable && errors.currentlyAvailable.message}
                            </small>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="form3Example1m">האם המקום נגיש?</label>
                            <br />

                            <label className="form-label" for="form3Example1m">כן</label>

                            <input type="radio" value="true" name="isAccessible"
                                {...register('isAccessible')}
                            />
                            <br />
                            <label className="form-label" for="form3Example1m">לא</label>
                            <input type="radio" value="false" name="isAccessible"
                                {...register('isAccessible')}
                            />
                            <small className="text-danger">
                                {errors?.isAccessible && errors.isAccessible.message}
                            </small>
                        </div>
                    <div>
                        <label className="form-label" for="form3Example1m">האם בתשלום</label>
                        <br></br>
                        <label className="form-label" for="form3Example1m">כן</label>

                        <input type="radio" value="true" name="payment"
                            {...register('payment')} />
                        <br />
                        <label className="form-label" for="form3Example1m">לא</label>
                        <input type="radio" value="false" name="payment"
                            {...register('payment')}
                        />
                        <br></br>
                        <small className="text-danger">
                            {errors?.payment && errors.payment.message}
                        </small>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" for="form3Example1m">הערות</label>
                    <textarea
                        id="form3Example1m"
                        className="form-control"
                        name="notes"
                        {...register('notes')} />
                    <small className="text-danger">
                        {errors?.isAccessible && errors.isAccessible.message}
                    </small>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" for="form3Example1m">מספר טלפון</label>
                    <input
                        id="form3Example1m"
                        className="form-control"
                        type="text"
                        name="phone"
                        maxLength="10"
                        {...register('phone')}
                    />
                    <small className="text-danger">
                        {errors?.phone && errors.phone.message}
                    </small>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" for="form3Example1m">האם יש ווצאפ?</label>
                    <br></br>
                    <label className="form-label" for="form3Example1m">כן</label>

                    <input type="radio" value="true" name="whatsapp"
                        {...register('whatsapp')}
                    />
                    <br></br>
                    <label className="form-label" for="form3Example1m">לא</label>
                    <input type="radio" value="false" name="whatsapp"
                        {...register('whatsapp')}
                    />
                    <br></br>
                    <small className="text-danger">
                        {errors?.whatsapp && errors.payment.whatsapp}
                    </small>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" for="form3Example1m">דואר אלקטרוני</label>
                    <input
                        id="form3Example1m"
                        className="form-control"
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
                <button className="btn btn-dark btn-lg btn-block">עדכון</button>
                </>
            </form>
        </div>
    </div >
 </div >
    </>);
}
export default Host