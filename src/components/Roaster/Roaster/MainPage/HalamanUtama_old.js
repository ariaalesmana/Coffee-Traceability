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
} from "@coreui/react";
require("dotenv").config();

const MARKETPLACE_URL = process.env.REACT_APP_CATALOG_URL;

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
    };
  }

  async componentDidMount() {
    let id = this.props.roastingID;
    this.setState({ roasting_id: id });

    let code = this.props.code;
    this.setState({
      code: code,
    });

    UserService.getDetailRoastingProductGuest(code, id).then((response) => {
      if (response.data.roasting[0] != null) {
        this.setState({
          roasting: response.data.roasting,
          blendedBeans: response.data.blendedBeans,
        });

        UserService.getDetailCuppingGuest(code, response.data.roasting[0].cupping_id).then((response) => {
          console.log(response.data.roasting_cupping);
          this.setState({
            cupping: response.data.roasting_cupping,
            certificateRoasting: response.data.cuppingCertificate,
          });
        });

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

  renderCarouselCertificate = () => {
    let menuItems = [];
    if (this.state.certificateRoasting != null) {
      for (let i = 0; i < this.state.certificateRoasting.length; i++) {
        menuItems.push(
          <CCarouselItem>
            <CImg
              src={
                MARKETPLACE_URL + this.state.certificateRoasting[i].certificates
              }
              className="d-block w-100"
            />
          </CCarouselItem>
        );
      }
    }
    if (this.state.certificateBatch != null) {
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
    if (this.state.certificateBatch && this.state.certificateRoasting) {
      return menuItems;
    }
  };

  renderDetailRoasting = () => {
    if (this.state.roasting != null) {
      return (
        <Fragment>
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
          </CRow>

          {(() => {
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
          })()}

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
                      <div class="iframe-container">
                        <iframe class="responsive-iframe"
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
                              <div class="iframe-container">
                                <iframe class="responsive-iframe"
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
                                    <div class="iframe-container">
                                      <iframe class="responsive-iframe"
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
                                    <div class="iframe-container">
                                      <iframe class="responsive-iframe"
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
          </CRow>

          {(() => {
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
          })()}

          {(() => {
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
