import { Fragment, React, Component } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import UserService from "../../../services/user.service";
import showResults from "../../showResults/showResults";
import moment from 'moment';

export default class ListBiji extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getListJenis().then((response) => {
      console.log('cek responsenya', response)
      this.setState({
        content: response.data,
      });
    });
  }

  deleteSKU = async (item) => {
    await UserService.deleteSKU(item.id).then(showResults("Data has been deleted"));
    
    await UserService.getListJenis().then((response) => {
      this.setState({
        content: response.data,
      });
    });
  };

  deletePO = async (item) => {
    await UserService.deletePO(item.id).then(showResults("Data has been deleted"));

    await UserService.getListJenis().then((response) => {
      this.setState({
        content: response.data,
      });
    });
  };

  // deleteBiji = async (item) => {
  //   await UserService.deleteBiji(item.id).then(showResults("Data has been deleted"));

  //   await UserService.getListJenis().then((response) => {
  //     this.setState({
  //       content: response.data,
  //     });
  //   });
  // };

  // deleteJenis = async (item) => {
  //   await UserService.deleteJenis(item.id).then(showResults("Data has been deleted"));

  //   await UserService.getListJenis().then((response) => {
  //     this.setState({
  //       content: response.data,
  //     });
  //   });
  // };

  // deleteProses = async (item) => {
  //   await UserService.deleteProses(item.id).then(showResults("Data has been deleted"));

  //   await UserService.getListJenis().then((response) => {
  //     this.setState({
  //       content: response.data,
  //     });
  //   });
  // };

  // deleteUnit = async (item) => {
  //   await UserService.deleteUnit(item.id).then(showResults("Data has been deleted"));

  //   await UserService.getListJenis().then((response) => {
  //     this.setState({
  //       content: response.data,
  //     });
  //   });
  // };

  render() {
    const fieldSKU = [
      { key: "sku", label: "SKU"},
      { key: "name", label: "Name"},
      {
        key: "show_details",
        label: "",
        filter: false,
      },
    ];
    const fieldPO = [
      { key: "po_number", label: "PO Number"},
      { key: "po_date", label: "PO Date"},
      { key: "buyer_name", label: "Buyer"},
      {
        key: "show_details",
        label: "",
        filter: false,
      },
    ];
    // const fieldBiji = [
    //   { key: "nama_biji", label: "Name", _style: { width: "40%" } },
    //   { key: "deskripsi_biji", label: "Description", _style: { width: "30%" } },
    //   {
    //     key: "show_details",
    //     label: "",
    //     _style: { width: "30%" },
    //     filter: false,
    //   },
    // ];
    // const fieldJenis = [
    //   { key: "nama_jenis", label: "Name", _style: { width: "40%" } },
    //   {
    //     key: "deskripsi_jenis",
    //     label: "Description",
    //     _style: { width: "30%" },
    //   },
    //   {
    //     key: "show_details",
    //     label: "",
    //     _style: { width: "30%" },
    //     filter: false,
    //   },
    // ];
    // const fieldProses = [
    //   { key: "nama_proses", label: "Name", _style: { width: "40%" } },
    //   {
    //     key: "deskripsi_proses",
    //     label: "Description",
    //     _style: { width: "30%" },
    //   },
    //   {
    //     key: "show_details",
    //     label: "",
    //     _style: { width: "30%" },
    //     filter: false,
    //   },
    // ];
    // const fieldUnit = [
    //   { key: "nama_unit", label: "Unit", _style: { width: "90%" } },
    //   {
    //     key: "show_details",
    //     label: "",
    //     _style: { width: "30%" },
    //     filter: false,
    //   },
    // ];

    return (
      <Fragment>
        <main className="c-main">
          <div className="container-fluid">
            <CCard>
              <CCardBody>
                <CTabs>
                  <CNav variant="tabs">
                    <CNavItem>
                      <CNavLink>SKU Green Bean</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>PO Green Bean</CNavLink>
                    </CNavItem>
                    {/* <CNavItem>
                      <CNavLink>Beans</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Variety</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Process</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Unit</CNavLink>
                    </CNavItem> */}
                  </CNav>
                  <CTabContent>

                    <CTabPane>
                      <CRow>
                        <CCol xs="12">
                          <CCardHeader>
                            <CRow>
                              <CCol
                                xs={6}
                                md={7}
                                lg={10}
                                style={{ margin: "auto" }}
                              >
                                <h4 style={{ margin: "auto" }}>SKU Green Bean</h4>
                              </CCol>
                              <CCol>
                                <CButton
                                  block
                                  color="dark"
                                  to="/listBiji/daftarSKU"
                                  style={{ backgroundColor: "#00c4cc" }}
                                >
                                  Add
                                </CButton>
                              </CCol>
                            </CRow>
                          </CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={this.state.content.sku}
                              fields={fieldSKU}
                              itemsPerPage={10}
                              tableFilter
                              cleaner
                              itemsPerPageSelect
                              hover
                              sorter
                              pagination
                              scopedSlots={{
                                show_details: (item) => {
                                  if(item.status_digunakan === 1) {
                                    return(
                                      <td
                                        className="py-2"
                                        style={{
                                          textAlign: "center",
                                          verticalAlign: "center",
                                        }}
                                      >
                                        Data Has Been Used
                                      </td>
                                    );
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
                                          to={`/listBiji/editSKU/${item.id}`}
                                          style={{ backgroundColor: "#178d88" }}
                                        >
                                          Edit
                                        </CButton>
                                        <CButton
                                          size="sm"
                                          color="danger"
                                          className="ml-1"
                                          onClick={() => this.deleteSKU(item)}
                                          style={{ backgroundColor: "#e2602c" }}
                                        >
                                          Delete
                                        </CButton>
                                      </td>
                                    );
                                  }
                                },
                              }}
                            />
                          </CCardBody>
                        </CCol>
                      </CRow>
                    </CTabPane>

                    <CTabPane>
                      <CRow>
                        <CCol xs="12">
                          <CCardHeader>
                            <CRow>
                              <CCol
                                xs={6}
                                md={7}
                                lg={10}
                                style={{ margin: "auto" }}
                              >
                                <h4 style={{ margin: "auto" }}>PO Green Bean</h4>
                              </CCol>
                              <CCol>
                                <CButton
                                  block
                                  color="dark"
                                  to="/listBiji/daftarPO"
                                  style={{ backgroundColor: "#00c4cc" }}
                                >
                                  Add
                                </CButton>
                              </CCol>
                            </CRow>
                          </CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={this.state.content.po}
                              fields={fieldPO}
                              itemsPerPage={10}
                              tableFilter
                              cleaner
                              itemsPerPageSelect
                              hover
                              sorter
                              pagination
                              scopedSlots={{
                                po_date: (item) => {
                                  return (
                                    <td>
                                      {/* {item.po_date.format('dd/MMM/yyyy')} */}
                                      {moment(item.po_date).format('DD/MMM/Y')}
                                    </td>
                                  );
                                },
                                show_details: (item) => {
                                  if(item.status_digunakan === 1) {
                                    return(
                                      <td
                                        className="py-2"
                                        style={{
                                          textAlign: "center",
                                          verticalAlign: "center",
                                        }}
                                      >
                                        Data Has Been Used
                                      </td>
                                    );
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
                                          to={`/listBiji/editPO/${item.id}`}
                                          style={{ backgroundColor: "#178d88" }}
                                        >
                                          Edit
                                        </CButton>
                                        <CButton
                                          size="sm"
                                          color="danger"
                                          className="ml-1"
                                          onClick={() => this.deletePO(item)}
                                          style={{ backgroundColor: "#e2602c" }}
                                        >
                                          Delete
                                        </CButton>
                                      </td>
                                    );
                                  }
                                },
                              }}
                            />
                          </CCardBody>
                        </CCol>
                      </CRow>
                    </CTabPane>

                    {/* <CTabPane>
                      <CRow>
                        <CCol xs="12">
                          <CCardHeader>
                            <CRow>
                              <CCol
                                xs={6}
                                md={7}
                                lg={10}
                                style={{ margin: "auto" }}
                              >
                                <h4 style={{ margin: "auto" }}>Beans Data</h4>
                              </CCol>
                              <CCol>
                                <CButton
                                  block
                                  color="dark"
                                  to="/listBiji/daftarBiji"
                                  style={{ backgroundColor: "#00c4cc" }}
                                >
                                  Add
                                </CButton>
                              </CCol>
                            </CRow>
                          </CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={this.state.content.biji}
                              fields={fieldBiji}
                              itemsPerPage={10}
                              pagination
                              scopedSlots={{
                                show_details: (item) => {
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
                                        to={`/listBiji/editBiji/${item.id}`}
                                        style={{ backgroundColor: "#178d88" }}
                                      >
                                        Edit
                                      </CButton>
                                      <CButton
                                        size="sm"
                                        color="danger"
                                        className="ml-1"
                                        style={{ backgroundColor: "#e2602c" }}
                                        onClick={() => this.deleteBiji(item)}
                                      >
                                        Delete
                                      </CButton>
                                    </td>
                                  );
                                },
                              }}
                            />
                          </CCardBody>
                        </CCol>
                      </CRow>
                    </CTabPane>
                    <CTabPane>
                      <CRow>
                        <CCol xs="12">
                          <CCardHeader>
                            <CRow>
                              <CCol
                                xs={6}
                                md={7}
                                lg={10}
                                style={{ margin: "auto" }}
                              >
                                <h4 style={{ margin: "auto" }}>Variety Data</h4>
                              </CCol>
                              <CCol>
                                <CButton
                                  block
                                  color="dark"
                                  to="/listBiji/daftarVarietas"
                                  style={{ backgroundColor: "#00c4cc" }}
                                >
                                  Add
                                </CButton>
                              </CCol>
                            </CRow>
                          </CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={this.state.content.jenis}
                              fields={fieldJenis}
                              itemsPerPage={10}
                              pagination
                              scopedSlots={{
                                show_details: (item) => {
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
                                        to={`/listBiji/editVarietas/${item.id}`}
                                        style={{ backgroundColor: "#178d88" }}
                                      >
                                        Edit
                                      </CButton>
                                      <CButton
                                        size="sm"
                                        color="danger"
                                        className="ml-1"
                                        onClick={() => this.deleteJenis(item)}
                                        style={{ backgroundColor: "#e2602c" }}
                                      >
                                        Delete
                                      </CButton>
                                    </td>
                                  );
                                },
                              }}
                            />
                          </CCardBody>
                        </CCol>
                      </CRow>
                    </CTabPane>
                    <CTabPane>
                      <CRow>
                        <CCol xs="12">
                          <CCardHeader>
                            <CRow>
                              <CCol
                                xs={6}
                                md={7}
                                lg={10}
                                style={{ margin: "auto" }}
                              >
                                <h4 style={{ margin: "auto" }}>Process Data</h4>
                              </CCol>
                              <CCol>
                                <CButton
                                  block
                                  color="dark"
                                  to="/listBiji/daftarProses"
                                  style={{ backgroundColor: "#00c4cc" }}
                                >
                                  Add
                                </CButton>
                              </CCol>
                            </CRow>
                          </CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={this.state.content.proses}
                              fields={fieldProses}
                              itemsPerPage={10}
                              pagination
                              scopedSlots={{
                                show_details: (item) => {
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
                                        to={`/listBiji/editProses/${item.id}`}
                                        style={{ backgroundColor: "#178d88" }}
                                      >
                                        Edit
                                      </CButton>
                                      <CButton
                                        size="sm"
                                        color="danger"
                                        className="ml-1"
                                        onClick={() => this.deleteProses(item)}
                                        style={{ backgroundColor: "#e2602c" }}
                                      >
                                        Delete
                                      </CButton>
                                    </td>
                                  );
                                },
                              }}
                            />
                          </CCardBody>
                        </CCol>
                      </CRow>
                    </CTabPane>
                    <CTabPane>
                      <CRow>
                        <CCol xs="12">
                          <CCardHeader>
                            <CRow>
                              <CCol
                                xs={6}
                                md={7}
                                lg={10}
                                style={{ margin: "auto" }}
                              >
                                <h4 style={{ margin: "auto" }}>Unit Data</h4>
                              </CCol>
                              <CCol>
                                <CButton
                                  block
                                  color="dark"
                                  to="/listBiji/daftarUnit"
                                  style={{ backgroundColor: "#00c4cc" }}
                                >
                                  Add
                                </CButton>
                              </CCol>
                            </CRow>
                          </CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={this.state.content.unit}
                              fields={fieldUnit}
                              itemsPerPage={10}
                              pagination
                              scopedSlots={{
                                show_details: (item) => {
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
                                        to={`/listBiji/editUnit/${item.id}`}
                                        style={{ backgroundColor: "#178d88" }}
                                      >
                                        Edit
                                      </CButton>
                                      <CButton
                                        size="sm"
                                        color="danger"
                                        className="ml-1"
                                        onClick={() => this.deleteUnit(item)}
                                        style={{ backgroundColor: "#e2602c" }}
                                      >
                                        Delete
                                      </CButton>
                                    </td>
                                  );
                                },
                              }}
                            />
                          </CCardBody>
                        </CCol>
                      </CRow>
                    </CTabPane> */}

                  </CTabContent>
                </CTabs>
              </CCardBody>
            </CCard>
          </div>
        </main>
      </Fragment>
    );
  }
}
