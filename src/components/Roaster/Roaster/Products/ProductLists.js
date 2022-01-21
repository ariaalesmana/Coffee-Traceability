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

export default class ProductLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: [],
    };
  }

  componentDidMount() {
    UserService.getListProductRoaster().then((response) => {
      this.setState({
        product: response.data.product,
      });
    });
  }

  deleteProduct = (item) => {
    UserService.deleteProductRoaster(item.id).then(
      showResults("Data has been deleted")
    );
  };

  render() {
    const scopedSlots = {
      productID: (item) => (
        <td>
          {(() => {
            if (item.productID != null) {
              return item.productID;
            }
          })()}
        </td>
      ),
      name: (item) => (
        <td>
          {(() => {
            if (item.name != null) {
              return item.name;
            }
          })()}
        </td>
      ),
      biji_id: (item) => (
        <td>
          {(() => {
            if (item.green_beans.batch && item.green_beans.batch.biji.nama_biji != null) {
              return item.green_beans.batch.biji.nama_biji;
            }
          })()}
        </td>
      ),
      supplier_id: (item) => (
        <td>
          {(() => {
            if (item.green_beans.batch && item.green_beans.batch.supplier.nama_supplier != null) {
              return item.green_beans.batch.supplier.nama_supplier;
            }
          })()}
        </td>
      ),
      jenis_id: (item) => (
        <td>
          {(() => {
            if (item.green_beans.batch && item.green_beans.batch.jenis.nama_jenis != null) {
              return item.green_beans.batch.jenis.nama_jenis;
            }
          })()}
        </td>
      ),
      proses_id: (item) => (
        <td>
          {(() => {
            if (item.green_beans.batch && item.green_beans.batch.proses.nama_proses != null) {
              return item.green_beans.batch.proses.nama_proses;
            }
          })()}
        </td>
      ),
      show_details: (item) => (
        <td className="py-2">
          <CButton
            size="sm"
            color="info"
            to={`/greenBeans/editGreenBeans/${item.id}`}
            style={{ backgroundColor: "#178d88" }}
          >
            Edit
          </CButton>
          <CButton
            size="sm"
            color="danger"
            className="ml-1"
            onClick={() => this.deleteProduct(item)}
            style={{ backgroundColor: "#e2602c" }}
          >
            Hapus
          </CButton>
        </td>
      ),
    };
    const fields = [
      { key: "name", label: "Nama Produk", _style: { width: "16%" } },
      { key: "biji_id", label: "Beans", _style: { width: "10%" } },
      { key: "jenis_id", label: "Variety", _style: { width: "14%" } },
      { key: "proses_id", label: "Process", _style: { width: "15%" } },
      { key: "supplier_id", label: "Origin", _style: { width: "21%" } },
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
                        <h4 style={{ margin: "auto" }}>Green Beans Data</h4>
                      </CCol>
                      <CCol>
                        <CButton
                          block
                          color="dark"
                          to="/greenBeans/addGreenBeans"
                          style={{ backgroundColor: "#00c4cc" }}
                        >
                          Add
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable
                      items={this.state.product}
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
