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
import { Component } from 'react';
import '../css/Header.css';

export default class Header extends Component {
    constructor() {
      super();
    }

    render() {
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
                <MDBNavbarLink className="item" aria-current='page' href='/'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              {/* <MDBNavbarItem>
                <MDBNavbarLink className="pink-text" href='/connect'>Connect</MDBNavbarLink>
              </MDBNavbarItem> */}
              <MDBNavbarItem>
                <MDBNavbarLink className="item" href='/community'>Community</MDBNavbarLink>
              </MDBNavbarItem>
              {/* <MDBNavbarItem>
                <MDBNavbarLink className="item" href='#'>Event</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className="item" href='#'>Chat</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink className="item" href='#'>Articles</MDBNavbarLink>
              </MDBNavbarItem> */}
            </MDBNavbarNav>
          </div>
          </div>
        </MDBContainer>
      </MDBNavbar>
    </header>
        );
    }
}