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

const EditCuppingForm = (props) => {
  const { handleSubmit } = props;

  const [curatedDate, setCuratedDate] = useState("");
  const [curatedBy, setCuratedBy] = useState("");
  const [fragranceAroma, setFragranceAroma] = useState("");
  const [flavor, setFlavor] = useState("");
  const [aftertaste, setAftertaste] = useState("");
  const [acidity, setAcidity] = useState("");
  const [body, setBody] = useState("");
  const [cuppingScore, setCuppingScore] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let id = props.cuppingID;
    UserService.getDetailCupping(id).then((response) => {
      setCuratedDate(response.data.cupping.curated_date);
      setCuratedBy(response.data.cupping.curated_by);
      setFragranceAroma(response.data.cupping.fragrance_aroma);
      setFlavor(response.data.cupping.flavor);
      setAftertaste(response.data.cupping.aftertaste);
      setAcidity(response.data.cupping.acidity);
      setBody(response.data.cupping.body);
      setCuppingScore(response.data.cupping.cupping_score);
      setCategory(response.data.cupping.category);
    });
  };

  const onCertificateChanges = (e) => {
    const file = e.target.files[0];
    props.onSelectCertificate(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <main className="c-main">
        <div className="container-fluid">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                  <h4 style={{ margin: "auto" }}>Edit Cupping</h4>
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
                    Curated Date
                  </CLabel>
                  <Field
                    className="textInput grosir"
                    name="curated_date"
                    component="input"
                    type="date"
                    placeholder={curatedDate}
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
                    placeholder={curatedBy}
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
                    placeholder={fragranceAroma}
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
                    placeholder={flavor}
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
                    placeholder={aftertaste}
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
                    placeholder={acidity}
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
                    placeholder={body}
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
                    placeholder={cuppingScore}
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
                    <option value="" selected disabled hidden>
                      {category}
                    </option>
                    <option value="Q Grade">Q Grade / Specialty</option>
                    <option value="Premium">Premium</option>
                    <option value="Commercial Grade">Commercial Grade</option>
                  </Field>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-cupping_certificate">
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
              </CButton>
            </CCardFooter>
          </CCard>
        </div>
      </main>
    </form>
  );
};

export default reduxForm({
  form: "editCupping", // a unique identifier for this form
})(EditCuppingForm);
