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
import showResults from "../../../showResults/showResults";
import UserService from "../../../../services/user.service";

export default class MasterDataLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  componentDidMount() {
    UserService.getListMasterData().then((response) => {
      this.setState({
        content: response.data,
      });
    });
  }

  deleteRoastingProfile = (item) => {
    UserService.deleteRoastingProfile(item.id).then(
      showResults("Data has been deleted")
    );
  };

  deleteCupping = (item) => {
    UserService.deleteCupping(item.id).then(
      showResults("Data has been deleted")
    );
  };

  // deleteUnit = (item) => {
  //   UserService.deleteUnitRoaster(item.id).then(showResults("Data has been deleted"));
  // };

  // deleteBeans = (item) => {
  //   UserService.deleteBijiRoaster(item.id).then(showResults("Data has been deleted"));
  // };

  // deleteVariety = (item) => {
  //   UserService.deleteJenisRoaster(item.id).then(showResults("Data has been deleted"));
  // };

  // deleteProcess = (item) => {
  //   UserService.deleteProsesRoaster(item.id).then(
  //     showResults("Data has been deleted")
  //   );
  // };

  // deleteOrigin = (item) => {
  //   UserService.deleteSupplierRoaster(item.id).then(
  //     showResults("Data has been deleted")
  //   );
  // };

  render() {
    const fieldRoastingProfile = [
      {
        key: "roasting_profile",
        label: "Roasting Profile",
        _style: { width: "80%" },
      },
      {
        key: "show_details",
        label: "",
        _style: { width: "20%" },
        filter: false,
      },
    ];
    const fieldCupping = [
      {
        key: "curated_date",
        label: "Curated Date",
        _style: { width: "17%" },
      },
      {
        key: "fragrance_aroma",
        label: "Fragrance / Aroma",
        _style: { width: "17%" },
      },
      {
        key: "flavor",
        label: "Flavor",
        _style: { width: "17%" },
      },
      {
        key: "aftertaste",
        label: "Aftertaste",
        _style: { width: "17%" },
      },
      {
        key: "acidity",
        label: "Acidity",
        _style: { width: "16%" },
      },
      {
        key: "show_details",
        label: "",
        _style: { width: "16%" },
        filter: false,
      },
    ];
    // const fieldUnit = [
    //   {
    //     key: "nama_unit",
    //     label: "Unit",
    //     _style: { width: "80%" },
    //   },
    //   {
    //     key: "show_details",
    //     label: "",
    //     _style: { width: "20%" },
    //     filter: false,
    //   },
    // ];
    // const fieldBeans = [
    //   {
    //     key: "nama_biji",
    //     label: "Beans Name",
    //     _style: { width: "40%" },
    //   },
    //   {
    //     key: "deskripsi_biji",
    //     label: "Beans Description",
    //     _style: { width: "40%" },
    //   },
    //   {
    //     key: "show_details",
    //     label: "",
    //     _style: { width: "20%" },
    //     filter: false,
    //   },
    // ];
    // const fieldVariety = [
    //   {
    //     key: "nama_jenis",
    //     label: "Variety Name",
    //     _style: { width: "40%" },
    //   },
    //   {
    //     key: "deskripsi_jenis",
    //     label: "Variety Description",
    //     _style: { width: "40%" },
    //   },
    //   {
    //     key: "show_details",
    //     label: "",
    //     _style: { width: "20%" },
    //     filter: false,
    //   },
    // ];
    // const fieldProcess = [
    //   {
    //     key: "nama_proses",
    //     label: "Process Name",
    //     _style: { width: "40%" },
    //   },
    //   {
    //     key: "deskripsi_proses",
    //     label: "Process Description",
    //     _style: { width: "40%" },
    //   },
    //   {
    //     key: "show_details",
    //     label: "",
    //     _style: { width: "20%" },
    //     filter: false,
    //   },
    // ];
    // const fieldOrigin = [
    //   {
    //     key: "nama_supplier",
    //     label: "Processor Name",
    //     _style: { width: "40%" },
    //   },
    //   {
    //     key: "lokasi_supplier",
    //     label: "Origin",
    //     _style: { width: "40%" },
    //   },
    //   {
    //     key: "show_details",
    //     label: "",
    //     _style: { width: "20%" },
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
                      <CNavLink>Roasting Profile</CNavLink>
                    </CNavItem>
                    {/* <CNavItem>
                      <CNavLink>Cupping</CNavLink>
                    </CNavItem> */}
                    {/* <CNavItem>
                      <CNavLink>Unit</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Beans</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Variety</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Process</CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>Origin</CNavLink>
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
                                <h4 style={{ margin: "auto" }}>
                                  Roasting Profile Data
                                </h4>
                              </CCol>
                              <CCol>
                                <CButton
                                  block
                                  color="dark"
                                  to="/masterData/addRoastingProfile"
                                  style={{ backgroundColor: "#00c4cc" }}
                                >
                                  Add
                                </CButton>
                              </CCol>
                            </CRow>
                          </CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={this.state.content.roasting_profile}
                              fields={fieldRoastingProfile}
                              itemsPerPage={10}
                              pagination
                              scopedSlots={{
                                show_details: (item) => {
                                  return (
                                    <td className="py-2">
                                      <CButton
                                        size="sm"
                                        color="info"
                                        style={{ backgroundColor: "#178d88" }}
                                        to={`/masterData/editRoastingProfile/${item.id}`}
                                      >
                                        Edit
                                      </CButton>
                                      <CButton
                                        size="sm"
                                        color="danger"
                                        className="ml-1"
                                        onClick={() =>
                                          this.deleteRoastingProfile(item)
                                        }
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
                                <h4 style={{ margin: "auto" }}>
                                  Cupping Data
                                </h4>
                              </CCol>
                              <CCol>
                                <CButton
                                  block
                                  color="dark"
                                  to="/masterData/addCupping"
                                  style={{ backgroundColor: "#00c4cc" }}
                                >
                                  Add
                                </CButton>
                              </CCol>
                            </CRow>
                          </CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={this.state.content.roasting_cupping}
                              fields={fieldCupping}
                              itemsPerPage={10}
                              pagination
                              scopedSlots={{
                                show_details: (item) => {
                                  return (
                                    <td className="py-2">
                                      <CButton
                                        size="sm"
                                        color="info"
                                        style={{ backgroundColor: "#178d88" }}
                                        to={`/masterData/editCupping/${item.id}`}
                                      >
                                        Edit
                                      </CButton>
                                      <CButton
                                        size="sm"
                                        color="danger"
                                        className="ml-1"
                                        onClick={() =>
                                          this.deleteCupping(item)
                                        }
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
                                <h4 style={{ margin: "auto" }}>Unit Data</h4>
                              </CCol>
                              <CCol>
                                <CButton
                                  block
                                  color="dark"
                                  to="/masterData/addUnit"
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
                                    <td className="py-2">
                                      <CButton
                                        size="sm"
                                        color="info"
                                        style={{ backgroundColor: "#178d88" }}
                                        to={`/masterData/editUnit/${item.id}`}
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
                                <h4 style={{ margin: "auto" }}>Beans Data</h4>
                              </CCol>
                              <CCol>
                                <CButton
                                  block
                                  color="dark"
                                  to="/masterData/addBeans"
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
                              fields={fieldBeans}
                              itemsPerPage={10}
                              pagination
                              scopedSlots={{
                                show_details: (item) => {
                                  return (
                                    <td className="py-2">
                                      <CButton
                                        size="sm"
                                        color="info"
                                        style={{ backgroundColor: "#178d88" }}
                                        to={`/masterData/editBeans/${item.id}`}
                                      >
                                        Edit
                                      </CButton>
                                      <CButton
                                        size="sm"
                                        color="danger"
                                        className="ml-1"
                                        onClick={() => this.deleteBeans(item)}
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
                                <h4 style={{ margin: "auto" }}>Variety Data</h4>
                              </CCol>
                              <CCol>
                                <CButton
                                  block
                                  color="dark"
                                  to="masterData/addVariety/Roaster"
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
                              fields={fieldVariety}
                              itemsPerPage={10}
                              pagination
                              scopedSlots={{
                                show_details: (item) => {
                                  return (
                                    <td className="py-2">
                                      <CButton
                                        size="sm"
                                        color="info"
                                        to={`/masterData/editVariety/Roaster/${item.id}`}
                                        style={{ backgroundColor: "#178d88" }}
                                      >
                                        Edit
                                      </CButton>
                                      <CButton
                                        size="sm"
                                        color="danger"
                                        className="ml-1"
                                        onClick={() => this.deleteVariety(item)}
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
                                  to="/masterData/addProcess/Roaster"
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
                              fields={fieldProcess}
                              itemsPerPage={10}
                              pagination
                              scopedSlots={{
                                show_details: (item) => {
                                  return (
                                    <td className="py-2">
                                      <CButton
                                        size="sm"
                                        color="info"
                                        to={`/masterData/editProcess/Roaster/${item.id}`}
                                        style={{ backgroundColor: "#178d88" }}
                                      >
                                        Edit
                                      </CButton>
                                      <CButton
                                        size="sm"
                                        color="danger"
                                        className="ml-1"
                                        onClick={() => this.deleteProcess(item)}
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
                                <h4 style={{ margin: "auto" }}>Origin Data</h4>
                              </CCol>
                              <CCol>
                                <CButton
                                  block
                                  color="dark"
                                  to="/masterData/addOrigin/Roaster"
                                  style={{ backgroundColor: "#00c4cc" }}
                                >
                                  Add
                                </CButton>
                              </CCol>
                            </CRow>
                          </CCardHeader>
                          <CCardBody>
                            <CDataTable
                              items={this.state.content.supplier}
                              fields={fieldOrigin}
                              itemsPerPage={10}
                              pagination
                              scopedSlots={{
                                show_details: (item) => {
                                  return (
                                    <td className="py-2">
                                      <CButton
                                        size="sm"
                                        color="info"
                                        style={{ backgroundColor: "#178d88" }}
                                        to={`/masterData/editOrigin/Roaster/${item.id}`}
                                      >
                                        Edit
                                      </CButton>
                                      <CButton
                                        size="sm"
                                        color="danger"
                                        className="ml-1"
                                        onClick={() => this.deleteOrigin(item)}
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
