import { React, useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
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
} from "@coreui/react";
import UserService from "../../../../../services/user.service";

const EditRoastingProfileForm = (props) => {
  const { handleSubmit } = props;

  const [roastingProfile, setRoastingProfile] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let id = props.roastingProfileID;
    UserService.getDetailRoastingProfile(id).then((response) => {
      setRoastingProfile(response.data.roasting_profile.roasting_profile);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <main className="c-main">
        <div className="container-fluid">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                  <h4 style={{ margin: "auto" }}>Edit Proses</h4>
                </CCol>
                <CCol>
                  <CButton
                    block
                    color="dark"
                    to="/masterData"
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
                  <CLabel htmlFor="nf-roasting_profile">
                    Roasting Profile
                  </CLabel>
                  <Field
                    className="textInput grosir"
                    name="roasting_profile"
                    component="input"
                    type="text"
                    placeholder={roastingProfile}
                  />
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
              </CButton>
            </CCardFooter>
          </CCard>
        </div>
      </main>
    </form>
  );
};

export default reduxForm({
  form: "editRoastingProfile", // a unique identifier for this form
})(EditRoastingProfileForm);
