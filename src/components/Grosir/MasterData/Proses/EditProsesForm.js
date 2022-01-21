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

const EditProsesForm = (props) => {
  const { handleSubmit } = props;

  const [namaProses, setNama] = useState("");
  const [deskripsiProses, setDeskripsi] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let id = props.prosesID;
    UserService.detailProses(id).then((response) => {
      setNama(response.data.proses.nama_proses);
      setDeskripsi(response.data.proses.deskripsi_proses);
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
                  <h4 style={{ margin: "auto" }}>Edit Process</h4>
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
                  <CLabel htmlFor="nf-namaProses">Process Name</CLabel>
                  <Field
                    className="textInput grosir"
                    name="nama_proses"
                    component="input"
                    type="text"
                    placeholder={namaProses}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-deskripsiProses">
                    Process Description
                  </CLabel>
                  <Field
                    className="textAreaInput grosir"
                    name="deskripsi_proses"
                    component="textarea"
                    placeholder={deskripsiProses}
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
  form: "editProses", // a unique identifier for this form
})(EditProsesForm);
