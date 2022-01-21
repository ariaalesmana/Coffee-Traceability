import { Fragment, React, Component } from "react";
import UserService from "../../../services/user.service";
import {
  CImg,
  CCard,
  CCardBody,
  CCol,
  CCarousel,
  CCarouselInner,
  CCarouselItem,
  CCarouselControl,
  CRow,
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
import moment from 'moment';

require("dotenv").config();

const MARKETPLACE_URL = process.env.REACT_APP_CATALOG_URL;

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

export default class ScanQRGreenBean extends Component {
    constructor(props) {
        super(props);

        this.state = {
        batch_id: 0,
        //   code: "",
        product_id: 0,
        data: null,
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
        geoCoder: null,
        places: [],
        center: [],
        zoom: 11,
        address: "",
        // draggable: true,
        lat: null,
        lng: null,
        isOpen: false,
        };
    }

    async componentDidMount() {
        console.log('test');
        let batchId = this.props.batchId;
        this.setState({ batch_id: batchId });

        let kode = this.props.code;
        this.setState({ code: kode });

        await UserService.getDetailBatchGuestQR(kode, batchId).then((response) => {
            console.log('cek response', response);

            this.setState({
                data: response.data.batch,
                po: response.data.batch.get_p_o,
                sku: response.data.batch.get_s_k_u,
                farm: response.data.batch.get_farm,
                lat: response.data.batch.get_farm.lat,
                lng: response.data.batch.get_farm.long,
            })
        });
    }

  renderMyMaps = () => {
    const { places, mapApiLoaded, mapInstance, mapApi } = this.state;

    // const apiKey = 'AIzaSyC81o8Qoasn_E2FqMrqhmM-2IUlgAab2V4'
    const apiKey = 'AIzaSyCwO-uMs8PcFmBON8gqQAVK8EdX1NRUnOU' // api google punya akmal

    const defaultZoom = 11;
    const defaultCenter = { lat: parseFloat(this.state.lat), lng: parseFloat(this.state.lng) }
    const locations = [
      {
        lat: parseFloat(this.state.lat),
        lng: parseFloat(this.state.lng),
        draggable: false,
        title: this.state.address,
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
          onClick={() => this.setState({isOpen: !this.state.isOpen})} 
          position={location} 
          title={location.title} 
          label={location.label}
        >
          { this.state.isOpen &&
            <InfoWindow onCloseClick={() => this.setState({isOpen: false})}>
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

  renderDetailBatch = () => {
    if (this.state.data) {
      return (
        <Fragment>

          {/* data green bean */}
          <CRow>
            <CCol xs="2" lg="5">
              <h1
                style={{
                  transform: "rotate(180deg)",
                  transformOrigin: "20% 100%",
                  writingMode: "vertical-lr",
                  color: "darkOrange",
                  textAlign: "center",
                }}
              >
                <strong>Green Bean</strong>
              </h1>
            </CCol>

            <CCol xs="10" lg="7">
              <Fragment>
                <p>
                  <strong>SKU Green Bean:</strong> {this.state.sku.sku} - {this.state.sku.name}
                </p>
                <p>
                  <strong>Batch Number:</strong> {this.state.data.batch_number}
                </p>
                <p>
                  <strong>Country Of Origin:</strong> {this.state.data.country_origin}
                </p>
                <p>
                  <strong>Area Of Origin:</strong> {this.state.farm.lokasi_supplier}
                </p>
                <p>
                  <strong>Farm:</strong> {this.state.farm.nama_supplier} - {this.state.farm.nama_petani}
                </p>
                <p>
                  <strong>Elevation:</strong> {this.state.farm.elevation} MASL
                </p>
                <p>
                  <strong>Harvesting Year:</strong> {moment(this.state.data.harvesting_year).format('MMM-YYYY')}
                </p>
                <p>
                  <strong>Species:</strong> {this.state.data.species}
                </p>
                <p>
                  <strong>Variety:</strong> {this.state.data.variety}
                </p>
                <p>
                  <strong>Process:</strong> {this.state.data.process}
                </p>
                <p>
                  <strong>Google Map Location:</strong> <a style={{color: "white"}} target="_blank" href={this.state.farm.link_maps ? this.state.farm.link_maps : '#'}>{this.state.farm.link_maps ? this.state.farm.link_maps : '-'}</a>
                </p>
                <div style={{width: "100%", height: "400px" }}>
                    {this.renderMyMaps()}
                </div>
                <p></p>
                <p>
                  <strong>Volume Order In Grams:</strong> {this.state.data.volume_order} Grams
                </p>
              </Fragment>

              <hr
                style={{
                  marginTop: "60px",
                  color: "#178d88",
                  backgroundColor: "#178d88",
                  height: 2,
                }}
              />
            </CCol>
          </CRow>
          {/* end data green bean */}

          
          {(() => {
              if(this.state.data.qrcode) {
                return(
                    <CRow style={{ marginTop: "40px" }}>
                        <CCol xs="2" lg="5">
                        <h1
                            style={{
                            transform: "rotate(180deg)",
                            transformOrigin: "20% 55%",
                            writingMode: "vertical-lr",
                            color: "darkOrange",
                            textAlign: "center",
                            }}
                        >
                            <strong>QR CODE</strong>
                        </h1>
                        </CCol>

                        <CCol xs="10" lg="7">
                        <CCol xs="12" lg="7">
                            <CImg
                                src={MARKETPLACE_URL + this.state.data.qrcode}
                                className="d-block w-100"
                                alt={this.state.data.id}
                            />
                        </CCol>

                        <hr
                            style={{
                            marginTop: "60px",
                            color: "#178d88",
                            backgroundColor: "#178d88",
                            height: 2,
                            }}
                        />
                        </CCol>
                    </CRow>
                )
              }
          })()}

        </Fragment>
      );
    } else {
      return (
        <div style={{ textAlign: "center" }}>
          <h4>Product Not Found...</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <Fragment>
        <main className="c-main">
          <div className="container-fluid">
            <CCard style={{ backgroundColor: "grey", color: "white" }}>
              <CCardBody style={{ padding: "5%" }}>
                {this.renderDetailBatch()}
              </CCardBody>
            </CCard>
          </div>
        </main>
      </Fragment>
    );
  }
}
