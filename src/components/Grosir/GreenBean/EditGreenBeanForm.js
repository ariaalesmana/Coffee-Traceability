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
  CNavLink,
} from "@coreui/react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import UserService from "../../../services/user.service";
// import MyGoogleMap from "../Supplier/Google Maps/MyGoogleMap";
import moment from 'moment';

const EditGreenBeanForm = (props) => {    
  
  const { handleSubmit, reset } = props;
  
  const [sku, setSKU] = useState([]);
  const [po, setPO] = useState([]);
  const [batch, setBatch] = useState([]);
  const [data, setData] = useState([]);
  const [farm, setFarm] = useState([]);
  const [detailFarm, setDetailFarm] = useState(null);
  const [lng, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [mapApiLoaded, setMapApiLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [mapApi, setMapApi] = useState(null);
  const [geoCoder, setGeoCoder] = useState(null);
  const [places, setPlaces] = useState([]);
  const [center, setCenter] = useState([]);
  const [zoom, setZoom] = useState(11);
  const [address, setAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const FarmChange = async (e) => {
    await UserService.getDetailSupplier(e.target.value).then((response) => {
      setDetailFarm(response.data.supplier);
      setLong(parseFloat(response.data.supplier.long));
      setLat(parseFloat(response.data.supplier.lat));
    });

  };

  const Wrapper = styled.main`
    width: 100%;
    height: 100%;
  `;

  const googleMap = () => {
    // const apiKey = 'AIzaSyC81o8Qoasn_E2FqMrqhmM-2IUlgAab2V4'
    const apiKey = 'AIzaSyCwO-uMs8PcFmBON8gqQAVK8EdX1NRUnOU' // api google punya akmal

    const defaultZoom = 12;
    const defaultCenter = { lat: parseFloat(lat), lng: parseFloat(lng) }
    const locations = [
      {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
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
          onClick={() => setIsOpen(!isOpen)} 
          position={location} 
          title={location.title} 
          label={location.label}
        >
          { isOpen &&
            <InfoWindow onCloseClick={() => setIsOpen(false)}>
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

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let id = props.greenbeanID;

    UserService.detailBatchGreenBean(id).then((response) => {
      console.log('cek response', response);
      setData(response.data.data)
      setSKU(response.data.sku)
      setPO(response.data.po)
      setFarm(response.data.farm)
      setBatch(response.data.batch)
      // setLong(parseFloat(response.data.batch.get_farm.long));
      // setLat(parseFloat(response.data.batch.get_farm.lat));
    });
  };

  // const markerHandle = (lat, long) => {
  //   props.onSelectLat(lat);
  //   props.onSelectLong(long);
  // };

  const setCurrentLocation = async () => {
    setLong(112.43025439999997);
    setLat(-1.2235008616709613);
  };

  useEffect(() => {
    setCurrentLocation();
  }, []);

  const customInputLat = () => {
    return (
      <div>
        <input
          className="textInput grosir"
          name="latitude"
          type="text"
          readOnly
          defaultValue={lat}
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
          readOnly
          defaultValue={lng}
        />
      </div>
    );
  };

  // let googleMap;
  // if (lat != '' && long != '') {
  //   googleMap = (
  //     <MyGoogleMap
  //       onMarkerHandle={markerHandle}
  //       latProps={lat}
  //       longProps={long}
  //     />
  //   );
  // } else {
  //   googleMap = <MyGoogleMap onMarkerHandle={markerHandle} />;
  // }


  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <main className="c-main">
          <div className="container-fluid">
            <CCard>
              <CCardHeader>
                <CRow>
                  <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                    <h4 style={{ margin: "auto" }}>Add Batch Green bean</h4>
                  </CCol>
                  <CCol>
                    <CButton
                      block
                      color="dark"
                      to="/listGreenBean"
                      style={{ backgroundColor: "#00c4cc" }}
                    >
                      <span style={{ color: "white" }}>X</span>
                    </CButton>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol md="6" lg="6" sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="nf-unit">
                        SKU Green Bean <small>*</small>
                      </CLabel>
                      <Field
                        className="textInput grosir"
                        name="sku"
                        component="select"
                        required={true}
                      >
                        <option value="">----</option>
                        {sku &&
                          sku.map((value) => {
                            return (
                              <option key={value.id} value={value.id}>
                                {value.sku} - {value.name}
                              </option>
                            );
                          })}
                      </Field>
                    </CFormGroup>
                  </CCol>
                  <CCol md="6" lg="6" sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="nf-unit">
                        Batch Number Green Bean <small>*</small>
                      </CLabel>
                      <Field
                          className="textInput grosir"
                          name="batch"
                          component="input"
                          type="text"
                          placeholder={data.batch_number}
                          required={true}
                        />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="6" lg="6" sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="nf-unit">
                        Harvesting Year <small>*</small>
                      </CLabel>
                      <Field
                        className="textInput grosir"
                        name="harvesting_year"
                        component="input"
                        type="month"
                        required={true}
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol md="6" lg="6" sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="nf-unit">
                        PO Number <small>*</small>
                      </CLabel>
                      <Field
                        className="textInput grosir"
                        name="po_number"
                        component="select"
                        required={true}
                      >
                        <option value="">----</option>
                        {po &&
                          po.map((value) => {
                            return (
                              <option key={value.id} value={value.id}>
                                {value.po_number} - {value.buyer_name}
                              </option>
                            );
                          })}
                      </Field>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <hr></hr>
                <CRow>
                  <CCol md="6" lg="6" sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="nf-unit">
                        Farm <small>*</small>
                      </CLabel>
                      <Field
                        className="textInput grosir"
                        name="farm"
                        component="select"
                        onChange={FarmChange}
                        required={true}
                      >
                        <option value="">----</option>
                        {farm &&
                          farm.map((value) => {
                            return (
                              <option key={value.id} value={value.id}>
                                {value.nama_supplier} - {value.lokasi_supplier}
                              </option>
                            );
                          })}
                      </Field>
                    </CFormGroup>
                  </CCol>
                  <CCol md="6" lg="6" sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="nf-unit">
                        Elevation <small>*</small>
                      </CLabel>
                      <input
                        className="textInput grosir"
                        name="elevation"
                        component="input"
                        type="text"
                        placeholder="max 20 word"
                        readOnly
                        defaultValue={detailFarm && detailFarm.elevation ? detailFarm.elevation : ''}
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="6" lg="6" sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="nf-unit">
                        Country Of Origin <small>(default)</small>
                      </CLabel>
                      <Field
                        className="textInput grosir"
                        name="country_origin"
                        component="input"
                        type="text"
                        defaultValue="Indonesia"
                        placeholder="Indonesia"
                        readOnly
                      />
                    </CFormGroup>
                  </CCol>
                  <CCol md="6" lg="6" sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="nf-unit">
                        Area Of Origin <small>*</small>
                      </CLabel>
                      <input
                        className="textInput grosir"
                        name="area_origin"
                        component="input"
                        type="text"
                        placeholder="max 20 word"
                        readOnly
                        value={detailFarm && detailFarm.lokasi_supplier ? detailFarm.lokasi_supplier : ''}
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="12" lg="12" sm="12">
                    <CFormGroup>
                      <CLabel htmlFor="nf-unit">
                        Link Google Map Location <small>*</small>
                      </CLabel>
                      <input
                          className="textInput grosir"
                          name="link_gmaps"
                          component="input"
                          type="text"
                          readOnly
                          value={detailFarm && detailFarm.link_maps ? detailFarm.link_maps : ''}
                        />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="nf-kebun">Map</CLabel>
                      {/* <div style={{width: "100%", height: "500px"}}>{googleMap}</div> */}
                      <div style={{width: "100%", height: "500px"}}>{googleMap()}</div>
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
                          disabled
                        />
                      </CCol>
                      <CCol xs="6">
                        <Field
                          className="textInput grosir"
                          name="longitude"
                          component={customInputLong}
                          type="text"
                          disabled
                        />
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <hr></hr>
                <CRow>
                  <CCol md="6" lg="6" sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="nf-unit">
                        Species <small>*</small>
                      </CLabel>
                      <Field
                        className="textInput grosir"
                        name="species"
                        component="select"
                        required={true}
                      >
                        <option value="">----</option>
                        <option value="Arabica">Arabica</option>
                        <option value="Robusta">Robusta</option>
                        <option value="Liberica">Liberica</option>
                      </Field>
                    </CFormGroup>
                  </CCol>
                  <CCol md="6" lg="6" sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="nf-unit">
                        Variety <small>*</small>
                      </CLabel>
                      <Field
                          className="textInput grosir"
                          name="variety"
                          component="input"
                          type="text"
                          placeholder={data.variety}
                          required={true}
                        />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="6" lg="6" sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="nf-unit">
                        Process <small>*</small>
                      </CLabel>
                      <Field
                          className="textInput grosir"
                          name="process"
                          component="input"
                          type="text"
                          placeholder={data.process}
                          required={true}
                        />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md="6" lg="6" sm="6">
                    <CLabel htmlFor="nf-unit">
                      Volume Order In Grams <small>*</small>
                    </CLabel>
                    <CFormGroup row>
                      <CCol md="10" lg="10" sm="10">
                        <Field
                          className="textInput grosir"
                          name="volume_order"
                          component="input"
                          type="number"
                          min={0}
                          required={true}
                          placeholder={data.volume_order}
                        />
                      </CCol>
                      <CCol md="2" lg="2" sm="2" style={{ margin: "auto" }}>
                      <span>Grams</span>
                      </CCol>
                    </CFormGroup>
                  </CCol>
                </CRow>
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
  form: "editGreenBean", // a unique identifier for this form
})(EditGreenBeanForm);
