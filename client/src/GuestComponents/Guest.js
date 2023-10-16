import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../style/guest.css';
import axios from 'axios';
import { Button, Collapse } from 'react-bootstrap';

function Guest() {
    const baseUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [visibleApartments, setVisibleApartments] = useState(10);

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >= document.body.scrollHeight - 200
        ) {
            // When the user is close to the bottom of the page, load more apartments
            setVisibleApartments((prevCount) => prevCount + 10);
        }
    };
    const [apartments, setApartments] = useState([]);
    const [filteredApartments, setFilteredApartments] = useState([]);
    const [open, setOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState();
    const [r, setR] = useState(false);
    const [filters, setFilters] = useState({
        city: '',
        accommodationUnit: false, // Set default value to false
        available: false, // Set default value to false
        hasMMD: false, // Set default value to false
        beds: '',
        cradles: '',
        accessible: false, // Set default value to false
        people: ''
    });

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    async function getAppartments() {
        await axios.get(`${baseUrl}/hosts`)
            .then((response) => {
                setApartments(response.data);
            })
            .catch((error) => {
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
    useEffect(() => {
        getAppartments();
        setFilteredApartments(filterApartments());
    }, [], filters);
    useEffect(() => {
        const fetchData = async () => {
            let temp = await getAppartments();
            setTimeout(() => {
                setR(true);
            }, 0);
        }
        fetchData();
        setFilteredApartments(filterApartments());
    }, [filters]);
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        // Handle checkbox inputs separately
        const inputValue = type === 'checkbox' ? checked : value;
        setFilters({ ...filters, [name]: inputValue });
    };
    const filterApartments = () => {
        const filteredApartments = apartments.filter((apartment) => {
            // Check if the apartment's city matches the selected city filter
            if (filters.city != apartment.city && filters.city != '') {
                return apartment.city.includes(filters.city) || apartment.city.startsWith(filters.city);
            }
            // Check if the apartment's accommodationUnit matches the selected filter
            if (filters.accommodationUnit && !apartment.accommodationUnit) {
                return false;
            }
            // Check if the apartment's hasMMD matches the selected filter
            if (filters.hasMMD && !apartment.hasMMD) {
                return false;
            }
            if (parseInt(filters.beds) > apartment.numOfBeds + apartment.numOfMattresses) {
                return false;
            }
            if (parseInt(filters.cradles) > apartment.numOfCribs) {

                return false
            }
            if (filters.accessible && !apartment.isAccessible) {
                return false
            }
            return true; // If all conditions pass, keep the apartment in the filtered list
        });
        setFilteredApartments(filteredApartments);
        return filteredApartments;
    };
    function handleClick(index) {
        if (open == false || index == openIndex) {
            setOpen(!open);
        }
        setOpenIndex(index);
    }
    return (
        <div className='all-page' >
            <div className="container-guest" dir="rtl">
                <div className="filter-bar">
                    <div className="filter-item">
                        <label className='filter-label'>    עיר</label>
                        <br className='br-filter'></br>
                        <input className='input-label'
                            id="city"
                            name="city"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="filter-item">
                        <label className='filter-label'>כניסה נפרדת</label>
                        <br className='br-filter'></br>
                        <input className='input-label'
                            id="accommodationaUnit"
                            name="accommodationUnit"
                            type="checkbox"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="filter-item">
                        <label className='filter-label' >יש ממ"ד</label>
                        <br className='br-filter'></br>
                        <input className='input-label'
                            id="hasMMD"
                            name="hasMMD"
                            type="checkbox"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="filter-item">
                        <label className='filter-label'>מספר נפשות</label>
                        <br className='br-filter'></br>

                        <input className='input-label'
                            id="beds"
                            name="beds"
                            type="number"
                            min="0"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="filter-item">
                        <label className='filter-label'>מספר עריסות</label>
                        <br className='br-filter'></br>

                        <input className='input-label'
                            id="cradles"
                            name="cradles"
                            type="number"
                            min="0"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="filter-item">
                        <label className='filter-label'>נגיש</label>
                        <br className='br-filter'></br>

                        <input className='input-label'
                            id="accessible"
                            name="accessible"
                            type="checkbox"
                            onChange={handleInputChange}
                        />
                    </div>

                </div>

            </div>
            <div className='filter-btn'>
                <button type="button" onClick={handleInputChange} class="btn btn-warning">לכל הדירות</button>
            </div>
            <br></br>
            <br></br>

            <div className="apartments">
                        {r &&
                            filteredApartments.slice(0, visibleApartments).map((d, i) => {
                                return (
                                    <>
                                        <div className="card">
                                            <table dir='rtl'>
                                                <tbody>
                                                    <tr scope="col"><span> עיר:  </span>{d.city}</tr>
                                                    <tr scope="col"><span> מספר נפשות:  </span>{d.numOfBeds + d.numOfMattresses}</tr>
                                                </tbody>
                                            </table>
                                            <div id="div-button">
                                                <Button variant="Light" id="Button"
                                                    onClick={() => handleClick(i)} >
                                                    פרטים נוספים
                                                </Button>
                                            </div>
                                            <br></br>
                                            <div className="card-header">
                                                <Collapse key={i} in={open && openIndex == i}>
                                                    <div id="collapsePanel" dir='rtl'>
                                                        <table class="table table-striped" dir='rtl'>
                                                            <thead>
                                                                <tr><th scope="row">כניסה נפרדת</th>
                                                                    <td>{d.accommodationUnit ? 'כן' : 'לא'}</td></tr>
                                                                <tr><th scope="row">מיטות</th>
                                                                    <td>{d.numOfBeds}</td></tr>
                                                                <tr><th scope="row">מזרנים</th>
                                                                    <td>{d.numOfMattresses}</td></tr>
                                                                <tr><th scope="row">עריסות</th>
                                                                    <td>{d.numOfCribs}</td></tr>
                                                                <tr><th scope="row">יש ממ"ד</th>
                                                                    <td>{d.hasMMD ? 'כן' : 'לא'}</td></tr>
                                                                <tr><th scope="row">נגיש?</th>
                                                                    <td>{d.isAccessible ? 'כן' : 'לא'}</td></tr>
                                                                <tr><th scope="row">בתשלום?</th>
                                                                    <td>{d.payment ? 'כן' : 'לא'}</td></tr>
                                                                <tr><th scope="row">טלפון</th>
                                                                    <td>{d.phone}</td></tr>
                                                                <tr><th scope="row">איש קשר</th>
                                                                    <td>{d.name}</td></tr>
                                                                <tr><th scope="row">וואטסאפ</th>
                                                                    <td>{d.whatsapp ? 'כן' : 'לא'}</td></tr>
                                                                <tr><th scope="row">מייל</th>
                                                                    <td>{d.email}</td></tr>
                                                                <tr><th scope="row">הערות</th>
                                                                    <td>{d.notes}</td></tr>
                                                            </thead>
                                                        </table>
                                                    </div>
                                                </Collapse>
                                            </div >

                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
        </div>

    );
}
export default Guest;