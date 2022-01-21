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
import showResults from "../../showResults/showResults";
import UserService from "../../../services/user.service";
import { AddCNF } from "../../../abi/cnf";
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import Web3 from "web3";

require("dotenv").config();

var HDWalletProvider = require("@truffle/hdwallet-provider");

const user = JSON.parse(localStorage.getItem("user"));

export default class ListCNF extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      account: '',
    };
  }

  async componentDidMount() {
    const provider = new HDWalletProvider(
      process.env.REACT_APP_MNEMONIC,
      "https://ropsten.infura.io/v3/" + process.env.REACT_APP_INFURA_PROJECT_ID
    );
    const web3 = new Web3(provider);
    provider.engine.stop();

    let account = await web3.eth.getAccounts(function (err, accounts) {
      if (err != null) {
        return "0";
      } else if (accounts.length === 0) {
        return "0";
      } else {
        return accounts[0];
      }
    });
    const transaction = new web3.eth.Contract(
        AddCNF,
        process.env.REACT_APP_ADDRESS_CNF
    );
    const trx = await transaction.methods.getAllData().call({from: account[0]});
    var arr = [];
    await trx.forEach(async function (value, index) {
      arr.push(value);
    });

    this.setState({
      content: arr,
    })
    // manggil metamask untuk konfirmasi
      // const web3Modal = new Web3Modal();
      // const connection = await web3Modal.connect();
      // const provider = new ethers.providers.Web3Provider(connection);
      // const signer = provider.getSigner();

      // let contract = new ethers.Contract(process.env.REACT_APP_ADDRESS_CNF, AddCNF, signer);
      // let transaction = await contract.getAllData();
    // end transaksi blockchain

    // this.setState({
    //   content: transaction,
    // });

    console.log("data dari blockchainya nih", arr);
  }

  render() {
    const fields = [
      // { key: "walletAddress", label: "Signer"},
      { key: "role_pembuat", label: "Created By"},
      { key: "nomor_dokumen", label: "Document Number"},
      { key: "tanggal_dokumen", label: "Document Date"},
      { key: "created", label: "Created"},
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
                        <h4 style={{ margin: "auto" }}>CNF</h4>
                      </CCol>
                      <CCol>
                        <CButton
                          block
                          color="dark"
                          to="/AddCNF"
                          style={{ backgroundColor: "#00c4cc" }}
                        >
                          Add
                        </CButton>
                      </CCol>
                      {/* {(() => {
                        if (user && (user.status_role === "grosir" || user.status_role === "roaster")) {
                          return(
                            <CCol>
                              <CButton
                                block
                                color="dark"
                                to="/AddCNF"
                                style={{ backgroundColor: "#00c4cc" }}
                              >
                                Add
                              </CButton>
                            </CCol>
                          )
                        }
                      })()} */}
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
