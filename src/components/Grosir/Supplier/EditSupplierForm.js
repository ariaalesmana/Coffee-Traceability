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
import UserService from "../../../services/user.service";
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
  const [linkMaps, setLinkMaps] = useState("");
  const [unit, setUnit] = useState([]);

  const markerHandle = (lat, long) => {
    setLong(long);
    setLat(lat);
    props.onSelectLat(lat);
    props.onSelectLong(long);
  };

  useEffect(() => {
    getData();
    getUnit();
  }, []);

  const getData = () => {
    let id = props.supplierID;
    UserService.getDetailSupplier(id).then((response) => {
      setNama(response.data.supplier.nama_supplier);
      setLokasi(response.data.supplier.lokasi_supplier);
      setNamaPetani(response.data.supplier.nama_petani);
      setEstimatedProduction(response.data.supplier.estimated_production);
      setLat(response.data.supplier.lat);
      setLong(response.data.supplier.long);
      setLinkMaps(response.data.supplier.link_maps);
      setSupplierUnit(response.data.unit.nama_unit);
      setElevation(response.data.supplier.elevation);
    });
  };

  const getUnit = () => {
    UserService.getUnitDetail().then((response) => {
      setUnit(response.data.unit);
    });
  };

  // const customInputLat = () => {
  //   return (
  //     <div>
  //       <input
  //         className="textInput grosir"
  //         name="latitude"
  //         type="text"
  //         disabled
  //         placeholder={lat}
  //         required={true}
  //       />
  //     </div>
  //   );
  // };

  // const customInputLong = () => {
  //   return (
  //     <div>
  //       <input
  //         className="textInput grosir"
  //         name="longitude"
  //         type="text"
  //         disabled
  //         placeholder={long}
  //         required={true}
  //       />
  //     </div>
  //   );
  // };

  let googleMap;
  if (lat != NaN && long != NaN) {
    googleMap = (
      <MyGoogleMap
        onMarkerHandle={markerHandle}
        latProps={lat}
        longProps={long}
      />
    );
  } else {
    googleMap = <MyGoogleMap onMarkerHandle={markerHandle} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <main className="c-main">
        <div className="container-fluid">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                  <h4 style={{ margin: "auto" }}>Edit Coffee Origin</h4>
                </CCol>
                <CCol>
                  <CButton
                    block
                    color="dark"
                    to="/listSupplier"
                    style={{ backgroundColor: "#00c4cc" }}
                  >
                    <span style={{ color: "white" }}>X</span>
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="nf-namaSupplier">Processor Name</CLabel>
                <Field
                  className="textInput grosir"
                  name="nama_supplier"
                  component="input"
                  type="text"
                  placeholder={namaSupplier}
                  required={true}
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
                  required={true}
                />
              </CFormGroup>
              {/* <CFormGroup>
                <CLabel htmlFor="nf-kebun">Farm</CLabel>
                <div style={{width: "100%", height: "500px"}}>{googleMap}</div>
              </CFormGroup> */}
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
                    name="latitude"
                    component="input"
                    type="text"
                    placeholder={lat}
                    // value={lat}
                    onChange={(lat) => setLat(lat.currentTarget.value)}
                    required={true}
                  />
                </CCol>
                <CCol xs="6">
                  <Field
                    className="textInput grosir"
                    name="longitude"
                    component="input"
                    type="text"
                    // value={long}
                    placeholder={long}
                    onChange={(lng) => setLong(lng.currentTarget.value)}
                    required={true}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-lokasiSupplier">Link Maps (optional)</CLabel>
                <Field
                  className="textInput grosir"
                  name="linkMaps"
                  component="input"
                  type="text"
                  placeholder={linkMaps}
                  // onChange={GetLinkLokasi}
                />
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
                    // type="text"
                    type="number"
                    placeholder={elevation}
                    required={true}
                  />
                </CCol>
                <CCol xs="6">
                  <Field
                    className="textInput grosir"
                    name="unit"
                    component="select"
                    required={true}
                  >
                    <option value="" selected hidden>----</option>
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
                  required={true}
                />
              </CFormGroup>
              {/* <CFormGroup row>
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
                    required={true}
                  />
                </CCol>
                <CCol xs="2" style={{ margin: "auto" }}>
                  <span>Ton</span>
                </CCol>
              </CFormGroup> */}
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
                    required={true}
                  />
                </CCol>
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
  form: "editSupplier", // a unique identifier for this form
})(EditSupplierForm);
