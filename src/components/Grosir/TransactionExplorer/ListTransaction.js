import { Fragment, React, useState, useEffect, Component } from "react";
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

export default class ListTransaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  componentDidMount() {
    UserService.getListTransactionHash().then((response) => {
      this.setState({
        content: response.data,
      });
    });
  }

  render() {
    const scopedSlots = {
      t_hash: (item) => (
        <td>
          <a
            href={"https://ropsten.etherscan.io/tx/" + item.t_hash}
            target="_blank"
          >
            {item.t_hash}
          </a>
        </td>
      ),
    };
    const fields = [
      { key: "t_hash", label: "Transaction Hash", _style: { width: "20%" } },
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
                      <CCol xs={12} md={12} lg={12} style={{ margin: "auto" }}>
                        <h4 style={{ margin: "auto" }}>List Transaction</h4>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable
                      items={this.state.content.transaction_explorer}
                      fields={fields}
                      itemsPerPage={10}
                      pagination
                      scopedSlots={scopedSlots}
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
