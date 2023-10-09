import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import './home.css'
import { Header } from "../Header";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const schema = yup.object().shape({
    id: yup.string(),
    name: yup.string().required("נא להכניס ערך"),
    city: yup.string().required("נא להכניס ערך"),
    accommodationUnit: yup.bool().required(" נא לסמן האם יש כניסה נפרדת"),
    hasMMD: yup.bool().required("נא לסמן אם קיים מרחב מוגן"),
    numOfBeds: yup.number().integer().required(),
    numOfMattresses: yup.number().integer().required(),
    numOfCribs: yup.number().integer().required(),
    currentlyAvailable: yup.bool().required(" נא לסמן האם המקום פנוי כעת"),
    isAccessible: yup.bool().required("נא לסמן האם המקום נגיש לנכים"),
    payment: yup.bool().required("נא לסמן האם הינכם מבקשים תשלום (בהערות ניתן לציין בכמה מדובר)"),
    notes: yup.string(),
    phone: yup.string().required().matches(phoneRegExp, 'Phone number is not valid'),
    whatsapp: yup.bool().required("נא לסמן האם הינכם מחזיקים ווצאפ"),
    email: yup.string(),
});
function Host() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    return (
        <>
        <Header></Header>
            <section className="h-100" style={{ "backgroundColor": "#9A616D" }}>
                <div dir="rtl" className="form-group">

                    <div className="form-group row">
                        <form className="form" onSubmit={handleSubmit()}>
                            <div style={{ "display": "flex" }}>
                                {/* <h3 className="fw-normal mb-3 pb-3" style={{ "letterSpacing": "1px", "marginLeft": "100px" }}>הרשמה לאתר</h3> */}
                            </div>
                            <div className="form-outline mb-4">
                                <label className="staticEmail" for="form3Example1m">שם מלא</label>
                                <br />
                                <input id="form3Example1m" className="form-control"
                                    type="text"
                                    name="name"
                                    {...register('name')} />
                                    <br/>
                                <small className="text-danger">
                                    {errors?.name && errors.name.message}
                                </small>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" for="form3Example1m">עיר</label>
                                <br />
                                <input id="form3Example1m" className="form-control"
                                    type="text"
                                    name="city"
                                    {...register('city')}
                                />
                                <br/>
                                <small className="text-danger">
                                    {errors?.city && errors.city.message}
                                </small>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" for="form3Example1m">האם יש כניסה נפרדת?</label>
                                <br />
                                <input type="radio" value="true" name="accommodationUnit"
                                    {...register('accommodationUnit')} />
                                <label className="form-check-label" for="form3Example1m">כן</label>
                                <br />
                                <input type="radio" value="false" name="accommodationUnit"
                                    {...register('accommodationUnit')}
                                />
                                <label className="form-check-label" for="form3Example1m">לא</label>
                                <br/>
                                <small className="text-danger">
                                    {errors?.accommodationUnit && errors.accommodationUnit.message}
                                </small>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" for="form3Example1m">האם יש מרחב מוגן?</label>
                                <br />
                                <input type="radio" value="true" name="hasMMD"
                                    {...register('hasMMD')}
                                />
                                <label className="form-check-label" for="form3Example1m">כן</label>

                                <br />
                                <input type="radio" value="false" name="hasMMD"
                                    {...register('hasMMD')} />
                                <label className="form-check-label" for="form3Example1m">לא</label>
                                <br/>
                                <small className="text-danger">
                                    {errors?.hasMMD && errors.hasMMD.message}
                                </small>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" for="form3Example1m">מספר מיטות</label>
                                <br />
                                <input id="form3Example1m" className="form-control"
                                    type="number"
                                    name="numOfBeds"
                                    min="0"
                                    {...register('numOfBeds')}
                                    defaultValue={0}
                                />
                                <br/>
                                <small className="text-danger">
                                    {errors?.numOfBeds && errors.numOfBeds.message}
                                </small>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" for="form3Example1m">מספר מזרנים</label>
                                <br />
                                <input id="form3Example1m" className="form-control"
                                    type="number"
                                    name="numOfMattresses"
                                    min="0"
                                    {...register('numOfMattresses')}
                                    defaultValue={0}
                                />
                                <br/>
                                <small className="text-danger">
                                    {errors?.numOfMattresses && errors.numOfMattresses.message}
                                </small>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" for="form3Example1m">מספר עריסות</label>
                                <br />
                                <input id="form3Example1m" className="form-control"
                                    type="number"
                                    name="numOfCribs"
                                    min="0"
                                    {...register('numOfBeds')}
                                    defaultValue={0}
                                />
                                <br/>
                                <small className="text-danger">
                                    {errors?.numOfCribs && errors.numOfCribs.message}
                                </small>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" for="form3Example1m">הא זמין כרגע?</label>
                                <br />
                                <input type="radio" value="true" name="currentlyAvailable"
                                    {...register('currentlyAvailable')} />
                                <label className="form-check-label" for="form3Example1m">כן</label>

                                <br />
                                <input type="radio" value="false" name="currentlyAvailable"
                                    {...register('currentlyAvailable')} />
                                <label className="form-check-label" for="form3Example1m">לא</label>
                                <br/>
                                <small className="text-danger">
                                    {errors?.currentlyAvailable && errors.currentlyAvailable.message}
                                </small>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" for="form3Example1m">האם המקום נגיש?</label>
                                <br />
                                <input type="radio" value="true" name="isAccessible"
                                    {...register('isAccessible')}
                                />
                                <label className="form-check-label" for="form3Example1m">כן</label>
                                <br />
                                <input type="radio" value="false" name="isAccessible"
                                    {...register('isAccessible')}
                                />
                                <label className="form-check-label" for="form3Example1m">לא</label>
                                <br/>
                                <small className="text-danger">
                                    {errors?.isAccessible && errors.isAccessible.message}
                                </small>
                            </div>
                            <div>
                                <label className="form-label" for="form3Example1m">האם בתשלום</label>
                                <br />
                                <input type="radio" value="true" name="payment"
                                    {...register('payment')} />
                                <label className="form-check-label" for="form3Example1m">כן</label>
                                <br />
                                <input type="radio" value="false" name="payment"
                                    {...register('payment')}
                                />
                                <label className="form-check-label" for="form3Example1m">לא</label>
                                <br />
                                <small className="text-danger">
                                    {errors?.payment && errors.payment.message}
                                </small>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" for="form3Example1m">הערות</label>
                                <br />
                                <textarea
                                    id="form3Example1m"
                                    className="form-control"
                                    name="notes"
                                    {...register('notes')} />
                                    <br/>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" for="form3Example1m">מספר טלפון</label>
                                <br />
                                <input
                                    id="form3Example1m"
                                    className="form-control"
                                    type="text"
                                    name="phone"
                                    maxLength="10"
                                    {...register('phone')}
                                />
                                <br/>
                                <small className="text-danger">
                                    {errors?.phone && errors.phone.message}
                                </small>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" for="form3Example1m">האם יש ווצאפ?</label>
                                <br />
                                <input type="radio" value="true" name="whatsapp"
                                    {...register('whatsapp')}
                                />
                                <label className="form-check-label" for="form3Example1m">כן</label>
                                <br />
                                <input type="radio" value="false" name="whatsapp"
                                    {...register('whatsapp')}
                                />
                                <label className="form-check-label" for="form3Example1m">לא</label>
                                <br />
                                <small className="text-danger">
                                    {errors?.whatsapp && errors.whatsapp.message}
                                </small>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" for="form3Example1m">דואר אלקטרוני</label>
                                <br />
                                <input
                                    id="form3Example1m"
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    pattern="[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+"
                                    maxLength="255"
                                    {...register('email')}
                                />
                            </div>
                            <button className="btn btn-dark btn-lg btn-block"><h3>עדכון</h3></button>
                        </form>
                    </div>
                </div >

            </section>
        </>
    );
}
export default Host