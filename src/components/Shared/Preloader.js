import React from "react";
import { MDBSpinner } from 'mdb-react-ui-kit';

function Preloader(props) {
    return (
        <div className="container-fluid p-0 h-100">
            <div className='d-flex justify-content-center align-items-center h-100'>
                <MDBSpinner role='status' style={{ width: props.size, height: props.size }} color='dark'>
                </MDBSpinner>
            </div>
        </div>
    );
}

export default Preloader