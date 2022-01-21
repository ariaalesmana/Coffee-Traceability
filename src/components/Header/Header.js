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
      <CNavbarNav>
        <CNavLink to="/listBiji">Master Data</CNavLink>
        <CNavLink to="/listSupplier">Coffee Processor</CNavLink>
        <CNavLink to="/listGreenBean">Batch Green Bean</CNavLink>
        {/* <CNavLink to="/listBatch">Batch</CNavLink>
        <CNavLink to="/listProduk">Product</CNavLink> */}
        <CNavLink to="/listCupping">Cupping</CNavLink>
        <CNavLink to="/transactionExplorer">Transaction Explorer</CNavLink>
        <CNavLink to="/listCNF">CNF</CNavLink>
      </CNavbarNav>

      {/* {(() => {
        if (user && user.status_role === "koperasi") {
          return(
            <CNavbarNav>
              <CNavLink to="/listBiji">Master Data</CNavLink>
              <CNavLink to="/listSupplier">Coffee Processor</CNavLink>
              <CNavLink to="/listBatch">Batch</CNavLink>
            </CNavbarNav>
          )
        } else {
          return(
            <CNavbarNav>
              <CNavLink to="/listProduk">Product</CNavLink>
              <CNavLink to="/transactionExplorer">Transaction Explorer</CNavLink>
              
            </CNavbarNav>
          )
        }
      })()}
      <CNavbarNav>
        <CNavLink to="/listCNF">CNF</CNavLink>
      </CNavbarNav> */}

      <CCollapse show={isOpen} navbar>
        {/* <CNavbarNav>
          <CNavLink to="/listBiji">Master Data</CNavLink>
          <CNavLink to="/listSupplier">Coffee Processor</CNavLink>
          <CNavLink to="/listBatch">Batch</CNavLink>
          <CNavLink to="/listProduk">Product</CNavLink>
          <CNavLink to="/transactionExplorer">Transaction Explorer</CNavLink>
        </CNavbarNav> */}
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

