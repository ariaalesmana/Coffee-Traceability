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
import MyGoogleMap from "./Google Maps/MyGoogleMap";

const EditSupplierForm = (props) => {
  const { handleSubmit, reset } = props;

  const onFileChange = (e) => {
    const file = e.target.files[0];
    props.onSelectImage(file);
  };

  const [namaSupplier, setNama] = useState("");
  const [lokasiSupplier, setLokasi] = useState("");
  const [namaPetani, setNamaPetani] = useState("");
  const [estimatedProduction, setEstimatedProduction] = useState("");
  const [elevation, setElevation] = useState("");
  const [supplierUnit, setSupplierUnit] = useState("");

  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [unit, setUnit] = useState([]);

  const markerHandle = (lat, long) => {
    setLong(long);
    setLat(lat);
    props.onSelectLat(lat);
    props.onSelectLong(long);
  };

  const getUnit = async () => {
    UserService.getListMasterData().then((response) => {
      setUnit(response.data.unit);
    });
  };

  useEffect(() => {
    getData();
    getUnit();
  }, []);

  const getData = async () => {
    let id = props.supplierID;
    UserService.getDetailSupplierRoaster(id).then((response) => {
      setNama(response.data.supplier.nama_supplier);
      setLokasi(response.data.supplier.lokasi_supplier);
      setNamaPetani(response.data.supplier.nama_petani);
      setEstimatedProduction(response.data.supplier.estimated_production);
      setLat(response.data.supplier.lat);
      setLong(response.data.supplier.long);
      setSupplierUnit(response.data.supplier.unit);
      setElevation(response.data.supplier.elevation);
    });
  };

  const customInputLat = () => {
    return (
      <div>
        <input
          className="textInput grosir"
          name="latitude"
          type="text"
          defaultValue={lat}
          disabled
        />
      </div>
    );
  };

  const customInputLong = () => {
    return (
      <div>
        <input
          className="textInput grosir"
          name="longitude"
          type="text"
          defaultValue={long}
          disabled
        />
      </div>
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
                  <h4 style={{ margin: "auto" }}>Edit Origin</h4>
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
                  <CLabel htmlFor="nf-namaSupplier">Processor Name</CLabel>
                  <Field
                    className="textInput grosir"
                    name="nama_supplier"
                    component="input"
                    type="text"
                    placeholder={namaSupplier}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-lokasiSupplier">Processor Origin</CLabel>
                  <Field
                    className="textInput grosir"
                    name="lokasi_supplier"
                    component="input"
                    type="text"
                    placeholder={lokasiSupplier}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-kebun">Farm</CLabel>
                  <div className="main-wrapper">
                    <MyGoogleMap
                      onMarkerHandle={markerHandle}
                      latProps={lat}
                      longProps={long}
                    />
                  </div>
                </CFormGroup>
                <CFormGroup row>
                  <CLabel col xs="6" htmlFor="nf-latitude">
                    Latitude
                  </CLabel>
                  <CLabel col xs="6" htmlFor="nf-longitude">
                    Longitute
                  </CLabel>
                  <CCol xs="6">
                    <Field
                      className="textInput grosir"
                      name="longitude"
                      component={customInputLat}
                      type="text"
                    />
                  </CCol>
                  <CCol xs="6">
                    <Field
                      className="textInput grosir"
                      name="longitude"
                      component={customInputLong}
                      type="text"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CLabel col xs="6" htmlFor="nf-elevation">
                    Elevation
                  </CLabel>
                  <CLabel col xs="6" htmlFor="nf-unit">
                    Unit
                  </CLabel>
                  <CCol xs="6">
                    <Field
                      className="textInput grosir"
                      name="elevation"
                      component="input"
                      type="text"
                      placeholder={elevation}
                    />
                  </CCol>
                  <CCol xs="6">
                    <Field
                      className="textInput grosir"
                      name="unit"
                      component="select"
                    >
                      <option value="" selected disabled hidden>
                        {unit.map((value) => {
                          if (value.id == supplierUnit) {
                            return value.nama_unit;
                          }
                        })}
                      </option>
                      {unit &&
                        unit.map((value) => {
                          return (
                            <option key={value.id} value={value.id}>
                              {value.nama_unit}
                            </option>
                          );
                        })}
                    </Field>
                  </CCol>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-namaPetani">Farmer Name</CLabel>
                  <Field
                    className="textInput grosir"
                    name="nama_petani"
                    component="input"
                    type="text"
                    placeholder={namaPetani}
                  />
                </CFormGroup>
                <CFormGroup row>
                  <CLabel col xs="12" htmlFor="nf-estimatedProduction">
                    Estimated Production
                  </CLabel>
                  <CCol xs="10">
                    <Field
                      className="textInput grosir"
                      name="estimatedProduction"
                      component="input"
                      type="number"
                      placeholder={estimatedProduction}
                    />
                  </CCol>
                  <CCol xs="2" style={{ margin: "auto" }}>
                    <span>Ton</span>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CLabel col xs="12" htmlFor="file-gambarPetani">
                    Farmer Image
                  </CLabel>
                  <CCol xs="12">
                    <CInputFile
                      id="file-input"
                      name="gambar_petani"
                      type="file"
                      onChange={onFileChange}
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
              </CButton>
            </CCardFooter>
          </CCard>
        </div>
      </main>
    </form>
  );
};

export default reduxForm({
  form: "editSupplier", // a unique identifier for this form
})(EditSupplierForm);
