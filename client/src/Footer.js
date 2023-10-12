import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter bgColor='dark' className='text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', color: 'white'}}>
      apartmentbrokerage22@gmail.com האתר בגרסת בטא. לתמיכה ודיווח על תקלות אנא כתבו ל 
      </div>
    </MDBFooter>
  );
}