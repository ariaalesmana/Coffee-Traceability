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
require("dotenv").config();

const MARKETPLACE_URL = process.env.REACT_APP_CATALOG_URL;

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

export default class HalamanUtama extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product_id: 0,
      batch_id: 0,
      code: "",
      batch: [],
      product: null,
      harvestImage: null,
      // currencies: [],
      blendedBeans: null,
      certificateBatch: [],

      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      geoCoder: null,
      places: [],
      center: [],
      zoom: 11,
      address: "",
      lat: "",
      lng: "",
      isOpen: false,
    };
  }

  async componentDidMount() {
    let id = this.props.productID;
    this.setState({
      product_id: id,
    });

    let code = this.props.code;
    this.setState({
      code: code,
    });

    UserService.getProdukGuest(code, id).then((response) => {
      if (response.data.product != null) {
        this.setState({
          batch: response.data.batch[0],
          product: response.data.product[0],
          blendedBeans: response.data.blendedBeans,
          lat: response.data.batch[0].supplier.lat,
          lng: response.data.batch[0].supplier.long,
        });

        this.setState({
          harvestImage: [],
        });

        if (response.data.blendedBeans.length > 1) {
          response.data.blendedBeans.map((value) => {
            UserService.getDetailBatchGuest(code, value.batch_id).then(
              (response) => {
                this.setState((prevState) => ({
                  harvestImage: [
                    ...prevState.harvestImage,
                    response.data.imageBatch,
                  ],
                  certificateBatch: [
                    ...prevState.certificateBatch,
                    response.data.certificateBatch,
                  ],
                }));
              }
            );
          });
        } else {
          UserService.getDetailBatchGuest(
            code,
            response.data.product[0].batch_id
          ).then((response) => {
            this.setState({
              harvestImage: response.data.imageBatch,
              certificateBatch: response.data.certificateBatch,
            });
          });
        }
      }
    });

    // UserService.getAddDetailProductGuest(code).then(
    //   (response) => {
    //     this.setState({
    //       currencies: response.data.currencies,
    //     });
    //   }
    // );
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

  renderCarouselImage = () => {
    let menuItems = [];
    if (this.state.harvestImage != null) {
      if (this.state.blendedBeans.length > 1) {
        if (this.state.harvestImage.length > 1) {
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
      } else {
        for (let i = 0; i < this.state.harvestImage.length; i++) {
          menuItems.push(
            <CCarouselItem>
              <CImg
                src={MARKETPLACE_URL + this.state.harvestImage[i].images}
                className="d-block w-100"
              />
            </CCarouselItem>
          );
        }
      }
    }
    return menuItems;
  };

  renderCarouselCertificate = () => {
    let menuItems = [];

    if (this.state.certificateBatch) {
      for (let i = 0; i < this.state.certificateBatch.length; i++) {
        let filename = MARKETPLACE_URL + this.state.certificateBatch[i].certificates;

        if(filename.split('.').pop() === 'jpg' || filename.split('.').pop() === 'png' || filename.split('.').pop() === 'jpeg') {
          menuItems.push(
            // <CCarouselItem>
              <CImg
                src={
                  MARKETPLACE_URL + this.state.certificateBatch[i].certificates
                }
                className="d-block w-100"
              />
            // </CCarouselItem>
          );
        } else {
          menuItems.push(
            <div class="iframe-container">
              <iframe class="responsive-iframe" src={
                  MARKETPLACE_URL + this.state.certificateBatch[i].certificates
                }
              >
              </iframe>
              <p>{" "}</p>
            </div>
          );
        }
      }
    }

    if (this.state.certificateBatch) {
      return menuItems;
    }

    // if (this.state.certificateBatch != null) {
    //   if (this.state.blendedBeans.length > 1) {
    //     if (this.state.certificateBatch.length > 1) {
    //       this.state.certificateBatch &&
    //         this.state.certificateBatch.map((value2) => {
    //           if (value2.length > 1) {
    //             for (let i = 0; i < value2.length; i++) {
    //               menuItems.push(
    //                 <CCarouselItem>
    //                   <CImg
    //                     src={MARKETPLACE_URL + value2[i].certificates}
    //                     className="d-block w-100"
    //                   />
    //                 </CCarouselItem>
    //               );
    //             }
    //           } else if (value2.length == 1) {
    //             menuItems.push(
    //               <CCarouselItem>
    //                 <CImg
    //                   src={MARKETPLACE_URL + value2[0].certificates}
    //                   className="d-block w-100"
    //                 />
    //               </CCarouselItem>
    //             );
    //           } else {
    //             menuItems.push(
    //               <CCarouselItem>
    //                 <CImg
    //                   src={MARKETPLACE_URL + value2.certificates}
    //                   className="d-block w-100"
    //                 />
    //               </CCarouselItem>
    //             );
    //           }
    //         });
    //     }
    //   } else {
    //     for (let i = 0; i < this.state.certificateBatch.length; i++) {
    //       menuItems.push(
    //         <CCarouselItem>
    //           <CImg
    //             src={
    //               MARKETPLACE_URL + this.state.certificateBatch[i].certificates
    //             }
    //             className="d-block w-100"
    //           />
    //         </CCarouselItem>
    //       );
    //     }
    //   }
    // }
    // return menuItems;
  };

  renderDetailProduct = () => {
    if (this.state.product != null) {
      return (
        <Fragment>
          <CRow>
            <CCol xs="2" lg="5">
              <h1
                style={{
                  transform: "rotate(180deg)",
                  transformOrigin: "20% 80%",
                  writingMode: "vertical-lr",
                  color: "darkOrange",
                  textAlign: "center",
                }}
              >
                <strong>PRODUCT</strong>
              </h1>
            </CCol>
            <CCol xs="10" lg="7">
              <p>
                <strong>SKU:</strong> {this.state.product.sku}
              </p>
              {(() => {
                if (this.state.product.batch_id != null) {
                  return (
                    <Fragment>
                      <p>
                        <strong>Batch Number:</strong> {this.state.batch.batch_id}
                      </p>
                    </Fragment>
                  );
                } else {
                  let i = 0;
                  return this.state.blendedBeans.map((value) => {
                    i++;
                    return (
                      <Fragment>
                        <p>
                          <strong>Batch Number {i}:</strong> {value.batch.batch_id}
                        </p>
                      </Fragment>
                    );
                  });
                }
              })()}
              <p>
                <strong>Country of Origin:</strong> Indonesia
              </p>
              {(() => {
                if (this.state.product.batch_id != null) {
                  return (
                    <Fragment>
                      <p>
                        <strong>Origin:</strong>{" "}
                        {this.state.batch.supplier.lokasi_supplier}
                      </p>
                      <p>
                        <strong>Farm:</strong>{" "}
                        {this.state.batch.supplier.nama_supplier}
                      </p>
                      <p>
                        <strong>Elevation:</strong>
                        {this.state.batch.supplier.elevation}{" "}
                        {this.state.batch.supplier.unit.nama_unit}
                      </p>
                      {(() => {
                        if (this.state.product.batch_id != null) {
                          return (
                            <Fragment>
                              <p>
                                <strong>Harvesting Year:</strong>{" "}
                                {this.state.batch.tgl_panen}
                              </p>
                              <p>
                                <strong>Variety:</strong>{" "}
                                {this.state.batch.jenis.nama_jenis}
                              </p>
                              <p>
                                <strong>Process:</strong>{" "}
                                {this.state.batch.proses.nama_proses}
                              </p>
                              <p>
                                <strong>Moisture:</strong>{" "}
                                {this.state.batch.moisture}
                              </p>
                            </Fragment>
                          );
                        } else {
                          let i = 0;
                          return this.state.blendedBeans.map((value) => {
                            i++;
                            return (
                              <Fragment>
                                <p>
                                  <strong>Harvesting Year {i}:</strong>{" "}
                                  {value.batch.tgl_panen}
                                </p>
                                <p>
                                  <strong>Variety {i}:</strong>{" "}
                                  {value.batch.jenis.nama_jenis}
                                </p>
                                <p>
                                  <strong>Process {i}:</strong>{" "}
                                  {value.batch.proses.nama_proses}
                                </p>
                                <p>
                                  <strong>Moisture {i}:</strong>{" "}
                                  {value.batch.moisture}
                                </p>
                              </Fragment>
                            );
                          });
                        }
                      })()}
                      {/* <p>
                        <strong>Maps Link:</strong> <a style={{color: "white"}} target="_blank" href={this.state.batch.supplier.link_maps ? this.state.batch.supplier.link_maps : '#'}>{this.state.batch.supplier.link_maps ? this.state.batch.supplier.link_maps : '-'}</a>
                      </p> */}
                    </Fragment>
                  );
                } else {
                  let i = 0;
                  return this.state.blendedBeans.map((value) => {
                    i++;
                    return (
                      <Fragment>
                        <p>
                          <strong>Origin {i}:</strong>{" "}
                          {value.batch.supplier.lokasi_supplier}
                        </p>
                        <p>
                          <strong>Farm {i}:</strong>{" "}
                          {value.batch.supplier.nama_supplier}
                        </p>
                        <p>
                          <strong>Elevation {i}:</strong>{" "}
                          {value.batch.supplier.elevation}{" "}
                          {value.batch.supplier.unit.nama_unit}
                        </p>
                        {/* <p>
                          <strong>Maps Link:</strong> <a style={{color: "white"}} target="_blank" href={value.batch.supplier.link_maps ? value.batch.supplier.link_maps : '#'}>{value.batch.supplier.link_maps ? value.batch.supplier.link_maps : '-'}</a>
                        </p> */}
                      </Fragment>
                    );
                  });
                }
              })()}
              <p>
                <strong>Google Map Location:</strong> <a style={{color: "white"}} target="_blank" href={this.state.batch.supplier.link_maps ? this.state.batch.supplier.link_maps : '#'}>{this.state.batch.supplier.link_maps ? this.state.batch.supplier.link_maps : '-'}</a>
              </p>
              <div style={{width: "100%", height: "400px" }}>
                {this.renderMyMaps()}
              </div>
              <p></p>
              <p>
                <strong>Storytelling:</strong>
              </p>
              <p>{this.state.batch.storytelling}</p>
              <p>
                <strong>Photo & Video Culture:</strong>{" "}
              </p>
              <div class="iframe-container">
                <iframe class="responsive-iframe"
                  // src={this.state.batch.video_culture}>
                  src={this.state.batch.video_culture.replace("watch?v=", "embed/")}>
                </iframe>
                <p>{" "}</p>
              </div>
              <p></p>
              <p>
                <strong>Process Photo:</strong> {" "}
                <CImg
                  src={MARKETPLACE_URL + this.state.product.thumbnail}
                  className="d-block w-100"
                />
              </p>
              <p>
                <strong>Volume:</strong> {this.state.batch.volume}
              </p>
              {/* <p>
                <strong>Product ID:</strong> {this.state.product.id}
              </p>
              <p>
                <strong>Product Name:</strong> {this.state.product.name}
              </p> */}
              {/* <p>
                <strong>Price:</strong> {this.state.product.price}
                {this.state.currencies.map((value) => {
                  if (value.id == this.state.product.currency) {
                    return " " + value.code;
                  }
                })}
              </p> */}
              {/* <p>
                <strong>Description:</strong> {this.state.product.description}
              </p> */}
              {/* <p>
                <strong>Production Date:</strong>{" "}
                {this.state.product.tgl_produksi}
              </p> */}
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

          {/* {(() => {
            if (this.state.product.thumbnail != null) {
              return (
                <CRow style={{ marginTop: "40px" }}>
                  <CCol xs="2" lg="5">
                    <h1
                      style={{
                        transform: "rotate(180deg)",
                        transformOrigin: "20% 48%",
                        writingMode: "vertical-lr",
                        color: "darkOrange",
                        textAlign: "center",
                      }}
                    >
                      <strong>IMAGE</strong>
                    </h1>
                  </CCol>
                  <CCol xs="10" lg="7">
                    <CCol xs="12" lg="7">
                      <CImg
                        src={MARKETPLACE_URL + this.state.product.thumbnail}
                        className="d-block w-100"
                        alt={this.state.product.name}
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
              );
            }
          })()} */}

          {/* <CRow style={{ marginTop: "40px" }}>
            <CCol xs="2" lg="5">
              <h1
                style={{
                  transform: "rotate(180deg)",
                  transformOrigin: "20% 70%",
                  writingMode: "vertical-lr",
                  color: "darkOrange",
                  textAlign: "center",
                }}
              >
                <strong>BATCH</strong>
              </h1>
            </CCol>
            <CCol xs="10" lg="7">
              {(() => {
                if (this.state.product.batch_id != null) {
                  console.log(this.state.batch);
                  return (
                    <Fragment>
                      <p>
                        <strong>Batch Number:</strong> {this.state.batch.batch_id}
                      </p>
                      <p>
                        <strong>Harvesting Year:</strong>{" "}
                        {this.state.batch.tgl_panen}
                      </p>
                      <p>
                        <strong>Variety:</strong>{" "}
                        {this.state.batch.jenis.nama_jenis}
                      </p>
                      <p>
                        <strong>Process:</strong>{" "}
                        {this.state.batch.proses.nama_proses}
                      </p>
                      <p>
                        <strong>Moisture:</strong>{" "}
                        {this.state.batch.moisture}
                      </p>
                      <p>
                        <strong>Processor:</strong>{" "}
                        {this.state.batch.supplier.nama_supplier}
                      </p>
                      <p>
                        <strong>Video Culture:</strong>{" "}
                      </p>
                      <div class="iframe-container">
                        <iframe class="responsive-iframe"
                          src={this.state.batch.video_culture}>
                        </iframe>
                      </div>
                      <p></p>
                      <p>
                        <strong>Storytelling:</strong>
                      </p>
                      <p>{this.state.batch.storytelling}</p>
                    </Fragment>
                  );
                } else {
                  let i = 0;
                  return this.state.blendedBeans.map((value) => {
                    i++;
                    return (
                      <Fragment>
                        <p>
                          <strong>Batch Number {i}:</strong> {value.batch.batch_id}
                        </p>
                        <p>
                          <strong>Harvesting Year {i}:</strong>{" "}
                          {value.batch.tgl_panen}
                        </p>
                        <p>
                          <strong>Variety {i}:</strong>{" "}
                          {value.batch.jenis.nama_jenis}
                        </p>
                        <p>
                          <strong>Process {i}:</strong>{" "}
                          {value.batch.proses.nama_proses}
                        </p>
                        <p>
                          <strong>Processor {i}:</strong>{" "}
                          {value.batch.supplier.nama_supplier}
                        </p>
                      </Fragment>
                    );
                  });
                }
              })()}

              <hr
                style={{
                  marginTop: "60px",
                  color: "#178d88",
                  backgroundColor: "#178d88",
                  height: 2,
                }}
              />
            </CCol>
          </CRow> */}

          {/* {(() => {
            if (this.state.harvestImage != null) {
              if (this.state.harvestImage.length >= 1) {
                return (
                  <CRow style={{ marginTop: "40px" }}>
                    <CCol xs="2" lg="5">
                      <h1
                        style={{
                          transform: "rotate(180deg)",
                          transformOrigin: "20% 70%",
                          writingMode: "vertical-lr",
                          color: "darkOrange",
                          textAlign: "center",
                        }}
                      >
                        <strong>IMAGE</strong>
                      </h1>
                    </CCol>
                    <CCol xs="10" lg="7">
                      <CCol xs="12" lg="7">
                        <CCard>
                          <CCardBody>
                            <CCarousel>
                              <CCarouselInner>
                                {this.renderCarouselImage()}
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
                    </CCol>
                  </CRow>
                );
              }
            }
          })()} */}

          {(() => {
            if (this.state.certificateBatch != null) {
              if (this.state.certificateBatch.length >= 1) {
                return (
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
                        <strong>CERTIFICATE</strong>
                      </h1>
                    </CCol>
                    <CCol xs="10" lg="7">
                      <CCol xs="12" lg="7">
                        <p>
                          <strong>Certification Photos:</strong> {" "}
                        </p>
                        <CCard>
                          <CCardBody>
                            <CCarousel>
                              <CCarouselInner>
                                {this.renderCarouselCertificate()}
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
                    </CCol>
                  </CRow>
                );
              }
            }
          })()}

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
                  src={MARKETPLACE_URL + this.state.product.qrcode}
                  className="d-block w-100"
                  alt={this.state.product.product_id}
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
                {this.renderDetailProduct()}
              </CCardBody>
            </CCard>
          </div>
        </main>
      </Fragment>
    );
  }
}
