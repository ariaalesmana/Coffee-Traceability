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
  CDataTable,
} from "@coreui/react";
import UserService from "../../../../services/user.service";

const AddProductForm = (props) => {
  const { handleSubmit, reset } = props;

  const [jenis, setJenis] = useState([]);
  const [biji, setBiji] = useState([]);
  const [proses, setProses] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [product, setProduct] = useState([]);

  const [accordion, setAccordion] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const arrProduct = [];


  const getData = async () => {
    UserService.getAddDetailRoaster().then((response) => {
      setJenis(response.data.jenis);
      setBiji(response.data.biji);
      setProses(response.data.proses);
      setSupplier(response.data.supplier);
    });
    UserService.getListProduct().then((response) => {

      response.data.product.map((value, index) => {
        arrProduct.push(value.product);
      })

      setProduct(arrProduct);
    });

  };

  const Data = [
    { key: "id", label: "Product ID"},
    { key: "name", label: "Name"},
    { key: "created_at", label: "Created Date"},
  ];

  return (
    <form onSubmit={handleSubmit}>
      <main className="c-main">
        <div className="container-fluid">
          <CCard>
            <CCardBody>
              <CDataTable
                items={product}
                fields={Data}
                itemsPerPage={5}
                tableFilter
                cleaner
                itemsPerPageSelect
                hover
                sorter
                pagination
                // scopedSlots={{
                //   getName: (item) => {
                //     return (
                //       <td className="py-2">
                //         <div>
                //           {item.name}
                //         </div>
                //       </td>
                //     );
                //   },
                // }}
              />
            </CCardBody>
          </CCard>
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                  <h4 style={{ margin: "auto" }}>Add Green Beans</h4>
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
                            ----
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
                            ----
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
                        <CLabel htmlFor="nf-pilihSupplier">
                          Select Process
                        </CLabel>
                        <Field
                          className="textInput grosir"
                          name="proses_id"
                          component="select"
                        >
                          <option value="" selected disabled hidden>
                            ----
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
                            ----
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
                    </CCardBody>
                  </CCollapse>
                </CCard> */}
              </div>
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
