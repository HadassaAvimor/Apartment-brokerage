import React, { useState, useEffect } from 'react';

function ApartmentFilter() {

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



    useEffect(() => {
        setApartments([
            {
                "name": "Chana",
                "city": "Modi'in",
                "accommodationUnit": false,
                "numOfBeds": 7,
                "numOfMattresses": 6,
                "numOfCribs": 1,
                "hasMMD": true,
                "currentlyAvailable": true,
                "isAccessible": false,
                "payment": false,
                "notes": "Nothing",
                "phone": "0505874521",
                "whatsapp": true,
                "email": "chana@gmail.com"
            },
            {
                "name": "Chana",
                "city": "Modi'in",
                "accommodationUnit": false,
                "numOfBeds": 7,
                "numOfMattresses": 6,
                "numOfCribs": 1,
                "hasMMD": false,
                "currentlyAvailable": false,
                "isAccessible": true,
                "payment": false,
                "notes": "Nothing",
                "phone": "0505874521",
                "whatsapp": true,
                "email": "chana@gmail.com"
            },
        ])





        setFilteredApartments(filterApartments());

        //initinals the apartments varible...
        // axios.get....

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

            if (filters.accessible && apartment.isAccessible){
                return false
            }
            
            return true; // If all conditions pass, keep the apartment in the filtered list
        });

        setFilteredApartments(filteredApartments);
        return filteredApartments;
    };



    return (
        <div>

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





            <button onClick={filterApartments}>Apply Filters</button>


            <h1>כל הדירות</h1>
            <div>

                {filteredApartments.map((item, index) => (
                    <div key={index}>
                        <h2>Name: {item.name}</h2>
                        <p>City: {item.city}</p>
                        <p>Accommodation Unit: {item.accommodationUnit ? 'Yes' : 'No'}</p>
                        <p>Number of Beds: {item.numOfBeds}</p>
                        <p>Number of Mattresses: {item.numOfMattresses}</p>
                        <p>Number of Cribs: {item.numOfCribs}</p>
                        <p>Has MMD: {item.hasMMD ? 'Yes' : 'No'}</p>
                        <p>Currently Available: {item.currentlyAvailable ? 'Yes' : 'No'}</p>
                        <p>Is Accessible: {item.isAccessible ? 'Yes' : 'No'}</p>
                        <p>Payment: {item.payment ? 'Yes' : 'No'}</p>
                        <p>Notes: {item.notes}</p>
                        <p>Phone: {item.phone}</p>
                        <p>WhatsApp: {item.whatsapp ? 'Yes' : 'No'}</p>
                        <p>Email: {item.email}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default ApartmentFilter;
