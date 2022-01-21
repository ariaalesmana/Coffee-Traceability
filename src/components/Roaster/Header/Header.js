import React, { useState } from "react";
import "./Header.css";
import "./HeaderMedia.css";
import {
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavbar,
  CNavbarNav,
  CNavbarBrand,
  CToggler,
  CNavLink,
  CDropdown,
  CImg,
} from "@coreui/react";

require("dotenv").config();

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  var images = "";

  if (user !== null) {
    images = process.env.REACT_APP_CATALOG_URL + "techone/images/" + user.logo;
  }

  console.log("usernya nih", user);

  return (
    <CNavbar expandable="sm" style={{ backgroundColor: "#178d88" }}>
      <CToggler inNavbar onClick={() => setIsOpen(!isOpen)} />
      <CNavbarBrand href="/">
        <CImg
          src={images}
          className="d-inline-block align-top"
          alt="logo"
          width="150px"
          height="auto"
        />
      </CNavbarBrand>
      <CCollapse show={isOpen} navbar>
        {/* {(() => {
          if (user && user.user_detail.role === "koperasi") {
            return(
              <CNavbarNav>
                <CNavLink to="/masterData">Master Data</CNavLink>
                <CNavLink to="/greenBeans">Green Beans</CNavLink>
              </CNavbarNav>
            )
          } else {
            return(
              <CNavbarNav>
                <CNavLink to="/roasting">Roasting</CNavLink>
              </CNavbarNav>
            )
          }
        })()}
        <CNavbarNav>
          <CNavLink to="/listCNF">CNF</CNavLink>
        </CNavbarNav> */}

        <CNavbarNav>
          {/* <CNavLink to="/masterData">Master Data</CNavLink> */}
          <CNavLink to="/masterData">Roasting Profile</CNavLink>
          <CNavLink to="/greenBeans">Green Beans</CNavLink>
          <CNavLink to="/roasting">Roasting</CNavLink>
          <CNavLink to="/listCNF">CNF</CNavLink>
          <CNavLink to="/List-Log-API">Log API</CNavLink>
        </CNavbarNav>

        <CNavbarNav className="ml-auto">
          <CDropdown inNav>
            <CDropdownToggle color="primary">User</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem>Account</CDropdownItem>
              <CDropdownItem>Settings</CDropdownItem>
              <CDropdownItem
                id="CDropdownItemNewAccount"
                style={{ display: "none" }}
              >
                New Account
              </CDropdownItem>
              <CDropdownItem href="/" onClick={() => props.logoutClick()}>
                LogOut
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CNavbarNav>
      </CCollapse>
    </CNavbar>
  );
};

export default Header;
