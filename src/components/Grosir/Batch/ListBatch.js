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

export default class ListBatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  componentDidMount() {
    UserService.getListBatch().then((response) => {
      this.setState({
        content: response.data,
      });
    });
  }

  deleteBatch = (item) => {
    UserService.deleteBatch(item.id).then(showResults("Data has been deleted"));
  };

  render() {
    const scopedSlots = {
      biji_id: (item) => (
        <td>
          {(() => {
            if (item.biji != null) {
              return item.biji.nama_biji;
            }
          })()}
        </td>
      ),
      supplier_id: (item) => (
        <td>
          {(() => {
            if (item.supplier != null) {
              return item.supplier.lokasi_supplier;
            }
          })()}
        </td>
      ),
      jenis_id: (item) => (
        <td>
          {(() => {
            if (item.jenis != null) {
              return item.jenis.nama_jenis;
            }
          })()}
        </td>
      ),
      proses_id: (item) => (
        <td>
          {(() => {
            if (item.jenis != null) {
              return item.proses.nama_proses;
            }
          })()}
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
            to={`/listBatch/editBatch/${item.id}`}
            style={{ backgroundColor: "#178d88" }}
          >
            Edit
          </CButton>
          <CButton
            size="sm"
            color="danger"
            className="ml-1"
            onClick={() => this.deleteBatch(item)}
            style={{ backgroundColor: "#e2602c" }}
          >
            Delete
          </CButton>
        </td>
      ),
    };
    const fields = [
      { key: "batch_id", _style: { width: "10%" } },
      { key: "biji_id", label: "Beans Name", _style: { width: "10%" } },
      { key: "supplier_id", label: "Origin", _style: { width: "15%" } },
      { key: "jenis_id", label: "Variety Name", _style: { width: "11%" } },
      { key: "proses_id", label: "Process", _style: { width: "14%" } },
      { key: "volume", _style: { width: "7%" } },
      { key: "tgl_panen", label: "Harvest Date", _style: { width: "14%" } },
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
                        <h4 style={{ margin: "auto" }}>Data Batch</h4>
                      </CCol>
                      <CCol>
                        <CButton
                          block
                          color="dark"
                          to="/listBatch/daftar"
                          style={{ backgroundColor: "#00c4cc" }}
                        >
                          Add
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable
                      items={this.state.content.batch}
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
