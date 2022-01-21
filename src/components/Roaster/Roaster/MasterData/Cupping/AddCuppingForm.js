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
  CInputFile,
} from "@coreui/react";
import UserService from "../../../../../services/user.service";

const AddCuppingForm = (props) => {
  const { handleSubmit, reset } = props;
  const [product, setProduct] = useState([]);

  const onCertificateChanges = (e) => {
    const file = e.target.files[0];
    props.onSelectCertificate(file);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    UserService.getListProduct().then((response) => {
      console.log("cek ini mal", response)
      setProduct(response.data.product);
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
                  <h4 style={{ margin: "auto" }}>Add Cupping</h4>
                </CCol>
                <CCol>
                  <CButton
                    block
                    color="dark"
                    to="/listCupping"
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
                  <CLabel htmlFor="nf-curated_date">
                    Product
                  </CLabel>
                  <Field
                    className="textInput grosir"
                    name="productId"
                    component="select"
                    required
                  >
                    <option value="" selected disabled hidden>
                      ----
                    </option>
                    {product &&
                      product.map((value) => {
                        return (
                          <option key={value.id} value={value.product_id}>
                            {value.product.name}
                          </option>
                        );
                      })}
                  </Field>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-curated_date">
                    Curated Date
                  </CLabel>
                  <Field
                    className="textInput grosir"
                    name="curated_date"
                    component="input"
                    type="date"
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-curated_by">
                    Curated By
                  </CLabel>
                  <Field
                    className="textInput grosir"
                    name="curated_by"
                    component="input"
                    type="text"
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-fragrance_aroma">
                    Fragrance / Aroma
                  </CLabel>
                  <Field
                    className="textInput grosir"
                    name="fragrance_aroma"
                    component="input"
                    type="text"
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-flavor">
                    Flavor
                  </CLabel>
                  <Field
                    className="textInput grosir"
                    name="flavor"
                    component="input"
                    type="text"
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-aftertaste">
                    Aftertaste
                  </CLabel>
                  <Field
                    className="textInput grosir"
                    name="aftertaste"
                    component="input"
                    type="text"
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-acidity">
                    Acidity
                  </CLabel>
                  <Field
                    className="textInput grosir"
                    name="acidity"
                    component="input"
                    type="text"
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-body">
                    Body
                  </CLabel>
                  <Field
                    className="textInput grosir"
                    name="body"
                    component="input"
                    type="text"
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-cupping_score">
                    Cupping Score
                  </CLabel>
                  <Field
                    className="textInput grosir"
                    name="cupping_score"
                    component="input"
                    type="text"
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-category">
                    Category
                  </CLabel>
                  <Field
                    className="textInput grosir"
                    name="category"
                    component="select">
                    <option value="" selected disabled hidden>----</option>
                    <option value="Q Grade">Q Grade / Specialty</option>
                    <option value="Premium">Premium</option>
                    <option value="Commercial Grade">Commercial Grade</option>
                  </Field>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="file-cupping_certificate">
                    Cupping Certificate
                  </CLabel>
                  <CInputFile
                    id="file-input"
                    name="cupping_certificate"
                    type="file"
                    onChange={onCertificateChanges}
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
  form: "addCupping", // a unique identifier for this form
})(AddCuppingForm);
