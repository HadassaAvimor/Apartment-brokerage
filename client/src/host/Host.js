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
    numOfBeds: yup.number().integer().required("נא להכניס כמה מיטות יש לכם"),
    numOfMattresses: yup.number().integer().required("נא להכניס כמה מזרונים יש"),
    numOfCribs: yup.number().integer().required("נא להכניס ערך(ניתן להכניס 0)"),
    currentlyAvailable: yup.bool().required("נא לסמן"),
    isAccessible: yup.bool(),
    payment: yup.bool().required("נא לסמן"),
    notes: yup.string(),
    phone: yup.string().required(),
    whatsapp: yup.bool().required("נא לסמן"),
    email: yup.string(),
});
function Host() {
    // const apartment = useSelector((state) => state.usersReducer);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    return (<>
        <div className="card card-registration my-10">
            <div className="row g-0">
                <div className="card-body p-md-5 text-black">
                    <form className="form" >
                        <div style={{ "display": "flex" }}>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="form3Example1m">שם מלא</label>
                            <input id="form3Example1m" className="form-control"
                                type="text"
                                name="name"
                                {...register('name')}
                                // defaultValue={apartment.name}
                            />
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
                                // defaultValue={apartment.city}
                            />
                            <small className="text-danger">
                                {errors?.city && errors.city.message}
                            </small>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="form3Example1m">האם היחידה</label>
                            <input type="radio" value="Yes" name="accommodationUnit"
                                {...register('accommodationUnit')}
                                // defaultValue={apartment.accommodationUnit}
                            />
                            <input type="radio" value="No" name="accommodationUnit"
                                {...register('accommodationUnit')}
                                // defaultValue={apartment.accommodationUnit}
                            />
                            <small className="text-danger">
                                {errors?.accommodationUnit && errors.accommodationUnit.message}
                            </small>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="form3Example1m">האם יש מרחב מוגן?</label>
                            <input type="radio" value="Yes" name="hasMMD"
                                {...register('hasMMD')}
                                // defaultValue={apartment.accommodationUnit}
                            />
                            <input type="radio" value="No" name="hasMMD"
                                {...register('hasMMD')}
                                // defaultValue={apartment.accommodationUnit}
                            />
                            <small className="text-danger">
                                {errors?.hasMMD && errors.hasMMD.message}
                            </small>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="form3Example1m">שם מלא</label>
                            <input id="form3Example1m" className="form-control"
                                type="number"
                                name="numOfBeds"
                                {...register('numOfBeds')}
                                // defaultValue={apartment.nunumOfBeds}
                            />
                            <small className="text-danger">
                                {errors?.numOfBeds && errors.numOfBeds.message}
                            </small>
                        </div>
                        
                        <button className="btn btn-dark btn-lg btn-block">עדכון</button>
                    </form>
                </div>
            </div>
        </div>
        </>);
}
export default Host