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
import UserService from "../../../../services/user.service";

const EditVarietasForm = (props) => {
  const { handleSubmit } = props;

  const [namaVarietas, setNama] = useState("");
  const [deskripsiVarietas, setDeskripsi] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let id = props.jenisID;
    UserService.getDetailJenis(id).then((response) => {
      setNama(response.data.jenis.nama_jenis);
      setDeskripsi(response.data.jenis.deskripsi_jenis);
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
                  <h4 style={{ margin: "auto" }}>Edit Variety</h4>
                </CCol>
                <CCol>
                  <CButton
                    block
                    color="dark"
                    to="/listBiji"
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
                  <CLabel htmlFor="nf-namaJenis">Variety Name</CLabel>
                  <Field
                    className="textInput grosir"
                    name="nama_jenis"
                    component="input"
                    type="text"
                    placeholder={namaVarietas}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-deskripsiJenis">
                    Variety Description
                  </CLabel>
                  <Field
                    className="textAreaInput grosir"
                    name="deskripsi_jenis"
                    component="textarea"
                    placeholder={deskripsiVarietas}
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
  form: "editVarietas", // a unique identifier for this form
})(EditVarietasForm);
