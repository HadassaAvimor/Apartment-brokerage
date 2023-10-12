import React, { useState, useEffect } from 'react';
import '../style/guest.css'
import axios from 'axios';
import { Button, Collapse } from 'react-bootstrap';
import img1 from '../images/img1.jpg';
function Guest() {
    const baseUrl = process.env.REACT_APP_API_URL;
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
    });
    async function getAppartments() {
        await axios.get(`${baseUrl}/hosts`)
            .then((response) => {
                setApartments(response.data)
            })
            .catch((error) => {
                console.log(error);
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
                return false;
            }
            // Check if the apartment's accommodationUnit matches the selected filter
            if (filters.accommodationUnit && !apartment.accommodationUnit) {
                return false;
            }
            // Check if the apartment's currentlyAvailable matches the selected filter
            if (filters.available && !apartment.currentlyAvailable) {
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
            if (filters.accessible && apartment.isAccessible) {
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
        console.log("open", openIndex);
    }
    return (
        <div className='all-page'>
            <div className="container" dir="rtl">
                <div className="apartment-filter">
                    <table class="table" style={{ textAlign: "center" }}>
                        <thead >
                            <tr>
                                <th scope="col">עיר</th>
                                <th scope="col">יחידת אירוח</th>
                                <th scope="col">זמינה כרגע</th>
                                <th scope="col">יש ממ"ד</th>
                                <th scope="col">מספר מיטות</th>
                                <th scope="col">מספר עריסות</th>
                                <th scope="col">דירה נגישה</th>
                            </tr>
                        </thead>
                        <tbody>
                            <td><input
                                id="city"
                                name="city"
                                onChange={handleInputChange}
                            /></td>
                            <td><input
                                id="accommodationaUnit"
                                name="accommodationUnit"
                                type="checkbox"
                                onChange={handleInputChange}
                            /></td>
                            <td><input
                                id="available"
                                name="available"
                                type="checkbox"
                                onChange={handleInputChange}
                            /></td>
                            <td><input
                                id="hasMMD"
                                name="hasMMD"
                                type="checkbox"
                                onChange={handleInputChange}
                            /></td>
                            <td><input
                                id="beds"
                                name="beds"
                                type="number"
                                min="0"
                                onChange={handleInputChange}
                            /></td>
                            <td><input
                                id="cradles"
                                name="cradles"
                                type="number"
                                min="0"
                                onChange={handleInputChange}
                            /></td>
                            <td><input
                                id="accessible"
                                name="accessible"
                                type="checkbox"
                                onChange={handleInputChange}
                            /></td>
                        </tbody>
                    </table>
                    <button type="button" onClick={handleInputChange} class="btn btn-warning">לכל הדירות</button>
                </div>
                <br></br>
                <br></br>
                <div className="apartments">
                    {r &&
                        filteredApartments.map((d, i) => {
                            return (
                                <>
                                    <div className="card">
                                        <table dir='rtl'>
                                            <tbody>
                                                <tr scope="col"><span style={{ fontWeight: 'bold' }}> עיר  </span>{d.city}</tr>
                                            </tbody>
                                        </table>
                                        <div style={{ "margin": "20px", backgroundColor:"white" }}>
                                            <Button variant="Light" style={{background: "white", border: "2px solid #95532f", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}
                                                onClick={() => handleClick(i)} >
                                                פרטים נוספים
                                            </Button>
                                        </div>
                                        {/* </div> */}
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
                                                            <tr><th scope="row">פנוי כרגע?</th>
                                                                <td>{d.hasMMD ? 'כן' : 'לא'}</td></tr>
                                                            <tr><th scope="row">יש ממ"ד</th>
                                                                <td>{d.currentlyAvailable ? 'כן' : 'לא'}</td></tr>
                                                            <tr><th scope="row">נגיש?</th>
                                                                <td>{d.isAccessible ? 'כן' : 'לא'}</td></tr>
                                                            <tr><th scope="row">בתשלום?</th>
                                                                <td>{d.payment ? 'כן' : 'לא'}</td></tr>
                                                            <tr><th scope="row">טלפון</th>
                                                                <td>{d.phone}</td></tr>
                                                            <tr><th scope="row">וואטסאפ</th>
                                                                <td>{d.whatsapp ? 'כן' : 'לא'}</td></tr>
                                                            <tr><th scope="row">מייל</th>
                                                                <td>{d.email}</td></tr>
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
                    {/* </div> */}
                </div >
            </div >
        </div>);
}
export default Guest;