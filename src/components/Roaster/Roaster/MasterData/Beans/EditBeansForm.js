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

const EditBijiForm = (props) => {
  const { handleSubmit } = props;

  const [namaBiji, setNama] = useState("");
  const [deskripsiBiji, setDeskripsi] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let id = props.bijiID;
    UserService.detailBijiRoaster(id).then(
      (response) => {
        setNama(response.data.biji.nama_biji);
        setDeskripsi(response.data.biji.deskripsi_biji);
      },
      (error) => {}
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <main className="c-main">
        <div className="container-fluid">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                  <h4 style={{ margin: "auto" }}>Edit Beans</h4>
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
                  <CLabel htmlFor="nf-namaBiji">Beans Name</CLabel>
                  <Field
                    className="textInput grosir"
                    name="nama_biji"
                    component="input"
                    type="text"
                    placeholder={namaBiji}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-deskripsiBiji">Beans Description</CLabel>
                  <Field
                    className="textAreaInput grosir"
                    name="deskripsi_biji"
                    component="textarea"
                    placeholder={deskripsiBiji}
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
  form: "editBiji", // a unique identifier for this form
})(EditBijiForm);
