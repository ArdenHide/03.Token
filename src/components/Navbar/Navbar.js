import React, { Component } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
} from 'mdb-react-ui-kit';
import Logo from './Logo/Logo';

class Navbar extends Component {

    render() {
        return (
            <MDBNavbar fixed='top' dark style={{ backgroundColor: '#212121' }}>
                <MDBContainer fluid className="p-0">
                    <MDBNavbarBrand href='#' className="p-0">
                        <Logo />
                        Arden SocialNetwork
                    </MDBNavbarBrand>
                    <div className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                        <small className="text-secondary">
                            <small id="account">{this.props.account}</small>
                        </small>
                    </div>
                </MDBContainer>
            </MDBNavbar>
        );
    }
}
export default Navbar;