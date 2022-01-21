import { Fragment, React, Component } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
} from "@coreui/react";
import showResults from "../../../showResults/showResults";
import UserService from "../../../../services/user.service";
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import Web3 from "web3";

require("dotenv").config();

var HDWalletProvider = require("@truffle/hdwallet-provider");

const user = JSON.parse(localStorage.getItem("user"));

export default class ListLogAPI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  async componentDidMount() {
    UserService.getDataLogApi().then((response) => {
      console.log('cek response',response);

      this.setState({
        content: response.data.data,
      });
    });
    
  }

  render() {
    const fields = [
      { key: "created_at", label: "Date Time"},
      { key: "name", label: "Product Name"},
      { key: "status", label: "Status"},
      { key: "catatan", label: "Note"},
    ];
    return (
      <Fragment>
        <main className="c-main">
          <div className="container-fluid">
            <CRow>
              <CCol xs="12">
                <CCard>
                  <CCardHeader>
                    <CRow>
                      <CCol xs={6} md={7} lg={10} style={{ margin: "auto" }}>
                        <h4 style={{ margin: "auto" }}>Log API</h4>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable
                      items={this.state.content}
                      fields={fields}
                      itemsPerPage={10}
                      tableFilter
                      cleaner
                      itemsPerPageSelect
                      hover
                      sorter
                      pagination
                    />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </div>
        </main>
      </Fragment>
    );
  }
}
