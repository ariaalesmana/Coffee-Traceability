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
  CImg,
  CNavLink,
} from "@coreui/react";
import UserService from "../../../services/user.service";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'
import styled from "styled-components";
import GoogleMapReact from "google-map-react";

const ShowSupplierForm = (props) => {
  const { handleSubmit, reset } = props;

  const onFileChange = (e) => {
    const file = e.target.files[0];
    props.onSelectImage(file);
  };

  const Wrapper = styled.main`
    width: 100%;
    height: 100%;
  `;

  const [namaSupplier, setNama] = useState("");
  const [lokasiSupplier, setLokasi] = useState("");
  const [namaPetani, setNamaPetani] = useState("");
  const [estimatedProduction, setEstimatedProduction] = useState("");
  const [elevation, setElevation] = useState("");
  const [supplierUnit, setSupplierUnit] = useState("");
  const [farmerImg, setFarmerImg] = useState("");

  const [mapApiLoaded, setmapApiLoaded] = useState(false);
  const [mapInstance, setmapInstance] = useState(null);
  const [mapApi, setmapApi] = useState(null);
  const [geoCoder, setgeoCoder] = useState(null);
  const [places, setplaces] = useState([]);
  const [center, setcenter] = useState([]);
  const [zoom, setzoom] = useState(11);
  const [address, setaddress] = useState("");
  const [isOpen, setisOpen] = useState(false);

  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [linkMaps, setLinkMaps] = useState("");
  const [unit, setUnit] = useState([]);

  useEffect(() => {
    getData();
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
      setFarmerImg(response.data.supplier.gambar_petani);
    });
  };

  const renderMyMaps = () => {
    // const apiKey = 'AIzaSyC81o8Qoasn_E2FqMrqhmM-2IUlgAab2V4'
    const apiKey = 'AIzaSyCwO-uMs8PcFmBON8gqQAVK8EdX1NRUnOU' // api google punya akmal

    const defaultZoom = 11;
    const defaultCenter = { lat: parseFloat(lat), lng: parseFloat(long) }
    const locations = [
      {
        lat: parseFloat(lat),
        lng: parseFloat(long),
        draggable: false,
        title: address,
      },
    ]

    const MarkerList = () => {
      return locations.map((location, index) => {
        return (
          <MarkerWithInfoWindow key={index.toString()} location={location}/>
        )
      })
    }

    const MarkerWithInfoWindow = ({location}) => {
      // const [isOpen, setIsOpen] = React.useState(false)

      return (
        <Marker 
          onClick={() => setisOpen(!isOpen)}
          position={location} 
          title={location.title} 
          label={location.label}
        >
          { isOpen &&
            <InfoWindow onCloseClick={() => setisOpen(false)}>
              <CNavLink href={location.www} target="_blank">{location.title}</CNavLink>
            </InfoWindow>
          }
        </Marker>
      )
    }

    const GoogleMapsComponent = withScriptjs(withGoogleMap(() => {
        return (
          <GoogleMap defaultZoom={defaultZoom} defaultCenter={defaultCenter}>
            {<MarkerList locations={locations}/>}
          </GoogleMap>
        )
      }
    ))

    return (
      <Wrapper>
        <GoogleMapsComponent
          key="map"
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
          loadingElement={<div style={{height: `100%`}}/>}
          containerElement={<div style={{height: `400px`}}/>}
          mapElement={<div style={{height: `100%`}}/>}
        />
      </Wrapper>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <main className="c-main">
        <div className="container-fluid">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                  <h4 style={{ margin: "auto" }}>Show Coffee Origin</h4>
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
                <input
                  className="textInput grosir"
                  name="nama_supplier"
                  component="input"
                  type="text"
                  defaultValue={namaSupplier}
                  disabled
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-lokasiSupplier">Processor Origin</CLabel>
                <input
                  className="textInput grosir"
                  name="lokasi_supplier"
                  component="input"
                  type="text"
                  defaultValue={lokasiSupplier}
                  disabled
                />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-kebun">Farm</CLabel>
                {/* <div style={{width: "100%", height: "500px"}}>{googleMap}</div> */}
                <div style={{width: "100%", height: "400px" }}>
                    {renderMyMaps()}
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
                  <input
                    className="textInput grosir"
                    name="latitude"
                    component="input"
                    type="text"
                    value={lat}
                    onChange={(lat) => setLat(lat.currentTarget.value)}
                    disabled
                  />
                </CCol>
                <CCol xs="6">
                  <input
                    className="textInput grosir"
                    name="longitude"
                    component="input"
                    type="text"
                    value={long}
                    onChange={(lng) => setLong(lng.currentTarget.value)}
                    disabled
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-lokasiSupplier">Link Maps (optional)</CLabel>
                <input
                  className="textInput grosir"
                  name="linkMaps"
                  component="input"
                  type="text"
                  defaultValue={linkMaps}
                  disabled
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
                  <input
                    className="textInput grosir"
                    name="elevation"
                    component="input"
                    type="text"
                    defaultValue={elevation}
                    disabled
                  />
                </CCol>
                <CCol xs="6">
                  <input
                    className="textInput grosir"
                    name="unit"
                    component="input"
                    defaultValue={supplierUnit}
                    disabled
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-namaPetani">Farmer Name</CLabel>
                <input
                  className="textInput grosir"
                  name="nama_petani"
                  component="input"
                  type="text"
                  defaultValue={namaPetani}
                  disabled
                />
              </CFormGroup>
              <CFormGroup row>
                <CLabel col xs="12" htmlFor="nf-estimatedProduction">
                  Estimated Production
                </CLabel>
                <CCol xs="10">
                  <input
                    className="textInput grosir"
                    name="estimatedProduction"
                    component="input"
                    type="number"
                    defaultValue={estimatedProduction}
                    disabled
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
                <CCol xs="12" style={{textAlign:'center'}}>
                  <CImg
                    src={process.env.REACT_APP_CATALOG_URL + farmerImg}
                    // className="d-block w-100"
                    style={{width:"300px", height:"300px"}}
                  />
                </CCol>
              </CFormGroup>
            </CCardBody>
          </CCard>
        </div>
      </main>
    </form>
  );
};

export default reduxForm({
  form: "showSupplier", // a unique identifier for this form
})(ShowSupplierForm);
