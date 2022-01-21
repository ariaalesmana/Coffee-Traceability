import { Fragment, React, Component } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import UserService from "../../../services/user.service";
import showResults from "../../showResults/showResults";
import { Redirect } from "react-router-dom";
import QRcode from "qrcode.react";

export default class ListGreenBean extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      sku: [],
      modal: false,
      batchId: '',
      qr: "test",
    };
  }

  componentDidMount() {
    UserService.getBatchGreenBean().then((response) => {
      console.log(response);
      
      this.setState({
        content: response.data.data,
      })
    });
  }

  deleteGB = async (item) => {
    await UserService.deleteBatchGreenBean(item.id).then(showResults("Data has been deleted"));
    
    await window.location.reload(true)

  };

  setModal = async (batchId) => {
    if(batchId) {
      this.setState({
        batchId: batchId,
      })
    }

    this.setState({
      modal: !this.state.modal,
    })
  }
  
  handleChange = (value) => {
    this.setState({
      qr: value,
    })
  };

  downloadQR = async (product_id) => {
    const canvas = document.getElementById("myqr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "" + product_id + ".png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  generateQR = async (batchId) => {
    console.log('cek batch id', batchId);

    const linkQRCode =
      process.env.REACT_APP_PROD_URL +
      "detailBatch/ketjil/" +
      batchId;
    await this.handleChange(linkQRCode);

    const canvas = document.getElementById("myqr");
    let imageBlob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );

    let formDataQR = new FormData();
    formDataQR.append("files_qr", imageBlob, "" + batchId + ".png");
    formDataQR.append("fileName_qr", "" + batchId + ".png");

    this.downloadQR(batchId);

    await UserService.pushQRCodeImageBatch(batchId, formDataQR);

    await UserService.getBatchGreenBean().then((response) => {
      console.log(response);
      
      this.setState({
        content: response.data.data,
      })
    });

    await showResults("Data has been added");
  }

  render() {

    const fields = [
      { key: "sku_green_bean", label: "SKU Green Bean"},
      { key: "batch_number", label: "Batch Number"},
      { key: "po", label: "PO Number"},
      { key: "volume_order", label: "Volume Order"},
      {
        key: "show_details",
        label: "",
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
                        <h4 style={{ margin: "auto" }}>Batch Green Bean</h4>
                      </CCol>
                      <CCol>
                        <CButton
                          block
                          color="dark"
                          to="/listGreenBean/daftar"
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
                      tableFilter
                      cleaner
                      itemsPerPageSelect
                      hover
                      sorter
                      pagination
                      scopedSlots={{
                        sku_green_bean: (item) => {
                          return(
                            <td>
                              {item.get_s_k_u.sku}
                            </td>
                          )
                        },
                        po: (item) => {
                          console.log('cek ni mal', item)
                          return(
                            <td>
                              {item.get_p_o.po_number}
                            </td>
                          )
                        },
                        volume_order: (item) => {
                          console.log('cek ni mal', item)
                          return(
                            <td>
                              {item.volume_order} Grams
                            </td>
                          )
                        },
                        show_details: (item) => {
                          if(item.qrcode) {
                            return (
                              <td
                                className="py-2"
                                style={{
                                  textAlign: "center",
                                  verticalAlign: "center",
                                }}
                              >
                                <CButton color="info" size="sm" to={`detailBatch/ketjil/${item.id}`} >
                                  Show
                                </CButton>
                              </td>
                            )
                          } else {
                            return (
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
                                  to={`/greenBean/edit/${item.id}`}
                                  style={{ backgroundColor: "#178d88" }}
                                >
                                  Edit
                                </CButton>
                                <CButton
                                  size="sm"
                                  color="danger"
                                  className="ml-1"
                                  onClick={() => this.deleteGB(item)}
                                  style={{ backgroundColor: "#e2602c" }}
                                >
                                  Delete
                                </CButton> {" "}
                                {/* <CButton size="sm" color="primary" onClick={this.setModal} className="mr-1">Generate QR</CButton> */}
                                <CButton size="sm" color="primary" onClick={() => this.setModal(item.id)} className="mr-1">Generate QR</CButton>
                              </td>
                            );
                          }
                        },
                      }}
                    />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </div>
        </main>

        <CModal 
          show={this.state.modal} 
          onClick={this.setModal}
          color="warning"
        >
          <CModalHeader closeButton>
            <CModalTitle>Generate QRCode</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <strong>Notification,</strong> when qrcode is created then the data cannot be changed again
          </CModalBody>
          <CModalFooter>
            <CButton color="info" to={`detailBatch/ketjil/${this.state.batchId}`} >
              Show Data QR
            </CButton>{' '}
            <CButton color="warning" style={{color:"white"}} onClick={() => this.generateQR(this.state.batchId)}>
              Generate QRCode
            </CButton>{' '}
            <CButton color="secondary" onClick={this.setModal}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>

        <div style={{ visibility: "hidden" }}>
          {this.state.qr ? (
            <QRcode id="myqr" value={this.state.qr} size={320} includeMargin={true} />
          ) : (
            <p>No QR code preview</p>
          )}
        </div>

      </Fragment>
    );
  }
}
