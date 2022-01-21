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
import UserService from "../../../services/user.service";

export default class ListProduk extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  componentDidMount() {
    UserService.getListProduct().then((response) => {
      this.setState({
        content: response.data.product,
      });
    });
  }

  render() {
    const scopedSlots = {
      name: (item) => (
        <td>
          {this.state.content.map((value) => {
            if (value.id == item.id) {
              return value.product.name;
            }
          })}
        </td>
      ),
      description: (item) => (
        <td>
          {this.state.content.map((value) => {
            if (value.id == item.id) {
              return value.product.description;
            }
          })}
        </td>
      ),
      price: (item) => (
        <td>
          {this.state.content.map((value) => {
            if (value.id == item.id) {
              return value.product.price;
            }
          })}
        </td>
      ),
      sku: (item) => (
        <td>
          {this.state.content.map((value) => {
            if (value.id == item.id) {
              return value.product.sku;
            }
          })}
        </td>
      ),
      show_details: (item) => (
        <td
          className="py-2"
          style={{
            textAlign: "center",
            verticalAlign: "center",
          }}
        >
          <CButton
            size="sm"
            color="info"
            to={`/listProduk/detailProduk/${item.id}`}
            style={{ backgroundColor: "#178d88" }}
          >
            Show
          </CButton>
        </td>
      ),
    };
    const fields = [
      { key: "name", label: "Name", _style: { width: "20%" } },
      { key: "description", label: "Description", _style: { width: "20%" } },
      { key: "price", label: "Price", _style: { width: "20%" } },
      { key: "sku", label: "SKU", _style: { width: "20%" } },
      {
        key: "show_details",
        label: "",
        _style: { width: "14%" },
        filter: false,
      },
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
                        <h4 style={{ margin: "auto" }}>Product Data</h4>
                      </CCol>
                      <CCol>
                        <CButton
                          block
                          color="dark"
                          to="/listProduk/daftar"
                          style={{ backgroundColor: "#00c4cc" }}
                        >
                          Add
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable
                      items={this.state.content}
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
