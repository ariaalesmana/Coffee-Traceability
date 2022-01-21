import { React, useState, useEffect } from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CForm,
  CFormGroup,
  CLabel,
  CCardFooter,
  CRow,
  CInputFile,
  CCol,
} from "@coreui/react";
import { Fragment } from "react";
import UserService from "../../../../services/user.service";

const AddRoastingForm = (props) => {
  const { handleSubmit, reset } = props;

  const [selectedRoastingMenu, setSelectedRoastingMenu] = useState("-----");

  const [roastingProfile, setRoastingProfile] = useState([]);
  const [product, setProduct] = useState([]);
  const [cupping, setCupping] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    UserService.getListMasterData().then((response) => {
      setRoastingProfile(response.data.roasting_profile);
    });
    UserService.getListProductRoaster().then((response) => {
      setProduct(response.data.product);
    });
    UserService.getListCupping().then((response) => {
      setCupping(response.data.roasting_cupping);
    });
  };

  const handleChange = (e) => {
    setSelectedRoastingMenu(e.target.value);
  };

  const onRoastingChanges = (e) => {
    const file = e.target.files[0];
    props.onSelectRoasting(file);
  };

  const onFileChangeGambar = (e) => {
    const file = e.target.files[0];
    props.onSelectImageGambar(file);
  };

  const renderBeans = ({ fields, meta: { error, submitFailed } }) => (
    <ul style={{ listStyle: "none", marginLeft: "0px", padding: "0px" }}>
      {fields.map((beans, index) => (
        <li key={index} style={{ marginTop: "40px" }}>
          <CButton
            type="button"
            size="sm"
            color="dark"
            style={{
              backgroundColor: "#00c4cc",
              float: "right",
              width: "50px",
            }}
            onClick={() => fields.remove(index)}
          >
            <span style={{ color: "white" }}>X</span>
          </CButton>
          <h4 style={{ marginTop: "30px" }}>Bean #{index + 1}</h4>
          <Fragment>
            <CFormGroup row>
              <CLabel col xs="5" htmlFor="selectBeanMultiple">
                Select Bean
              </CLabel>
              <CLabel col xs="5" htmlFor="persentase">
                Persentase
              </CLabel>
              <CCol xs="5">
                <Field
                  className="textInput grosir"
                  name={`${beans}.selectBean`}
                  component="select"
                >
                  <option value="" selected disabled hidden>
                    ----
                  </option>
                  {product &&
                    product.map((value) => {
                      return (
                        <option key={value.id} value={value.id}>
                          {value.name}
                        </option>
                      );
                    })}
                </Field>
              </CCol>
              <CCol xs="5">
                <Field
                  className="textInput grosir"
                  name={`${beans}.persentase`}
                  component="input"
                  type="number"
                />
              </CCol>
              <CCol xs="2" style={{ margin: "auto" }}>
                <span>%</span>
              </CCol>
            </CFormGroup>
          </Fragment>
        </li>
      ))}
      <li>
        <CButton
          type="button"
          size="sm"
          color="primary"
          style={{ backgroundColor: "#178d88" }}
          onClick={() => fields.push({})}
        >
          Add Bean
        </CButton>
        {submitFailed && error && <span>{error}</span>}
      </li>
    </ul>
  );

  return (
    <form onSubmit={handleSubmit}>
      <main className="c-main">
        <div className="container-fluid">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                  <h4 style={{ margin: "auto" }}>Add Roasting Data</h4>
                </CCol>
                <CCol>
                  <CButton
                    block
                    color="dark"
                    to="/roasting"
                    style={{ backgroundColor: "#00c4cc" }}
                  >
                    <span style={{ color: "white" }}>X</span>
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup>
                  <CLabel htmlFor="nf-roastingName">Roasting Name</CLabel>
                  <Field
                    className="textInput grosir"
                    name="roastingName"
                    component="input"
                    type="text"
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-roastingCupping">Roasting Cupping</CLabel>
                  <Field
                    className="textInput grosir"
                    name="roastingCupping"
                    component="select"
                  >
                    <option value="-----">----</option>
                    {cupping &&
                      cupping.map((value) => {
                        return (
                          <option key={value.id} value={value.id}>
                            {value.curated_date}
                          </option>
                        );
                      })}
                  </Field>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-roastingProfile">Roasting Profile</CLabel>
                  <Field
                    className="textInput grosir"
                    name="roastingProfile"
                    component="select"
                  >
                    <option value="-----">----</option>
                    {roastingProfile &&
                      roastingProfile.map((value) => {
                        return (
                          <option key={value.id} value={value.id}>
                            {value.roasting_profile}
                          </option>
                        );
                      })}
                  </Field>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-roastingMenu">Roasting Menu</CLabel>
                  <Field
                    className="textInput grosir"
                    id="roastingMenu"
                    name="roastingMenu"
                    component="select"
                    value={selectedRoastingMenu}
                    onChange={handleChange}
                  >
                    <option value="-----">----</option>
                    <option value="Single">Single Origin</option>
                    <option value="Blended">Blended</option>
                  </Field>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-flavorNote">Flavor Note</CLabel>
                  <Field
                    className="textInput grosir"
                    name="flavorNote"
                    component="input"
                    type="text"
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-acidity">Acidity</CLabel>
                  <Field
                    className="textInput grosir"
                    name="acidity"
                    component="input"
                    type="text"
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-intensity">Intensity</CLabel>
                  <Field
                    className="textInput grosir"
                    name="intensity"
                    component="input"
                    type="text"
                  />
                </CFormGroup>
                <CFormGroup row>
                  <CLabel col xs="12" htmlFor="nf-weight">
                    Volume <small>*</small>
                  </CLabel>
                  <CCol xs="10">
                    <Field
                      className="textInput grosir"
                      name="weight"
                      component="input"
                      type="number"
                    />
                  </CCol>
                  <CCol xs="2" style={{ margin: "auto" }}>
                    <span>Kg</span>
                  </CCol>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-sku">SKU</CLabel>
                    <Field
                      className="textInput grosir"
                      name="sku"
                      component="input"
                      type="text"
                    />
                  </CFormGroup>

                {selectedRoastingMenu === "Single" && (
                  <Fragment>
                    <CFormGroup row>
                      <CLabel col xs="12" htmlFor="nf-bean">
                        Select Bean
                      </CLabel>
                      <CCol xs="12">
                        <Field
                          className="textInput grosir"
                          name="bean"
                          component="select"
                        >
                          <option value="" selected disabled hidden>
                            ----
                          </option>
                          {product &&
                            product.map((value) => {
                              return (
                                <option key={value.id} value={value.id}>
                                  {value.name}
                                </option>
                              );
                            })}
                        </Field>
                      </CCol>
                    </CFormGroup>
                  </Fragment>
                )}

                {selectedRoastingMenu === "Blended" && (
                  <FieldArray name="beans" component={renderBeans} />
                )}
                <CFormGroup>
                  <CLabel htmlFor="nf-tgl_roasting">
                    Roasting Date <small>*</small>
                  </CLabel>
                  <Field
                    className="textInput grosir"
                    name="tgl_roasting"
                    component="input"
                    type="date"
                  />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="nf-nama_roaster">Roaster Name</CLabel>
                    <Field
                      className="textInput grosir"
                      name="roaster_name"
                      component="input"
                      type="text"
                    />
                  </CFormGroup>
                <CFormGroup row>
                  <CLabel col xs="12" htmlFor="file-roasting_process">
                    Roasting Process
                  </CLabel>
                  <CCol xs="12">
                    <CInputFile
                      id="file-input"
                      name="roastingProcess"
                      type="file"
                      onChange={onRoastingChanges}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CLabel col xs="12" htmlFor="file-files_gambar">
                    Roasting Image <small>*</small>
                  </CLabel>
                  <CCol xs="12">
                    <CInputFile
                      id="file-input"
                      name="files_gambar"
                      type="file"
                      onChange={onFileChangeGambar}
                    />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton
                type="submit"
                size="sm"
                color="primary"
                style={{ backgroundColor: "#178d88" }}
              >
                Submit
              </CButton>{" "}
              <CButton
                type="reset"
                size="sm"
                color="danger"
                onClick={reset}
                style={{ backgroundColor: "#e2602c" }}
              >
                Reset
              </CButton>
            </CCardFooter>
          </CCard>
        </div>
      </main>
    </form>
  );
};

export default reduxForm({
  form: "addRoasting", // a unique identifier for this form
})(AddRoastingForm);
