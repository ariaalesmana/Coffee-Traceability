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

export default class RoastingLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  componentDidMount() {
    UserService.getListRoastingProducts().then((response) => {
      this.setState({
        content: response.data,
      });
    });
  }

  deleteRoasting = (item) => {
    UserService.deleteRoastingProduct(item.id).then(
      showResults("Data has been deleted")
    );
  };

  render() {
    const scopedSlots1 = {
      bean_id: (item) => (
        <td>
          {(() => {
            if (item.roasting_menu == "Blended") {
              return "Blended";
            } else if (item.roasting_menu == "Single") {
              if (item.product != null) {
                return item.product.name;
              }
            }
          })()}
        </td>
      ),
      roasting_profile_id: (item) => (
        <td>
          {item.roasting_profile ? item.roasting_profile.roasting_profile : ''}
        </td>
      ),
      show_details: (item) => {
        return (
          <td className="py-2">
            <CButton
              size="sm"
              color="info"
              to={`/roasting/editRoasting/${item.id}`}
              style={{ backgroundColor: "#178d88" }}
            >
              Edit
            </CButton>
            <CButton
              size="sm"
              color="danger"
              className="ml-1"
              onClick={() => this.deleteRoasting(item)}
              style={{ backgroundColor: "#e2602c" }}
            >
              Delete
            </CButton>
          </td>
        );
      },
    };

    const scopedSlots2 = {
      bean_id: (item) => <td>{item.product ? item.product.name : '-'}</td>,
    };

    const fieldsRoasting = [
      {
        key: "roasting_batch_id",
        label: "Batch ID",
        _style: { width: "10%" },
      },
      {
        key: "roasting_name",
        label: "Roasting Name",
        _style: { width: "14%" },
      },
      {
        key: "bean_id",
        label: "Bean Name",
        _style: { width: "14%" },
      },
      {
        key: "roasting_profile_id",
        label: "Roasting Product",
        _style: { width: "13%" },
      },
      {
        key: "flavor_note",
        label: "Flavor Note",
        _style: { width: "13%" },
      },
      {
        key: "volume",
        label: "Volume",
        _style: { width: "10%" },
      },
      {
        key: "tgl_roasting",
        label: "Tanggal Roasting",
        _style: { width: "16%" },
      },
      {
        key: "show_details",
        label: "",
        _style: { width: "10%" },
        filter: false,
      },
    ];

    const fieldsInventory = [
      {
        key: "bean_id",
        label: "Bean Name",
        _style: { width: "80%" },
      },
      {
        key: "weight",
        label: "Weight",
        _style: { width: "10%" },
      },
      {
        key: "unit",
        label: "Unit",
        _style: { width: "10%" },
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
                        <h4 style={{ margin: "auto" }}>Roasting Data</h4>
                      </CCol>
                      <CCol>
                        <CButton
                          block
                          color="dark"
                          to="/roasting/addRoasting"
                          style={{ backgroundColor: "#00c4cc" }}
                        >
                          Add
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable
                      items={this.state.content.roasting}
                      fields={fieldsRoasting}
                      itemsPerPage={10}
                      pagination
                      scopedSlots={scopedSlots1}
                    />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12">
                <CCard>
                  <CCardHeader>
                    <CRow>
                      <CCol xs={12} md={12} lg={12} style={{ margin: "auto" }}>
                        <h4 style={{ margin: "auto" }}>Inventory Data</h4>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CDataTable
                      items={this.state.content.inventory}
                      fields={fieldsInventory}
                      itemsPerPage={10}
                      pagination
                      scopedSlots={scopedSlots2}
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
