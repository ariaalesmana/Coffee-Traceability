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
import showResults from "../../../../showResults/showResults";
import UserService from "../../../../../services/user.service";

export default class ListCupping extends Component {
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

  deleteCupping = (item) => {
    UserService.deleteCupping(item.id).then(
      showResults("Data has been deleted")
    );
  };  

  render() {
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

    return (
      <Fragment>
        <main className="c-main">
          <div className="container-fluid">
            <CCard>
              <CCardBody>
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
                            tableFilter
                            cleaner
                            itemsPerPageSelect
                            hover
                            sorter
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
              </CCardBody>
            </CCard>
          </div>
        </main>
      </Fragment>
    );
  }
}
