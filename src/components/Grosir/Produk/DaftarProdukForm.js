import { React, useState, useEffect, Fragment } from "react";
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
import UserService from "../../../services/user.service";

const DaftarProdukForm = (props) => {
  const { handleSubmit, reset } = props;

  const [batch, setBatch] = useState([]);
  const [category, setCategory] = useState([]);
  const [productGroup, setProductGroup] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [unit, setUnit] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [defaultCurrency, setDefaultCurrency] = useState("");

  const [selectedRoastingMenu, setSelectedRoastingMenu] = useState("-----");

  const getBatch = () => {
    UserService.getAddDetailProduct().then(
      (response) => {
        setCurrencies(response.data.currencies);
        setBatch(response.data.batch);
        setCategory(response.data.category);
        setProductGroup(response.data.product_group_rules);
        setDefaultCurrency(response.data.defaultCurrencies);
      },
      (error) => {}
    );
  };

  const getUnit = () => {
    UserService.getUnitDetail().then((response) => {
      setUnit(response.data.unit);
    });
  };

  useEffect(() => {
    getBatch();
    getUnit();
  }, []);

  const onFileChange = (e) => {
    const file = e.target.files;
    props.onSelectImage(file);
  };

  const onFileChangeGambar = (e) => {
    const file = e.target.files[0];
    props.onSelectImageGambar(file);
  };

  const onChangeCategory = (e) => {
    UserService.getSubCategory(e.target.value).then((response) => {
      setSubCategory(response.data.subcategory);
    });
  };

  const handleChange = (e) => {
    setSelectedRoastingMenu(e.target.value);
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
                Select Batch
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
                  {batch &&
                    batch.map((value) => {
                      return (
                        <option key={value.id} value={value.id}>
                          {value.batch_id}
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
    <Fragment>
      <form onSubmit={handleSubmit}>
        <main className="c-main">
          <div className="container-fluid">
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                    <h4 style={{ margin: "auto" }}>Add Product</h4>
                  </CCol>
                  <CCol>
                    <CButton
                      block
                      color="dark"
                      to="/listProduk"
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
                    <CLabel htmlFor="nf-roastingMenu">Green Beans</CLabel>
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

                  {selectedRoastingMenu === "Single" && (
                    <Fragment>
                      <CFormGroup>
                        <CLabel htmlFor="nf-batch_id">
                          ID Batch <small>*</small>
                        </CLabel>
                        <Field
                          className="textInput grosir"
                          name="batch_id"
                          component="select"
                        >
                          <option value="-----">----</option>
                          {batch &&
                            batch.map((value) => {
                              return (
                                <option key={value.id} value={value.id}>
                                  {value.batch_id}
                                </option>
                              );
                            })}
                        </Field>
                      </CFormGroup>
                    </Fragment>
                  )}

                  {selectedRoastingMenu === "Blended" && (
                    <FieldArray name="beans" component={renderBeans} />
                  )}

                  <CFormGroup>
                    <CLabel htmlFor="nf-name">
                      Product Name <small>*</small>
                    </CLabel>
                    <Field
                      className="textInput grosir"
                      name="name"
                      component="input"
                      type="text"
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="nf-productGroup">
                      Product Group <small>*</small>
                    </CLabel>
                    <Field
                      className="textInput grosir"
                      name="productGroup"
                      component="select"
                    >
                      <option value="-----">----</option>
                      {productGroup &&
                        productGroup.map((value) => {
                          return (
                            <option key={value.id} value={value.id}>
                              {value.rule_name}
                            </option>
                          );
                        })}
                    </Field>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="nf-category">
                      Category <small>*</small>
                    </CLabel>
                    <Field
                      className="textInput grosir"
                      name="category"
                      component="select"
                      onChange={onChangeCategory}
                    >
                      <option value="-----">----</option>
                      {category &&
                        category.map((value) => {
                          return (
                            <option key={value.id} value={value.id}>
                              {value.name}
                            </option>
                          );
                        })}
                    </Field>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="nf-subcategory">
                      Sub Category <small>*</small>
                    </CLabel>
                    <Field
                      className="textInput grosir"
                      name="subcategory"
                      component="select"
                    >
                      <option value="-----">----</option>
                      {subcategory &&
                        subcategory.map((value) => {
                          return (
                            <option key={value.id} value={value.id}>
                              {value.name}
                            </option>
                          );
                        })}
                    </Field>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="nf-description">
                      Description <small>*</small>
                    </CLabel>
                    <Field
                      className="textAreaInput grosir"
                      name="description"
                      component="textarea"
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="nf-short_description">
                      Short Description <small>*</small>
                    </CLabel>
                    <Field
                      className="textInput grosir"
                      name="short_description"
                      component="input"
                      type="text"
                    />
                  </CFormGroup>
                  <CFormGroup row>
                    <CLabel col xs="6" htmlFor="nf-price">
                      Price <small>*</small>
                    </CLabel>
                    <CLabel col xs="6" htmlFor="nf-currency">
                      Currency
                    </CLabel>
                    <CCol xs="6">
                      <Field
                        className="textInput grosir"
                        name="price"
                        component="input"
                        type="text"
                      />
                    </CCol>
                    <CCol xs="6">
                      <Field
                        className="textInput grosir"
                        name="currency"
                        component="select"
                      >
                        <option value="" selected disabled hidden>
                          {currencies.map((value) => {
                            if (value.code == defaultCurrency) {
                              return value.name + " - " + value.code;
                            }
                          })}
                        </option>
                        {currencies &&
                          currencies.map((value) => {
                            return (
                              <option key={value.id} value={value.id}>
                                {value.name} - {value.code}
                              </option>
                            );
                          })}
                      </Field>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="nf-unit">
                      Stock <small>*</small>
                    </CLabel>
                    <Field
                      className="textInput grosir"
                      name="stock"
                      component="input"
                      type="text"
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="nf-unit">
                      Unit <small>*</small>
                    </CLabel>
                    <Field
                      className="textInput grosir"
                      name="unit"
                      component="select"
                    >
                      <option value="-----">----</option>
                      {unit &&
                        unit.map((value) => {
                          return (
                            <option key={value.id} value={value.id}>
                              {value.nama_unit}
                            </option>
                          );
                        })}
                    </Field>
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
                  <CFormGroup row>
                    <CLabel col xs="12" htmlFor="nf-weight">
                      Weight <small>*</small>
                    </CLabel>
                    <CCol xs="10">
                      <Field
                        className="textInput grosir"
                        name="weight"
                        component="input"
                        type="text"
                      />
                    </CCol>
                    <CCol xs="2" style={{ margin: "auto" }}>
                      <span>Kg</span>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="nf-tgl_produksi">
                      Production Date <small>*</small>
                    </CLabel>
                    <Field
                      className="textInput grosir"
                      name="tgl_produksi"
                      component="input"
                      type="date"
                    />
                  </CFormGroup>
                  <CFormGroup row>
                    <CLabel col xs="12" htmlFor="file-gambar_proses">
                      Process Image <small>*</small>
                    </CLabel>
                    <CCol xs="12">
                      <CInputFile
                        id="file-input"
                        name="gambar_proses"
                        type="file"
                        onChange={onFileChange}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CLabel col xs="12" htmlFor="file-files_gambar">
                      Product Image <small>*</small>
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
    </Fragment>
  );
};

export default reduxForm({
  form: "daftarProduk", // a unique identifier for this form
})(DaftarProdukForm);
