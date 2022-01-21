import { React, useState, useEffect, Fragment } from "react";
import { Field, reduxForm, FieldArray } from "redux-form";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CForm,
  CFormGroup,
  CLabel,
  CRow,
  CCol,
  CImg,
  CCarousel,
  CCarouselInner,
  CCarouselItem,
  CCarouselControl,
} from "@coreui/react";
import UserService from "../../../services/user.service";

const MARKETPLACE_URL = process.env.REACT_APP_CATALOG_URL;

const ShowProdukForm = (props) => {
  const { handleSubmit, reset } = props;

  const [batch, setBatch] = useState([]);
  // const [category, setCategory] = useState([]);
  // const [productGroup, setProductGroup] = useState([]);
  // const [subcategory, setSubCategory] = useState([]);
  const [batchID, setBatchID] = useState("");
  const [unit, setUnit] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const [imageProducts, setImageProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [productVendor, setProductVendor] = useState([]);
  const [blendedBeans, setBlendedBeans] = useState([]);

  useEffect(() => {
    getData();
    getBatch();
    getUnit();
  }, []);

  const getData = () => {
    let id = props.productID;
    UserService.getDetailProduct(id).then((response) => {
      setProductVendor(response.data.product);
      UserService.getDetailProduk(response.data.product.product_id).then(
        (response) => {
          if (response.data.product[0].batch != null) {
            setBatchID(response.data.product[0].batch.batch_id);
          }
          setProduct(response.data.product[0]);
          setImageProducts(response.data.imageProducts);
          setBlendedBeans(response.data.blendedBeans);
        }
      );
    });
  };

  const getBatch = () => {
    UserService.getAddDetailProduct().then((response) => {
      setCurrencies(response.data.currencies);
      setBatch(response.data.batch);
      // setCategory(response.data.category);
      // setProductGroup(response.data.product_group_rules);
    });
  };

  const getUnit = () => {
    UserService.getUnitDetail().then((response) => {
      setUnit(response.data.unit);
    });
  };

  const onChangeCategory = (e) => {
    // UserService.getSubCategory(e.target.value).then((response) => {
    //   setSubCategory(response.data.subcategory);
    // });
  };

  const renderCarouselImage = () => {
    let menuItems = [];
    for (let i = 0; i < imageProducts.length; i++) {
      menuItems.push(
        <CCarouselItem>
          <CImg
            src={MARKETPLACE_URL + imageProducts[i].images}
            className="d-block w-100"
          />
        </CCarouselItem>
      );
    }
    return menuItems;
  };

  const renderBeans = () => (
    <ul
      style={{
        listStyle: "none",
        marginLeft: "0px",
        padding: "0px",
      }}
    >
      {blendedBeans.map((beans, index) => {
        return (
          <li key={index}>
            <h4 style={{ marginTop: "20px" }}>Bean #{index + 1}</h4>
            <Fragment>
              <CFormGroup row>
                <CLabel col xs="5" htmlFor="selectBeanMultiple">
                  Batch ID
                </CLabel>
                <CLabel col xs="5" htmlFor="persentase">
                  Persentase
                </CLabel>
                <CCol xs="5">
                  <Field
                    className="textInput grosir"
                    name={`${index}.selectBean`}
                    component="select"
                    disabled
                  >
                    <option value="" selected disabled hidden>
                      {batch.map((value2) => {
                        if (value2.id == beans.batch_id) {
                          return value2.batch_id;
                        }
                      })}
                    </option>
                  </Field>
                </CCol>
                <CCol xs="5">
                  <Field
                    className="textInput grosir"
                    name={`${index}.persentase`}
                    component="input"
                    type="number"
                    placeholder={beans.persentase}
                    disabled
                  />
                </CCol>
                <CCol xs="2" style={{ margin: "auto" }}>
                  <span>%</span>
                </CCol>
              </CFormGroup>
            </Fragment>
          </li>
        );
      })}
    </ul>
  );

  return (
    <form onSubmit={handleSubmit}>
      <main className="c-main">
        <div className="container-fluid">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                  <h4 style={{ margin: "auto" }}>Product Detail</h4>
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
                  <CLabel htmlFor="nf-productID">
                    Product ID <small>*</small>
                  </CLabel>
                  <input
                    className="textInput grosir"
                    name="productID"
                    type="text"
                    disabled
                    defaultValue={product.id}
                  />
                </CFormGroup>
                {(() => {
                  if (product.batch_id != null) {
                    return (
                      <CFormGroup>
                        <CLabel htmlFor="nf-batch_id">
                          ID Batch <small>*</small>
                        </CLabel>
                        <input
                          className="textInput grosir"
                          name="productID"
                          type="text"
                          disabled
                          defaultValue={batchID}
                        />
                      </CFormGroup>
                    );
                  } else {
                    return <FieldArray name="beans" component={renderBeans} />;
                  }
                })()}

                <CFormGroup>
                  <CLabel htmlFor="nf-name">
                    Product Name <small>*</small>
                  </CLabel>
                  <Field
                    className="textInput grosir"
                    name="name"
                    component="input"
                    type="text"
                    disabled
                    placeholder={product.name}
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
                    disabled
                  >
                    <option value="-----">----</option>
                    {/* {productGroup &&
                      productGroup.map((value) => {
                        return (
                          <option key={value.id} value={value.id}>
                            {value.rule_name}
                          </option>
                        );
                      })} */}
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
                    disabled
                  >
                    <option value="-----">----</option>
                    {/* {category &&
                      category.map((value) => {
                        return (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        );
                      })} */}
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
                    disabled
                  >
                    <option value="-----">----</option>
                    {/* {subcategory &&
                      subcategory.map((value) => {
                        return (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        );
                      })} */}
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
                    placeholder={product.description}
                    disabled
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
                    placeholder={product.short_description}
                    disabled
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
                      placeholder={productVendor.price}
                      disabled
                    />
                  </CCol>
                  <CCol xs="6">
                    <Field
                      className="textInput grosir"
                      name="currency"
                      component="select"
                      disabled
                    >
                      <option value="" selected disabled hidden>
                        {currencies.map((value) => {
                          if (value.id == product.currency) {
                            return value.name + " - " + value.code;
                          }
                        })}
                      </option>
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
                    placeholder={productVendor.stock}
                    disabled
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
                    disabled
                  >
                    <option value="" selected disabled hidden>
                      {unit.map((value) => {
                        if (value.id == product.unit) {
                          return value.nama_unit;
                        }
                      })}
                    </option>
                  </Field>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-sku">SKU</CLabel>
                  <Field
                    className="textInput grosir"
                    name="sku"
                    component="input"
                    type="text"
                    placeholder={product.sku}
                    disabled
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
                      placeholder={product.weight}
                      disabled
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
                    type="text"
                    placeholder={product.tgl_produksi}
                    disabled
                  />
                </CFormGroup>
                <CRow>
                  <CCol xs="12" lg="6">
                    <CCard>
                      <CCardBody>
                        <CCarousel>
                          <CCarouselInner>
                            {renderCarouselImage()}
                          </CCarouselInner>
                          <CCarouselControl direction="prev" />
                          <CCarouselControl direction="next" />
                        </CCarousel>
                      </CCardBody>
                    </CCard>
                  </CCol>
                  <CCol xs="12" lg="6">
                    <CCard>
                      <CCardBody>
                        <CCarousel>
                          <CCarouselInner>
                            <CCarouselItem>
                              <CImg
                                src={MARKETPLACE_URL + product.thumbnail}
                                className="d-block w-100"
                              />
                            </CCarouselItem>
                          </CCarouselInner>
                          <CCarouselControl direction="prev" />
                          <CCarouselControl direction="next" />
                        </CCarousel>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </div>
      </main>
    </form>
  );
};

export default reduxForm({
  form: "showProduct", // a unique identifier for this form
})(ShowProdukForm);
