import React from 'react';
import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBContainer,
    MDBIcon
} from 'mdb-react-ui-kit';
import '../css/Header.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {

  const nav = useNavigate();
  //it is determined from the stored cookie whether the user is an admin or not
  const isAdmin = Cookies.get('isAdmin');

  //logs out the user and destroys all the cookies
  const logout = () => {
    Cookies.remove('userId');
    Cookies.remove('province');
    Cookies.remove('firstname');
    Cookies.remove('isAdmin');
    nav('/');
  }

  //determines which links have to be shown to the user
  const renderAdmin = () => {

    //rendered only when user is an admin
    if(isAdmin == 1) {
      return (
        <div className='collapse navbar-collapse' id='navbarExample01'>
          <MDBNavbarItem>
            <MDBNavbarLink className="item" href='/create-community'>Create community</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink className="item" href='/fetch-users'>Approve user requests</MDBNavbarLink>
          </MDBNavbarItem>
        </div>
      );
    }
    
  }

  //rendered everytime  
  return(
      <header>
      <MDBNavbar expand='lg' light bgColor='white'>
        <MDBContainer fluid>
          <MDBNavbarToggler
            aria-controls='navbarExample01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <MDBIcon fas icon='bars' />
          </MDBNavbarToggler>
          <div className="Header">
          <div className='collapse navbar-collapse' id='navbarExample01'>
            <MDBNavbarNav right className='mb-2 mb-lg-0'>
              <MDBNavbarItem active>
                <MDBNavbarLink className="item" aria-current='page' href='/home'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className="item" href='/community'>Community</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className="item" href='/join-community'>Join a community</MDBNavbarLink>
              </MDBNavbarItem>
              { renderAdmin() }
              <MDBNavbarItem className="itemRight">
                <button className="logout" onClick={() => {logout()}}>Logout</button>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </div>
          </div>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
}

export default Header;