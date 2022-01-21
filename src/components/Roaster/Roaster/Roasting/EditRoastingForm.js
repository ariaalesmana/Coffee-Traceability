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
  CCol,
  CInputFile,
} from "@coreui/react";
import { Fragment } from "react";
import UserService from "../../../../services/user.service";

const EditRoastingForm = (props) => {
  const { handleSubmit, reset } = props;

  const [roastingProfile, setRoastingProfile] = useState([]);

  const [roastingName, setRoastingName] = useState("");
  const [roastingCupping, setRoastingCupping] = useState("");
  const [roastingProfileName, setRoastingProfileName] = useState("");
  const [productName, setProductName] = useState("");
  const [beanID, setBeanID] = useState("");
  const [flavorNote, setFlavorNote] = useState("");
  const [acidity, setAcidity] = useState("");
  const [intensity, setIntensity] = useState("");
  const [volume, setVolume] = useState("");
  const [sku, setSKU] = useState("");
  const [roasterName, setRoasterName] = useState("");

  const [roastingMenu, setRoastingMenu] = useState("");
  const [blendedBeans, setBlendedBeans] = useState([]);

  const [cupping, setCupping] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    UserService.getListMasterData().then((response) => {
      setRoastingProfile(response.data.roasting_profile);
    });

    let id = props.roastingID;
    UserService.getListCupping().then((response) => {
      setCupping(response.data.roasting_cupping);
    });
    UserService.getDetailRoastingProduct(id).then((response) => {

      console.log(response.data.roasting[0].roasting_cupping.curated_date);
      setRoastingName(response.data.roasting[0].roasting_name);
      setRoastingCupping(response.data.roasting[0].roasting_cupping.curated_date);
      setRoastingMenu(response.data.roasting[0].roasting_menu);
      setRoastingProfileName(
        response.data.roasting[0].roasting_profile.roasting_profile
      );

      if (response.data.roasting[0].product != null) {
        setProductName(response.data.roasting[0].product.name);
      }

      setBeanID(response.data.roasting[0].bean_id);
      setFlavorNote(response.data.roasting[0].flavor_note);
      setAcidity(response.data.roasting[0].acidity);
      setIntensity(response.data.roasting[0].intensity);
      setVolume(response.data.roasting[0].volume);
      setSKU(response.data.roasting[0].sku);
      setRoasterName(response.data.roasting[0].roaster_name);
      setBlendedBeans(response.data.blendedBeans);
    });
  };

  const renderBeans = () => (
    <ul
      style={{
        listStyle: "none",
        marginLeft: "0px",
        padding: "0px",
      }}
    >
      {blendedBeans.map((beans, index) => {
        return (
          <li key={index}>
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
                    name={`${index}.selectBean`}
                    component="select"
                    disabled
                  >
                    <option value="" selected disabled hidden>
                      {(() => {
                        if (beans.product != null) {
                          return beans.product.name;
                        } else {
                          return "DELETED";
                        }
                      })()}
                    </option>
                  </Field>
                </CCol>
                <CCol xs="5">
                  <Field
                    className="textInput grosir"
                    name={`${index}.persentase`}
                    component="input"
                    type="number"
                    placeholder={beans.persentase}
                    disabled
                  />
                </CCol>
                <CCol xs="2" style={{ margin: "auto" }}>
                  <span>%</span>
                </CCol>
              </CFormGroup>
            </Fragment>
          </li>
        );
      })}
    </ul>
  );

  const onRoastingChanges = (e) => {
    const file = e.target.files[0];
    props.onSelectRoasting(file);
  };

  const onFileChangeGambar = (e) => {
    const file = e.target.files[0];
    props.onSelectImageGambar(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <main className="c-main">
        <div className="container-fluid">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                  <h4 style={{ margin: "auto" }}>Edit Roasting Data</h4>
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
                    placeholder={roastingName}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-roastingCupping">Roasting Cupping</CLabel>
                  <Field
                    className="textInput grosir"
                    name="roastingCupping"
                    component="select"
                  >
                    <option value="" selected disabled hidden>
                      {roastingCupping}
                    </option>
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
                    <option value="" selected disabled hidden>
                      {roastingProfileName}
                    </option>
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
                  <CLabel htmlFor="nf-flavorNote">Flavor Note</CLabel>
                  <Field
                    className="textInput grosir"
                    name="flavorNote"
                    component="input"
                    type="text"
                    placeholder={flavorNote}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-acidity">Acidity</CLabel>
                  <Field
                    className="textInput grosir"
                    name="acidity"
                    component="input"
                    type="text"
                    placeholder={acidity}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-intensity">Intensity</CLabel>
                  <Field
                    className="textInput grosir"
                    name="intensity"
                    component="input"
                    type="text"
                    placeholder={intensity}
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
                      disabled
                      placeholder={volume}
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
                    placeholder={sku}
                  />
                </CFormGroup>

                {roastingMenu == "Single" && (
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
                          disabled
                        >
                          <option value="" selected disabled hidden>
                            {productName}
                          </option>
                        </Field>
                      </CCol>
                    </CFormGroup>
                  </Fragment>
                )}
                {roastingMenu === "Blended" && (
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
                  <CLabel htmlFor="nf-roaster_name">Roaster Name</CLabel>
                  <Field
                    className="textInput grosir"
                    name="roaster_name"
                    component="input"
                    type="text"
                    placeholder={roasterName}
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
  form: "editRoasting", // a unique identifier for this form
})(EditRoastingForm);
