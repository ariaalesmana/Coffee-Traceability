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
  CCollapse,
  CRow,
  CCol,
} from "@coreui/react";
import UserService from "../../../../services/user.service";

const AddProductForm = (props) => {
  const { handleSubmit, reset } = props;

  const [jenis, setJenis] = useState([]);
  const [biji, setBiji] = useState([]);
  const [proses, setProses] = useState([]);
  const [supplier, setSupplier] = useState([]);

  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [bijiName, setBijiName] = useState("");
  const [varietasName, setVarietasName] = useState("");
  const [prosesName, setProsesName] = useState("");
  const [supplierName, setSupplierName] = useState("");

  const [accordion, setAccordion] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    UserService.getAddDetailRoaster().then((response) => {
      setJenis(response.data.jenis);
      setBiji(response.data.biji);
      setProses(response.data.proses);
      setSupplier(response.data.supplier);
    });

    let id = props.productID;
    UserService.getDetailProductRoaster(id).then((response) => {
      if (response.data.product[0].productID) {
        setAccordion(0);
      }

      setProductID(response.data.product[0].productID);
      setProductName(response.data.product[0].name);

      if (response.data.product[0].biji) {
        setBijiName(response.data.product[0].biji.nama_biji);
      }
      if (response.data.product[0].jenis) {
        setVarietasName(response.data.product[0].jenis.nama_jenis);
      }
      if (response.data.product[0].proses) {
        setProsesName(response.data.product[0].proses.nama_proses);
      }
      if (response.data.product[0].supplier) {
        setSupplierName(response.data.product[0].supplier.lokasi_supplier);
      }
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
                  <h4 style={{ margin: "auto" }}>Edit Green Beans</h4>
                </CCol>
                <CCol>
                  <CButton
                    block
                    color="dark"
                    to="/greenBeans"
                    style={{ backgroundColor: "#00c4cc" }}
                  >
                    <span style={{ color: "white" }}>X</span>
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <div id="accordion">
                  <CCard className="mb-0">
                    <CCardHeader id="headingOne">
                      <CButton
                        block
                        className="text-left m-0 p-0"
                        onClick={() => setAccordion(accordion === 0 ? null : 0)}
                      >
                        <h5 className="m-0 p-0">Import Green Beans Product</h5>
                      </CButton>
                    </CCardHeader>
                    <CCollapse show={accordion === 0}>
                      <CCardBody>
                        <CFormGroup>
                          <CLabel htmlFor="nf-product_id">Product ID</CLabel>
                          <Field
                            className="textInput grosir"
                            name="product_id"
                            component="input"
                            type="text"
                            placeholder={productID}
                          />
                        </CFormGroup>
                      </CCardBody>
                    </CCollapse>
                  </CCard>
                  {/* <CCard className="mb-0">
                    <CCardHeader id="headingTwo">
                      <CButton
                        block
                        className="text-left m-0 p-0"
                        onClick={() => setAccordion(accordion === 1 ? null : 1)}
                      >
                        <h5 className="m-0 p-0">
                          Create New Green Beans Product
                        </h5>
                      </CButton>
                    </CCardHeader>
                    <CCollapse show={accordion === 1}>
                      <CCardBody>
                        <CFormGroup>
                          <CLabel htmlFor="nf-name">
                            Product Name <small>*</small>
                          </CLabel>
                          <Field
                            className="textInput grosir"
                            name="product_name"
                            component="input"
                            type="text"
                            placeholder={productName}
                          />
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="nf-pilihJenis">Select Beans</CLabel>
                          <Field
                            className="textInput grosir"
                            name="biji_id"
                            component="select"
                          >
                            <option value="" selected disabled hidden>
                              {bijiName}
                            </option>
                            {biji &&
                              biji.map((value) => {
                                return (
                                  <option key={value.id} value={value.id}>
                                    {value.nama_biji}
                                  </option>
                                );
                              })}
                          </Field>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="nf-pilihSupplier">
                            Select Variety
                          </CLabel>
                          <Field
                            className="textInput grosir"
                            name="jenis_id"
                            component="select"
                          >
                            <option value="" selected disabled hidden>
                              {varietasName}
                            </option>
                            {jenis &&
                              jenis.map((value) => {
                                return (
                                  <option key={value.id} value={value.id}>
                                    {value.nama_jenis}
                                  </option>
                                );
                              })}
                          </Field>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="nf-pilihProses">
                            Select Process
                          </CLabel>
                          <Field
                            className="textInput grosir"
                            name="proses_id"
                            component="select"
                          >
                            <option value="" selected disabled hidden>
                              {prosesName}
                            </option>
                            {proses &&
                              proses.map((value) => {
                                return (
                                  <option key={value.id} value={value.id}>
                                    {value.nama_proses}
                                  </option>
                                );
                              })}
                          </Field>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="nf-pilihSupplier">
                            Select Origin
                          </CLabel>
                          <Field
                            className="textInput grosir"
                            name="supplier_id"
                            component="select"
                          >
                            <option value="" selected disabled hidden>
                              {supplierName}
                            </option>
                            {supplier &&
                              supplier.map((value) => {
                                return (
                                  <option key={value.id} value={value.id}>
                                    {value.lokasi_supplier}
                                  </option>
                                );
                              })}
                          </Field>
                        </CFormGroup>
                      </CCardBody>
                    </CCollapse>
                  </CCard> */}
                </div>
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
  form: "addProduct", // a unique identifier for this form
})(AddProductForm);
