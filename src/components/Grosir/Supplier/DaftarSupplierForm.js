import { React, useState, useEffect } from "react";
import { Field, reduxForm, change } from "redux-form";
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
import MyGoogleMap from "./Google Maps/MyGoogleMap";
import UserService from "../../../services/user.service";

const DaftarSupplierForm = (props) => {
  const { handleSubmit, reset } = props;

  const [lokasi_long, setLongitude] = useState(null);
  const [lokasi_lat, setLatitude] = useState(null);
  const [link, setlink] = useState('');
  const [unit, setUnit] = useState([]);

  // const GetLinkLokasi = (value) => {
  //   if(value && value != ''){
  //     console.log('cek value link', value.target.value);
  //     let val = value.target.value;
  //     // var URL =  "https://www.google.com/maps/search/maps/@-6.2226989,106.9904117,18.5z";

  //     var URL =  val;

  //     setlink(URL);

  //     var splitUrl = URL.split('!3d');
  //     var latLong = splitUrl[splitUrl.length-1].split('!4d');
  //     var longitude;

  //     if (latLong.indexOf('?') !== -1) {
  //         longitude = latLong[1].split('\\?')[0];
  //     } else {
  //         longitude = latLong[1];
  //     }
  //     var latitude = latLong[0];

  //     setLat(latitude);
  //     setLong(longitude);

  //     console.log('cek latitude',latitude);
  //     console.log('cek longitud',longitude);

  //     markerHandle(latitude, longitude);
  //   }
  // }

  // const getLink = (link) => {
  //   console.log(link);
  // }

  const markerHandle = (lat, long) => {
    setLongitude(long);
    setLatitude(lat);
    props.onSelectLat(lat);
    props.onSelectLong(long);
  };

  const getUnit = async () => {
    UserService.getUnitDetail().then((response) => {
      setUnit(response.data.unit);
    });
  };

  // const setCurrentLocation = () => {
  //   setLatitude(-1.2235008616709613);
  //   setLongitude(112.43025439999997);
  // };

  useEffect(() => {
    // setCurrentLocation();
    getUnit();
  }, []);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    props.onSelectImage(file);
  };

  // const customInputLat = () => {
  //   return (
  //     <div>
  //       <input
  //         className="textInput grosir"
  //         name="latitude"
  //         type="text"
  //         disabled
  //         defaultValue={lat}
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
  //         defaultValue={long}
  //         required={true}
  //       />
  //     </div>
  //   );
  // };

  let googleMap;
  googleMap = (
    <MyGoogleMap
      onMarkerHandle={markerHandle}
      longProps={lokasi_long}
      latProps={lokasi_lat}
    />
  );

  return (
    <form onSubmit={handleSubmit}>
      <main className="c-main">
        <div className="container-fluid">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                  <h4 style={{ margin: "auto" }}>Add Coffee Origin</h4>
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
                  required={true}
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-lokasiSupplier">Area Of Origin</CLabel>
                <Field
                  className="textInput grosir"
                  name="lokasi_supplier"
                  component="input"
                  type="text"
                  required={true}
                />
              </CFormGroup>
              {/* <CFormGroup>
                <CLabel htmlFor="nf-kebun">Location</CLabel>
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
                    value={lokasi_lat}
                    onChange={(lat) => setLatitude(lat.currentTarget.value)}
                    required={true}
                  />
                </CCol>
                <CCol xs="6">
                  <Field
                    className="textInput grosir"
                    name="longitude"
                    component="input"
                    type="text"
                    value={lokasi_long}
                    onChange={(lng) => setLongitude(lng.currentTarget.value)}
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
                    min={0}
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
                    <option value="" selected disabled hidden>
                      ----
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
                {/* <CLabel htmlFor="nf-namaPetani">Farmer Name</CLabel> */}
                <CLabel htmlFor="nf-namaPetani">Farm</CLabel>
                <Field
                  className="textInput grosir"
                  name="nama_petani"
                  component="input"
                  type="text"
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
  form: "daftarSupplier", // a unique identifier for this form
})(DaftarSupplierForm);
