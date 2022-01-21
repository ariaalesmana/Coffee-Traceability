import { Fragment, React, Component } from "react";
import UserService from "../../../../../services/user.service";
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
require("dotenv").config();

const MARKETPLACE_URL = process.env.REACT_APP_CATALOG_URL;

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

export default class CuppingScanDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cupping_id: 0,
      product_id: 0,
      code: "",
      cupping: null,
      product: [],
      batch: [],
      harvestImage: [],
      certificateBatch: null,
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
        let id = this.props.CuppingId;
        this.setState({ cupping_id: id });

        let code = this.props.code;
        this.setState({
        code: code,
        });

        await UserService.getDetailCuppingGuest(code, id).then((response) => {
            console.log("cek response cupping", response);
            this.setState({
                cupping: response.data.cupping,
                certificatecupping: response.data.cuppingCertificate,
                product: response.data.produk[0],
                batch: response.data.batch[0],
                lat: response.data.batch[0].supplier.lat,
                lng: response.data.batch[0].supplier.long,
            })
        });
    }

  renderCarouselImage = () => {
    let menuItems = [];
    if (this.state.harvestImage != null) {
      if (this.state.harvestImage.length >= 1) {
        this.state.harvestImage &&
          this.state.harvestImage.map((value2) => {
            if (value2.length > 1) {
              for (let i = 0; i < value2.length; i++) {
                menuItems.push(
                  <CCarouselItem>
                    <CImg
                      src={MARKETPLACE_URL + value2[i].images}
                      className="d-block w-100"
                    />
                  </CCarouselItem>
                );
              }
            } else if (value2.length == 1) {
              menuItems.push(
                <CCarouselItem>
                  <CImg
                    src={MARKETPLACE_URL + value2[0].images}
                    className="d-block w-100"
                  />
                </CCarouselItem>
              );
            } else {
              menuItems.push(
                <CCarouselItem>
                  <CImg
                    src={MARKETPLACE_URL + value2.images}
                    className="d-block w-100"
                  />
                </CCarouselItem>
              );
            }
          });
      }
    }
    return menuItems;
  };

  renderCuppingCertificate = () => {
    let menuItems = [];

    if (this.state.certificatecupping) {
      for (let i = 0; i < this.state.certificatecupping.length; i++) {
        let filename = MARKETPLACE_URL + this.state.certificatecupping[i].certificates;

        if(filename.split('.').pop() === 'jpg' || filename.split('.').pop() === 'png' || filename.split('.').pop() === 'jpeg') {
          menuItems.push(
            // <CCarouselItem>
              <CImg
                src={
                  MARKETPLACE_URL + this.state.certificatecupping[i].certificates
                }
                className="d-block w-100"
              />
            // </CCarouselItem>
          );
        }
        else {
          menuItems.push(
            <div class="iframe-container">
              <iframe class="responsive-iframe" src={
                  MARKETPLACE_URL + this.state.certificatecupping[i].certificates
                }
              >
              </iframe>
              <p>{" "}</p>
            </div>
          );
        }
      }
    }

    if (this.state.certificatecupping) {
      return menuItems;
    }
  };

  renderBatchCertificate = () => {
    let menuItems = [];
    if (this.state.certificateBatch) {
      for (let i = 0; i < this.state.certificateBatch.length; i++) {
        menuItems.push(
          <CCarouselItem>
            <CImg
              src={
                MARKETPLACE_URL + this.state.certificateBatch[i].certificates
              }
              className="d-block w-100"
            />
          </CCarouselItem>
        );
      }
    }

    if (this.state.certificateBatch) {
      return menuItems;
    }
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

  renderDetailCupping = () => {
      console.log('cek cupping 2', this.state.cupping);
    if (this.state.cupping) {
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
                  <strong>SKU:</strong> {this.state.product.sku}
                </p>
                <p>
                  <strong>Batch Number:</strong> {this.state.batch.batch_id}
                </p>
                <p>
                  <strong>Country Of Origin:</strong> Indonesia
                </p>
                <p>
                  <strong>Origin:</strong> {this.state.batch.supplier.lokasi_supplier}
                </p>
                <p>
                  <strong>Farm:</strong> {this.state.batch.supplier.nama_supplier}
                </p>
                <p>
                  <strong>Elevation:</strong> {this.state.batch.supplier.elevation}
                </p>
                <p>
                  <strong>Harvesting Year:</strong> {this.state.batch.tgl_panen}
                </p>
                <p>
                  <strong>Variety:</strong> {this.state.batch.jenis.deskripsi_jenis}
                </p>
                <p>
                  <strong>Process:</strong> {this.state.batch.proses.deskripsi_proses}
                </p>
                <p>
                  <strong>Moisture:</strong> {this.state.batch.moisture}
                </p>
                <p>
                  <strong>Google Map Location:</strong> <a style={{color: "white"}} target="_blank" href={this.state.batch.supplier.link_maps ? this.state.batch.supplier.link_maps : '#'}>{this.state.batch.supplier.link_maps ? this.state.batch.supplier.link_maps : '-'}</a>
                </p>
                  <div style={{width: "100%", height: "400px" }}>
                    {this.renderMyMaps()}
                  </div>
                  <p></p>
                <p>
                {/* <p>
                  <strong>Maps Link:</strong> <a style={{color: "white"}} target="_blank" href={this.state.batch.supplier.link_maps ? this.state.batch.supplier.link_maps : '#'}>{this.state.batch.supplier.link_maps ? this.state.batch.supplier.link_maps : '-'}</a>
                </p> */}
                  <strong>Story Telling:</strong> {this.state.batch.storytelling}
                </p>
                <p>
                  <strong>Photo and Video Culture:</strong> {" "}
                </p>
                <div class="iframe-container">
                  <iframe class="responsive-iframe"
                    // src={this.state.batch.video_culture}>
                    src={this.state.batch.video_culture.replace("watch?v=", "embed/")}>
                  </iframe>
                  <p>{" "}</p>
                </div>
                <p>
                  <strong>Process Photos:</strong> {" "}
                  <CImg
                    src={MARKETPLACE_URL + this.state.product.thumbnail}
                    className="d-block w-100"
                  />
                </p>
                <p>
                  <strong>Volume:</strong> {this.state.batch.volume}
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


          {/* data cupping */}
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
                <strong>Cupping</strong>
              </h1>
            </CCol>

            <CCol xs="10" lg="7">
              <Fragment>
                <p>
                  <strong>Curated Date:</strong> {this.state.cupping.curated_date}
                </p>
                <p>
                  <strong>Curated By:</strong> {this.state.cupping.curated_by}
                </p>
                <p>
                  <strong>Fragrance / Aroma:</strong> {this.state.cupping.fragrance_aroma}
                </p>
                <p>
                  <strong>Flavor:</strong> {this.state.cupping.flavor}
                </p>
                <p>
                  <strong>Aftertaste:</strong> {this.state.cupping.aftertaste}
                </p>
                <p>
                  <strong>Acidity:</strong> {this.state.cupping.acidity}
                </p>
                <p>
                  <strong>Body:</strong> {this.state.cupping.body}
                </p>
                <p>
                  <strong>Cupping Score:</strong> {this.state.cupping.cupping_score}
                </p>
                <p>
                  <strong>Category (options):</strong> {this.state.cupping.category}
                </p>
                <p>
                  <strong>Cupping Certificates:</strong> {" "}
                </p>
                {this.renderCuppingCertificate()}
                {/* <CCol xs="10" lg="7">
                  <CCol xs="12" lg="7">
                    <CCard>
                      <CCardBody>
                        <CCarousel>
                          <CCarouselInner>
                            {this.renderCuppingCertificate()}
                          </CCarouselInner>
                          <CCarouselControl direction="prev" />
                          <CCarouselControl direction="next" />
                        </CCarousel>
                      </CCardBody>
                    </CCard>
                  </CCol>
                  <hr
                    style={{
                      marginTop: "60px",
                      color: "#178d88",
                      backgroundColor: "#178d88",
                      height: 2,
                    }}
                  />
                </CCol> */}
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
          {/* end data cupping */}

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
                  src={MARKETPLACE_URL + this.state.cupping.qrcode}
                  className="d-block w-100"
                  alt={this.state.cupping.product_id}
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
                {this.renderDetailCupping()}
              </CCardBody>
            </CCard>
          </div>
        </main>
      </Fragment>
    );
  }
}
