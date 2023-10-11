import React, { useState, useEffect } from 'react';
import '../style/guest.css'
import axios from 'axios';


function Guest() {

    const baseUrl = process.env.REACT_APP_API_URL;
    const [apartments, setApartments] = useState([]);
    const [filteredApartments, setFilteredApartments] = useState([]);

    const [filters, setFilters] = useState({
        city: '',
        accommodationUnit: false, // Set default value to false
        available: false, // Set default value to false
        hasMMD: false, // Set default value to false
        beds: '',
        cradles: '',
        accessible: false, // Set default value to false
    });

    // useEffect(() => {
    //   async function getAppartments() {
    //         await axios.get('http://localhost:3001/hosts')
    //         .then((response) => {
    //             setApartments(response.data)
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });

    //     }

    //     getAppartments();
    //     setFilteredApartments(filterApartments());
    // }, [],filters);
    useEffect(() => {
        async function getAppartments() {
            try {
                const response = await axios.get(`${baseUrl}/hosts`);
                setApartments(response.data);
            } catch (error) {
                console.log(error);
            }
        }
    
        getAppartments();
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



    return (
        <div className="apartment-filter">

            <label for="city">עיר</label>
            <input
                id="city"
                name="city"
                onChange={handleInputChange}
            />

            <label for="accommodationaUnit">יחידת אירוח</label>
            <input
                id="accommodationaUnit"
                name="accommodationUnit"
                type="checkbox"
                onChange={handleInputChange}
            />

            <label for="available">זמינה כרגע</label>
            <input
                id="available"
                name="available"
                type="checkbox"
                onChange={handleInputChange}
            />

            <label for="hasMMD">יש ממ"ד</label>
            <input
                id="hasMMD"
                name="hasMMD"
                type="checkbox"
                onChange={handleInputChange}
            />

            <label for="beds">מספר מיטות</label>
            <input
                id="beds"
                name="beds"
                type="number"
                onChange={handleInputChange}
            />

            <label for="cradles">מספר עריסות</label>
            <input
                id="cradles"
                name="cradles"
                type="number"
                onChange={handleInputChange}
            />

            <label for="accessible">דירה נגישה</label>
            <input
                id="accessible"
                name="accessible"
                type="checkbox"
                onChange={handleInputChange}
            />





            {/* <button onClick={filterApartments}>Apply Filters</button> */}


            <h1>כל הדירות</h1>
            <div className='d-flex p-2 bd-highlight'>

                {filteredApartments.map((item, index) => (
                    <div key={index} className='card'>
                        <h2 className='card-title'>שם: {item.name}</h2>
                        <p>עיר: {item.city}</p>
                        <p>יחידת אירוח: {item.accommodationUnit ? 'כן' : 'לא'}</p>
                        <p>מספר מיטות: {item.numOfBeds}</p>
                        <p>מספר מזרנים: {item.numOfMattresses}</p>
                        <p>מספר עריסות: {item.numOfCribs}</p>
                        <p>יש ממ"ד: {item.hasMMD ? 'כן' : 'לא'}</p>
                        <p>פנוי כרגע: {item.currentlyAvailable ? 'כן' : 'לא'}</p>
                        <p>נגיש: {item.isAccessible ? 'כן' : 'לא'}</p>
                        <p>בתשלום: {item.payment ? 'כן' : 'לא'}</p>
                        <p>הערות: {item.notes}</p>
                        <p>טלפון: {item.phone}</p>
                        <p>האם יש ווצאפ: {item.whatsapp ? 'כן' : 'לא'}</p>
                        <p>מייל: {item.email}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Guest;
