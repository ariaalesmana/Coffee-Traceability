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

const EditSKUForm = (props) => {
  const { handleSubmit } = props;

  const [sku, setSKU] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let id = props.skuID;
    UserService.detailSKU(id).then((response) => {
      setSKU(response.data.data)
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
                  <h4 style={{ margin: "auto" }}>Edit SKU</h4>
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
                <CFormGroup>
                  <CLabel htmlFor="nf-namaUnit">SKU Green Bean Code</CLabel>
                  <Field
                    className="textInput grosir"
                    name="sku"
                    component="input"
                    type="text"
                    placeholder={sku.sku}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-namaUnit">SKU Green Bean Name</CLabel>
                  <Field
                    className="textInput grosir"
                    name="name"
                    component="input"
                    type="text"
                    placeholder={sku.name}
                  />
                </CFormGroup>
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
  form: "editSKU", // a unique identifier for this form
})(EditSKUForm);
