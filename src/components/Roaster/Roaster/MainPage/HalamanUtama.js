import { Fragment, React, Component } from "react";
import UserService from "../../../../services/user.service";
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
      status: "",
      roasting_id: 0,
      product_id: 0,
      code: "",
      roasting: null,
      cupping: null,
      blendedBeans: [],
      harvestImage: [],
      certificateRoasting: null,
      certificateBatch: null,
      roastingProcessImg: null,
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

  renderMyMaps = () => {
    const { places, mapApiLoaded, mapInstance, mapApi } = this.state;

    const apiKey = 'AIzaSyC81o8Qoasn_E2FqMrqhmM-2IUlgAab2V4'

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


  async componentDidMount() {
    let id = this.props.roastingID;
    this.setState({ roasting_id: id });

    let code = this.props.code;
    this.setState({
      code: code,
    });

    await UserService.getDetailRoastingProductGuest(code, id).then((response) => {
      console.log('cek', response.data);
      if (response.data.roasting[0]) {
        this.setState({
          roasting: response.data.roasting,
          blendedBeans: response.data.blendedBeans,
          cupping: response.data.roasting_cupping,
          certificateRoasting: response.data.cuppingCertificate,
          roastingProcessImg: response.data.roastingProcessImg,
          // lat: response.data.roasting[0].product.supplier.lat,
          // lng: response.data.roasting[0].product.supplier.long,
        })

        if(response.data.roasting[0].product.supplier) {
          this.setState({
            lat: response.data.roasting[0].product.supplier.lat,
            lng: response.data.roasting[0].product.supplier.long,
          })
        } else {
          this.setState({
            lat: response.data.roasting[0].product.green_beans.batch.supplier.lat,
            lng: response.data.roasting[0].product.green_beans.batch.supplier.long,
          })
        }

        // UserService.getDetailCuppingGuest(code, response.data.roasting[0].cupping_id).then((response) => {
        //   this.setState({
        //     cupping: response.data.roasting_cupping,
        //     certificateRoasting: response.data.cuppingCertificate,
        //   });
        // });

        //Single Origin
        if (response.data.roasting[0].roasting_menu == "Single") {
          //Single Origin Create Product
          if (response.data.roasting[0].product.productID == null) {
            this.setState({
              status: "Single Origin",
              certificateBatch: [],
            });
          } else {
            //Single Origin Import Green Beans
            if (response.data.roasting[0].product.green_beans.batch != null) {
              this.setState({
                status: "Single Origin Import Green Beans",
              });

              let id = response.data.roasting[0].product.green_beans.batch.id;
              UserService.getDetailBatchGuest(code, id).then((response) => {
                this.setState({
                  harvestImage: response.data.imageBatch,
                  certificateBatch: response.data.certificateBatch,
                });
              });
            }
            //Single Origin Import Blended Green Beans
            else {
              this.setState({
                status: "Single Origin Import Blended Green Beans",
              });
              let id = response.data.roasting[0].product.productID;
              UserService.getDetailGreenBeansGuest(code, id).then(
                (response) => {
                  this.setState({
                    blendedBeans: response.data.blendedBeans,
                  });
                  response.data.blendedBeans.map((value) => {
                    if (value.batch != null) {
                      let id = value.batch.batch_id;
                      UserService.getDetailBatchByBatchIDGuest(code, id).then(
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
                    }
                  });
                }
              );
            }
          }
        }
        //Blended Beans
        else {
          this.setState({
            status: "Blended Beans",
            certificateBatch: [],
          });
          response.data.blendedBeans.map((value) => {
            if (value.product != null) {
              if (value.product.productID != null) {
                if (value.product.green_beans.batch != null) {
                  let id = value.product.green_beans.batch.id;
                  UserService.getDetailBatchGuest(code, id).then((response) => {
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
                  });
                } else {
                  //Get Blended Beans Import Green Beans
                  let id = value.product.productID;
                  UserService.getProdukGuest(code, id).then((response) => {
                    this.setState((prevState) => ({
                      blendedBeans: [
                        ...prevState.blendedBeans,
                        response.data.blendedBeans[0],
                        response.data.blendedBeans[1],
                      ],
                    }));
                  });
                }
              }
            }
          });
        }
      }
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

    if (this.state.certificateRoasting) {
      for (let i = 0; i < this.state.certificateRoasting.length; i++) {
        let filename = MARKETPLACE_URL + this.state.certificateRoasting[i].certificates;

        if(filename.split('.').pop() === 'jpg' || filename.split('.').pop() === 'png' || filename.split('.').pop() === 'jpeg') {
          menuItems.push(
            // <CCarouselItem>
              <CImg
                src={
                  MARKETPLACE_URL + this.state.certificateRoasting[i].certificates
                }
                className="d-block w-100"
              />
            // </CCarouselItem>
          );
        } else {
          menuItems.push(
            <div className="iframe-container">
              <iframe className="responsive-iframe" src={
                  MARKETPLACE_URL + this.state.certificateRoasting[i].certificates
                }
              >
              </iframe>
              <p>{" "}</p>
            </div>
          );
        }
        // menuItems.push(
        //   <CCarouselItem>
        //     <CImg
        //       src={
        //         MARKETPLACE_URL + this.state.certificateRoasting[i].certificates
        //       }
        //       className="d-block w-100"
        //     />
        //   </CCarouselItem>
        // );
      }
    }

    if (this.state.certificateRoasting) {
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

  // renderCarouselCertificate = () => {
  //   let menuItems = [];
  //   if (this.state.certificateRoasting != null) {
  //     for (let i = 0; i < this.state.certificateRoasting.length; i++) {
  //       menuItems.push(
  //         <CCarouselItem>
  //           <CImg
  //             src={
  //               MARKETPLACE_URL + this.state.certificateRoasting[i].certificates
  //             }
  //             className="d-block w-100"
  //           />
  //         </CCarouselItem>
  //       );
  //     }
  //   }
  //   if (this.state.certificateBatch != null) {
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
  //   if (this.state.certificateBatch && this.state.certificateRoasting) {
  //     return menuItems;
  //   }
  // };

  renderDetailRoasting = () => {
    if (this.state.roasting) {
      return (
        <Fragment>

          {/* data green bean */}
          <CRow>
            {(() => {
              if(this.state.blendedBeans.length > 0) {
                return this.state.blendedBeans.map((value, index) => {
                  return (
                    <Fragment key={index}>
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
                          <strong>Green Bean Blended {index + 1}</strong>
                        </h1>
                      </CCol>

                      <CCol xs="10" lg="7">
                        <p>
                          <strong>SKU {index + 1}:</strong> {value.product.green_beans.sku}
                        </p>
                        <p>
                          <strong>Batch Number {index + 1}:</strong> {value.product.green_beans.batch.batch_id}
                        </p>
                        <p>
                          <strong>Country Of Origin {index + 1}:</strong> Indonesia
                        </p>
                        <p>
                          <strong>Origin {index + 1}:</strong> {value.product.green_beans.batch.supplier.lokasi_supplier}
                        </p>
                        <p>
                          <strong>Farm {index + 1}:</strong> {value.product.green_beans.batch.supplier.nama_supplier}
                        </p>
                        <p>
                          <strong>Elevation {index + 1}:</strong> {value.product.green_beans.batch.supplier.elevation}
                        </p>
                        <p>
                          <strong>Harvesting Year {index + 1}:</strong> {value.product.green_beans.batch.tgl_panen}
                        </p>
                        <p>
                          <strong>Variety {index + 1}:</strong> {value.product.green_beans.batch.jenis.deskripsi_jenis}
                        </p>
                        <p>
                          <strong>Process {index + 1}:</strong> {value.product.green_beans.batch.proses.deskripsi_proses}
                        </p>
                        <p>
                          <strong>Moisture {index + 1}:</strong> {value.product.green_beans.batch.moisture}
                        </p>
                        <p>
                          <strong>Google Map Location {index + 1}:</strong> <a style={{color: "white"}} target="_blank" href={value.product.green_beans.batch.supplier.link_maps ? value.product.green_beans.batch.supplier.link_maps : '#'}>{value.product.green_beans.batch.supplier.link_maps ? value.product.green_beans.batch.supplier.link_maps : '-'}</a>
                        </p>
                        {/* <CCard>
                          <CCardBody>
                            {this.renderMaps()}
                          </CCardBody>
                        </CCard> */}
                        <div style={{width: "100%", height: "400px" }}>
                          {this.renderMyMaps()}
                        </div>
                        <p></p>
                        {/* <p>
                          <strong>Maps Link:</strong> <a style={{color: "white"}} target="_blank" href={this.state.roasting[0].product.green_beans.batch.supplier.link_maps ? this.state.roasting[0].product.green_beans.batch.supplier.link_maps : '#'}>{this.state.roasting[0].product.green_beans.batch.supplier.link_maps ? this.state.roasting[0].product.green_beans.batch.supplier.link_maps : '-'}</a>
                        </p> */}
                        <p>
                          <strong>Storytelling {index + 1}:</strong> {value.product.green_beans.batch.storytelling}
                        </p>
                        <p>
                          <strong>Photo and Video Culture {index + 1}:</strong> {" "}
                        </p>
                        <div className="iframe-container">
                          {/* <iframe className="responsive-iframe"
                            src={this.state.roasting[0].product.green_beans.batch.video_culture}>
                          </iframe> */}
                          <iframe className="responsive-iframe"
                            // src={this.state.batch.video_culture}>
                            src={value.product.green_beans.batch.video_culture.replace("watch?v=", "embed/")}>
                          </iframe>
                          <p>{" "}</p>
                        </div>
                        <p>
                          <strong>Process Photo {index}:</strong> {" "}
                          <CImg
                            src={MARKETPLACE_URL + value.product.green_beans.thumbnail}
                            className="d-block w-100"
                          />
                        </p>
                        <p>
                          <strong>Volume {index}:</strong> {value.product.green_beans.batch.volume}
                        </p>

                        <hr
                          style={{
                            marginTop: "60px",
                            color: "#178d88",
                            backgroundColor: "#178d88",
                            height: 2,
                          }}
                        />
                      </CCol>
                    </Fragment>
                  )
                })
              } else {
                return (
                  <Fragment>
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
                      <p>
                        <strong>SKU:</strong> {this.state.roasting[0].product.green_beans.sku}
                      </p>
                      <p>
                        <strong>Batch Number:</strong> {this.state.roasting[0].product.green_beans.batch.batch_id}
                      </p>
                      <p>
                        <strong>Country Of Origin:</strong> Indonesia
                      </p>
                      <p>
                        <strong>Origin:</strong> {this.state.roasting[0].product.green_beans.batch.supplier.lokasi_supplier}
                      </p>
                      <p>
                        <strong>Farm:</strong> {this.state.roasting[0].product.green_beans.batch.supplier.nama_supplier}
                      </p>
                      <p>
                        <strong>Elevation:</strong> {this.state.roasting[0].product.green_beans.batch.supplier.elevation}
                      </p>
                      <p>
                        <strong>Harvesting Year:</strong> {this.state.roasting[0].product.green_beans.batch.tgl_panen}
                      </p>
                      <p>
                        <strong>Variety:</strong> {this.state.roasting[0].product.green_beans.batch.jenis.deskripsi_jenis}
                      </p>
                      <p>
                        <strong>Process:</strong> {this.state.roasting[0].product.green_beans.batch.proses.deskripsi_proses}
                      </p>
                      <p>
                        <strong>Moisture:</strong> {this.state.roasting[0].product.green_beans.batch.moisture}
                      </p>
                      <p>
                        <strong>Google Map Location:</strong> <a style={{color: "white"}} target="_blank" href={this.state.roasting[0].product.green_beans.batch.supplier.link_maps ? this.state.roasting[0].product.green_beans.batch.supplier.link_maps : '#'}>{this.state.roasting[0].product.green_beans.batch.supplier.link_maps ? this.state.roasting[0].product.green_beans.batch.supplier.link_maps : '-'}</a>
                      </p>
                      {/* <CCard>
                        <CCardBody>
                          {this.renderMaps()}
                        </CCardBody>
                      </CCard> */}
                      <div style={{width: "100%", height: "400px" }}>
                        {this.renderMyMaps()}
                      </div>
                      <p></p>
                      {/* <p>
                        <strong>Maps Link:</strong> <a style={{color: "white"}} target="_blank" href={this.state.roasting[0].product.green_beans.batch.supplier.link_maps ? this.state.roasting[0].product.green_beans.batch.supplier.link_maps : '#'}>{this.state.roasting[0].product.green_beans.batch.supplier.link_maps ? this.state.roasting[0].product.green_beans.batch.supplier.link_maps : '-'}</a>
                      </p> */}
                      <p>
                        <strong>Storytelling:</strong> {this.state.roasting[0].product.green_beans.batch.storytelling}
                      </p>
                      <p>
                        <strong>Photo and Video Culture:</strong> {" "}
                      </p>
                      <div className="iframe-container">
                        {/* <iframe className="responsive-iframe"
                          src={this.state.roasting[0].product.green_beans.batch.video_culture}>
                        </iframe> */}
                        <iframe className="responsive-iframe"
                          // src={this.state.batch.video_culture}>
                          src={this.state.roasting[0].product.green_beans.batch.video_culture.replace("watch?v=", "embed/")}>
                        </iframe>
                        <p>{" "}</p>
                      </div>
                      <p>
                        <strong>Process Photo:</strong> {" "}
                        <CImg
                          src={MARKETPLACE_URL + this.state.roasting[0].product.green_beans.thumbnail}
                          className="d-block w-100"
                        />
                      </p>
                      <p>
                        <strong>Volume:</strong> {this.state.roasting[0].product.green_beans.batch.volume}
                      </p>
                      {/* <p>
                        <strong>Certification Photos:</strong> {" "}
                      </p>
                      <CCol xs="10" lg="7">
                        <CCol xs="12" lg="7">
                          <CCard>
                            <CCardBody>
                              <CCarousel>
                                <CCarouselInner>
                                  {this.renderBatchCertificate()}
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
                      </CCol>*/}
                      <hr
                        style={{
                          marginTop: "60px",
                          color: "#178d88",
                          backgroundColor: "#178d88",
                          height: 2,
                        }}
                      />

                    </CCol>
                  </Fragment>
                )
              }
            })()}

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

          {/* data roaster */}
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
                <strong>Roaster</strong>
              </h1>
            </CCol>

            <CCol xs="10" lg="7">
              <Fragment>
                <p>
                  <strong>SKU Roasted Bean:</strong> {this.state.roasting[0].sku}
                </p>
                <p>
                  <strong>Tanggal Roasted:</strong> {this.state.roasting[0].tgl_roasting}
                </p>
                <p>
                  <strong>Roaster Name:</strong> {this.state.roasting[0].roasting_name}
                </p>
                <p>
                  <strong>Roasted Profile:</strong> {this.state.roasting[0].roasting_profile.roasting_profile}
                </p>
                <p>
                  <strong>Volume:</strong> {this.state.roasting[0].volume}
                </p>
                <p>
                  <strong>Foto Roasting Process:</strong> {" "}
                </p>
                {(() => {
                  if(this.state.roastingProcessImg) {
                    return (
                      <CImg
                        src={MARKETPLACE_URL + this.state.roastingProcessImg.roasting_process}
                        className="d-block w-100"
                      />
                    )
                  } else {
                    return (
                      <>
                        {`-`}
                      </>
                    )
                  }
                })()}
                <p>
                  <strong>Foto Produk:</strong> {" "}
                </p>
                <CImg
                  src={MARKETPLACE_URL + this.state.roasting[0].thumbnail}
                  className="d-block w-100"
                />
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
          {/* end data roaster */}

          {/* <CRow>
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
                <strong>ROAST</strong>
              </h1>
            </CCol>

            <CCol xs="10" lg="7">
              {(() => {
                if (this.state.status == "Single Origin") {
                  return (
                    <Fragment>
                      <p>
                        <strong>Product ID:</strong> {this.state.roasting[0].id}
                      </p>
                      <p>
                        <strong>SKU:</strong> {this.state.roasting[0].sku}
                      </p>
                      <p>
                        <strong>Product Name:</strong>{" "}
                        {this.state.roasting[0].roasting_name}
                      </p>
                      <p>
                        <strong>Country of Origin:</strong> Indonesia
                      </p>
                      <p>
                        <strong>Farm:</strong>{" "}
                        {
                          this.state.roasting[0].product.supplier
                            .lokasi_supplier
                        }
                      </p>
                      <p>
                        <strong>Elevation:</strong>{" "}
                        {this.state.roasting[0].product.supplier.elevation}{" "}
                        {this.state.roasting[0].product.supplier.unit.nama_unit}
                      </p>
                      <p>
                        <strong>Flavor Note:</strong>{" "}
                        {this.state.roasting[0].flavor_note}
                      </p>
                      <p>
                        <strong>Acidity:</strong>{" "}
                        {this.state.roasting[0].acidity}
                      </p>
                      <p>
                        <strong>Intensity:</strong>{" "}
                        {this.state.roasting[0].intensity}
                      </p>
                      <p>
                        <strong>Roasted Date:</strong>{" "}
                        {this.state.roasting[0].tgl_roasting}
                      </p>
                    </Fragment>
                  );
                } else if (
                  this.state.status == "Single Origin Import Green Beans"
                ) {
                  return (
                    <Fragment>
                      <p>
                        <strong>Product ID:</strong> {this.state.roasting[0].id}
                      </p>
                      <p>
                        <strong>SKU:</strong> {this.state.roasting[0].sku}
                      </p>
                      <p>
                        <strong>Product Name:</strong>{" "}
                        {this.state.roasting[0].roasting_name}
                      </p>
                      <p>
                        <strong>Country of Origin:</strong> Indonesia
                      </p>
                      <p>
                        <strong>Farm:</strong>{" "}
                        {
                          this.state.roasting[0].product.green_beans.batch
                            .supplier.lokasi_supplier
                        }
                      </p>
                      <p>
                        <strong>Elevation:</strong>{" "}
                        {
                          this.state.roasting[0].product.green_beans.batch
                            .supplier.elevation
                        }{" "}
                        {
                          this.state.roasting[0].product.green_beans.batch
                            .supplier.unit.nama_unit
                        }
                      </p>
                      <p>
                        <strong>Flavor Note:</strong>{" "}
                        {this.state.roasting[0].flavor_note}
                      </p>
                      <p>
                        <strong>Acidity:</strong>{" "}
                        {this.state.roasting[0].acidity}
                      </p>
                      <p>
                        <strong>Intensity:</strong>{" "}
                        {this.state.roasting[0].intensity}
                      </p>
                      <p>
                        <strong>Roasted Date: </strong>{" "}
                        {this.state.roasting[0].tgl_roasting}
                      </p>
                    </Fragment>
                  );
                } else if (
                  this.state.status ==
                  "Single Origin Import Blended Green Beans"
                ) {
                  let i = 0;
                  return (
                    <Fragment>
                      <p>
                        <strong>Product ID:</strong> {this.state.roasting[0].id}
                      </p>
                      <p>
                        <strong>SKU:</strong> {this.state.roasting[0].sku}
                      </p>
                      <p>
                        <strong>Product Name:</strong>{" "}
                        {this.state.roasting[0].roasting_name}
                      </p>
                      <p>
                        <strong>Country of Origin:</strong> Indonesia
                      </p>
                      {this.state.blendedBeans &&
                        this.state.blendedBeans.map((value) => {
                          i++;
                          return (
                            <Fragment>
                              <p>
                                <strong>Farm {i}:</strong>{" "}
                                {value.batch.supplier.lokasi_supplier}
                              </p>
                              <p>
                                <strong>Elevation {i}:</strong>{" "}
                                {value.batch.supplier.elevation}{" "}
                                {value.batch.supplier.unit.nama_unit}
                              </p>
                            </Fragment>
                          );
                        })}
                      <p>
                        <strong>Flavor Note:</strong>{" "}
                        {this.state.roasting[0].flavor_note}
                      </p>
                      <p>
                        <strong>Acidity:</strong>{" "}
                        {this.state.roasting[0].acidity}
                      </p>
                      <p>
                        <strong>Intensity:</strong>{" "}
                        {this.state.roasting[0].intensity}
                      </p>
                      <p>
                        <strong>Roasted Date: </strong>{" "}
                        {this.state.roasting[0].tgl_roasting}
                      </p>
                    </Fragment>
                  );
                } else if (this.state.status == "Blended Beans") {
                  let i = 0;
                  return (
                    <Fragment>
                      <p>
                        <strong>Product ID:</strong> {this.state.roasting[0].id}
                      </p>
                      <p>
                        <strong>SKU:</strong> {this.state.roasting[0].sku}
                      </p>
                      <p>
                        <strong>Product Name:</strong>{" "}
                        {this.state.roasting[0].roasting_name}
                      </p>
                      <p>
                        <strong>Country of Origin:</strong> Indonesia
                      </p>
                      {this.state.blendedBeans &&
                        this.state.blendedBeans.map((value) => {
                          if (value.product != null) {
                            if (value.product.productID == null) {
                              if (value.batch != null) {
                                i++;
                                return (
                                  <Fragment>
                                    <p>
                                      <strong>Farm {i}:</strong>{" "}
                                      {value.batch.supplier.lokasi_supplier}
                                    </p>
                                    <p>
                                      <strong>Elevation {i}:</strong>{" "}
                                      {value.batch.supplier.elevation}{" "}
                                      {value.batch.supplier.unit.nama_unit}
                                    </p>
                                  </Fragment>
                                );
                              } else {
                                i++;
                                return (
                                  <Fragment>
                                    <p>
                                      <strong>Farm {i}:</strong>{" "}
                                      {value.product.supplier.lokasi_supplier}
                                    </p>
                                    <p>
                                      <strong>Elevation {i}:</strong>{" "}
                                      {value.product.supplier.elevation}{" "}
                                      {value.product.supplier.unit.nama_unit}
                                    </p>
                                  </Fragment>
                                );
                              }
                            } else if (value.batch != null) {
                              if (value.batch.batch_id != null) {
                                i++;
                                return (
                                  <Fragment>
                                    <p>
                                      <strong>Farm {i}:</strong>{" "}
                                      {value.batch.supplier.lokasi_supplier}
                                    </p>
                                    <p>
                                      <strong>Elevation {i}:</strong>{" "}
                                      {value.batch.supplier.elevation}{" "}
                                      {value.batch.supplier.unit.nama_unit}
                                    </p>
                                  </Fragment>
                                );
                              }
                            }
                            //Blended Beans Import Beans
                            else {
                              if (value.product.green_beans.batch != null) {
                                i++;
                                return (
                                  <Fragment>
                                    <p>
                                      <strong>Farm {i}:</strong>{" "}
                                      {
                                        value.product.green_beans.batch.supplier
                                          .lokasi_supplier
                                      }
                                    </p>
                                    <p>
                                      <strong>Elevation {i}:</strong>{" "}
                                      {
                                        value.product.green_beans.batch.supplier
                                          .elevation
                                      }{" "}
                                      {
                                        value.product.green_beans.batch.supplier
                                          .unit.nama_unit
                                      }
                                    </p>
                                  </Fragment>
                                );
                              }
                            }
                          } else {
                            if (value.batch != null) {
                              i++;
                              return (
                                <Fragment>
                                  <p>
                                    <strong>Farm {i}:</strong>{" "}
                                    {value.batch.supplier.lokasi_supplier}
                                  </p>
                                  <p>
                                    <strong>Elevation {i}:</strong>{" "}
                                    {value.batch.supplier.elevation}{" "}
                                    {value.batch.supplier.unit.nama_unit}
                                  </p>
                                </Fragment>
                              );
                            }
                          }
                        })}
                      <p>
                        <strong>Flavor Note: </strong>{" "}
                        {this.state.roasting[0].flavor_note}
                      </p>
                      <p>
                        <strong>Acidity: </strong>{" "}
                        {this.state.roasting[0].acidity}
                      </p>
                      <p>
                        <strong>Intensity: </strong>{" "}
                        {this.state.roasting[0].intensity}
                      </p>
                      <p>
                        <strong>Roasted Date: </strong>{" "}
                        {this.state.roasting[0].tgl_roasting}
                      </p>
                    </Fragment>
                  );
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
            if (this.state.roasting[0].thumbnail != null) {
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
                        src={MARKETPLACE_URL + this.state.roasting[0].thumbnail}
                        className="d-block w-100"
                        alt={this.state.roasting.name}
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
                if (this.state.status == "Single Origin") {
                  return (
                    <Fragment>
                      <p>
                        <strong>Batch ID:</strong> -
                      </p>
                      <p>
                        <strong>Harvesting Year:</strong> -
                      </p>
                      <p>
                        <strong>Variety Name:</strong>{" "}
                        {this.state.roasting[0].product.jenis.nama_jenis}
                      </p>
                      <p>
                        <strong>Process Name:</strong>{" "}
                        {this.state.roasting[0].product.proses.nama_proses}
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
                      <div className="iframe-container">
                        <iframe className="responsive-iframe"
                          src={this.state.batch.video_culture}>
                        </iframe>
                      </div>
                      <p></p>
                      <p>
                        <strong>Storytelling:</strong>
                      </p>
                      <p>{this.state.batch.storytelling}</p>
                      <p>
                        <strong>Processing Year:</strong> -
                      </p>
                    </Fragment>
                  );
                } else if (
                  this.state.status == "Single Origin Import Green Beans"
                ) {
                  return (
                    <Fragment>
                      <p>
                        <strong>Batch ID:</strong>{" "}
                        {
                          this.state.roasting[0].product.green_beans.batch
                            .batch_id
                        }
                      </p>
                      <p>
                        <strong>Harvesting Year:</strong>{" "}
                        {
                          this.state.roasting[0].product.green_beans.batch
                            .tgl_panen
                        }
                      </p>
                      <p>
                        <strong>Variety Name:</strong>{" "}
                        {
                          this.state.roasting[0].product.green_beans.batch.jenis
                            .nama_jenis
                        }
                      </p>
                      <p>
                        <strong>Process Name:</strong>{" "}
                        {
                          this.state.roasting[0].product.green_beans.batch
                            .proses.nama_proses
                        }
                      </p>
                      <p>
                        <strong>Moisture:</strong>{" "}
                        {this.state.roasting[0].product.green_beans.batch.moisture}
                      </p>
                      <p>
                        <strong>Processor:</strong>{" "}
                        {
                          this.state.roasting[0].product.green_beans.batch
                            .supplier.nama_supplier
                        }
                      </p>
                      <p>
                        <strong>Video Culture:</strong>{" "}
                      </p>
                      <div className="iframe-container">
                        <iframe className="responsive-iframe"
                          src={this.state.roasting[0].product.green_beans.batch.video_culture}>
                        </iframe>
                      </div>
                      <p></p>
                      <p>
                        <strong>Storytelling:</strong>
                      </p>
                      <p>{this.state.roasting[0].product.green_beans.batch.storytelling}</p>
                      <p>
                        <strong>Processing Year:</strong>{" "}
                        {
                          this.state.roasting[0].product.green_beans.batch
                            .created_at
                        }
                      </p>
                    </Fragment>
                  );
                } else if (
                  this.state.status ==
                  "Single Origin Import Blended Green Beans"
                ) {
                  let i = 0;
                  return (
                    <Fragment>
                      {this.state.blendedBeans &&
                        this.state.blendedBeans.map((value) => {
                          i++;
                          return (
                            <Fragment>
                              <p>
                                <strong>Batch ID {i}:</strong>{" "}
                                {value.batch.batch_id}
                              </p>
                              <p>
                                <strong>Harvesting Year {i}:</strong>{" "}
                                {value.batch.tgl_panen}
                              </p>
                              <p>
                                <strong>Variety Name {i}:</strong>{" "}
                                {value.batch.jenis.nama_jenis}
                              </p>
                              <p>
                                <strong>Process Name {i}:</strong>{" "}
                                {value.batch.proses.nama_proses}
                              </p>
                              <p>
                                <strong>Moisture:</strong>{" "}
                                {value.batch.moisture}
                              </p>
                              <p>
                                <strong>Processor {i}:</strong>{" "}
                                {value.batch.supplier.nama_supplier}
                              </p>
                              <p>
                                <strong>Video Culture:</strong>{" "}
                              </p>
                              <div className="iframe-container">
                                <iframe className="responsive-iframe"
                                  src={value.batch.video_culture}>
                                </iframe>
                              </div>
                              <p></p>
                              <p>
                                <strong>Storytelling:</strong>
                              </p>
                              <p>{value.batch.storytelling}</p>
                              <p>
                                <strong>Processing Year {i}:</strong>{" "}
                                {value.created_at}
                              </p>
                            </Fragment>
                          );
                        })}
                    </Fragment>
                  );
                } else if (this.state.status == "Blended Beans") {
                  let i = 0;
                  return (
                    <Fragment>
                      {this.state.blendedBeans &&
                        this.state.blendedBeans.map((value) => {
                          if (value.product != null) {
                            if (value.product.productID == null) {
                              if (value.batch != null) {
                                i++;
                                return (
                                  <Fragment>
                                    <p>
                                      <strong>Batch ID {i}:</strong>{" "}
                                      {value.batch.batch_id}
                                    </p>
                                    <p>
                                      <strong>Harvesting Year {i}:</strong>{" "}
                                      {value.batch.tgl_panen}
                                    </p>
                                    <p>
                                      <strong>Variety Name {i}:</strong>{" "}
                                      {value.batch.jenis.nama_jenis}
                                    </p>
                                    <p>
                                      <strong>Process Name {i}:</strong>{" "}
                                      {value.batch.proses.nama_proses}
                                    </p>
                                    <p>
                                      <strong>Moisture:</strong>{" "}
                                      {value.batch.moisture}
                                    </p>
                                    <p>
                                      <strong>Processor {i}:</strong>{" "}
                                      {value.batch.supplier.nama_supplier}
                                    </p>
                                    <p>
                                      <strong>Video Culture:</strong>{" "}
                                    </p>
                                    <div className="iframe-container">
                                      <iframe className="responsive-iframe"
                                        src={value.batch.video_culture}>
                                      </iframe>
                                    </div>
                                    <p></p>
                                    <p>
                                      <strong>Storytelling:</strong>
                                    </p>
                                    <p>{value.batch.storytelling}</p>
                                    <p>
                                      <strong>Processing Year {i}:</strong>{" "}
                                      {value.created_at}
                                    </p>
                                  </Fragment>
                                );
                              } else {
                                i++;
                                return (
                                  <Fragment>
                                    <p>
                                      <strong>Batch ID {i}:</strong> -
                                    </p>
                                    <p>
                                      <strong>Harvesting Year {i}:</strong> -
                                    </p>
                                    <p>
                                      <strong>Variety Name {i}:</strong>{" "}
                                      {value.product.jenis.nama_jenis}
                                    </p>
                                    <p>
                                      <strong>Process Name {i}:</strong>{" "}
                                      {value.product.proses.nama_proses}
                                    </p>
                                    <p>
                                      <strong>Processor {i}:</strong>{" "}
                                      {value.product.supplier.nama_supplier}
                                    </p>
                                    <p>
                                      <strong>Processing Year {i}:</strong> -
                                    </p>
                                  </Fragment>
                                );
                              }
                            }
                            //Blended Beans Import Beans
                            else {
                              if (value.product.green_beans.batch != null) {
                                i++;
                                return (
                                  <Fragment>
                                    <p>
                                      <strong>Batch ID {i}:</strong>{" "}
                                      {value.product.green_beans.batch.batch_id}
                                    </p>
                                    <p>
                                      <strong>Harvesting Year {i}:</strong>{" "}
                                      {
                                        value.product.green_beans.batch
                                          .tgl_panen
                                      }
                                    </p>
                                    <p>
                                      <strong>Variety Name {i}:</strong>{" "}
                                      {
                                        value.product.green_beans.batch.jenis
                                          .nama_jenis
                                      }
                                    </p>
                                    <p>
                                      <strong>Process Name {i}:</strong>{" "}
                                      {
                                        value.product.green_beans.batch.proses
                                          .nama_proses
                                      }
                                    </p>
                                    <p>
                                      <strong>Moisture:</strong>{" "}
                                      {value.product.green_beans.batch.moisture}
                                    </p>
                                    <p>
                                      <strong>Processor {i}:</strong>{" "}
                                      {
                                        value.product.green_beans.batch.supplier
                                          .nama_supplier
                                      }
                                    </p>
                                    <p>
                                      <strong>Video Culture:</strong>{" "}
                                    </p>
                                    <div className="iframe-container">
                                      <iframe className="responsive-iframe"
                                        src={value.product.green_beans.batch.video_culture}>
                                      </iframe>
                                    </div>
                                    <p></p>
                                    <p>
                                      <strong>Storytelling:</strong>
                                    </p>
                                    <p>{value.product.green_beans.batch.storytelling}</p>
                                    <p>
                                      <strong>Processing Year {i}:</strong>{" "}
                                      {
                                        value.product.green_beans.batch
                                          .created_at
                                      }
                                    </p>
                                  </Fragment>
                                );
                              }
                            }
                          }
                        })}
                    </Fragment>
                  );
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
          })()} */}

          {/* {(() => {
            if (this.state.certificateRoasting || this.state.certificateBatch) {
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
          })()} */}

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
                  src={MARKETPLACE_URL + this.state.roasting[0].qrcode}
                  className="d-block w-100"
                  alt={this.state.roasting[0].product_id}
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
                {this.renderDetailRoasting()}
              </CCardBody>
            </CCard>
          </div>
        </main>
      </Fragment>
    );
  }
}
