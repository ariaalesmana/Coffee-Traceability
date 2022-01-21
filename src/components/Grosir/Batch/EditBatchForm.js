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
  CInputFile,
  CCol,
} from "@coreui/react";
import UserService from "../../../services/user.service";

const EditBatchForm = (props) => {
  const { handleSubmit, reset } = props;

  const [bijiName, setBijiName] = useState("");
  const [varietasName, setVarietasName] = useState("");
  const [prosesName, setProsesName] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [volume, setVolume] = useState("");

  //Form Baru
  const [moisture, setMoisture] = useState("");
  const [videoCulture, setVideoCulture] = useState("");
  const [storyTelling, setStorytelling] = useState("");

  const [jenis, setJenis] = useState([]);
  const [biji, setBiji] = useState([]);
  const [proses, setProses] = useState([]);
  const [supplier, setSupplier] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    UserService.getAddDetail().then((response) => {
      setJenis(response.data.jenis);
      setBiji(response.data.biji);
      setProses(response.data.proses);
      setSupplier(response.data.supplier);
    });

    let id = props.batchID;
    UserService.getDetailBatch(id).then((response) => {
      if (response.data.batch[0].biji != null) {
        setBijiName(response.data.batch[0].biji.nama_biji);
      }
      if (response.data.batch[0].jenis != null) {
        setVarietasName(response.data.batch[0].jenis.nama_jenis);
      }
      if (response.data.batch[0].proses != null) {
        setProsesName(response.data.batch[0].proses.nama_proses);
      }
      if (response.data.batch[0].supplier != null) {
        setSupplierName(response.data.batch[0].supplier.lokasi_supplier);
      }
      setVolume(response.data.batch[0].volume);

      //Form Baru
      setMoisture(response.data.batch[0].moisture);
      setVideoCulture(response.data.batch[0].video_culture);
      setStorytelling(response.data.batch[0].storytelling);
    });
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    props.onSelectImage(file);
  };

  const onCertificateChanges = (e) => {
    const file = e.target.files[0];
    props.onSelectCertificate(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <main className="c-main">
        <div className="container-fluid">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                  <h4 style={{ margin: "auto" }}>Edit Batch</h4>
                </CCol>
                <CCol>
                  <CButton
                    block
                    color="dark"
                    to="/listBatch"
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
                  <CLabel htmlFor="nf-pilihJenis">Select Beans</CLabel>
                  <Field
                    className="textInput grosir"
                    name="biji_id"
                    component="select"
                  >
                    <option value="" selected disabled hidden>
                      {bijiName}
                    </option>
                    {biji &&
                      biji.map((value) => {
                        return (
                          <option key={value.id} value={value.id}>
                            {value.nama_biji}
                          </option>
                        );
                      })}
                  </Field>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-pilihSupplier">Select Variety</CLabel>
                  <Field
                    className="textInput grosir"
                    name="jenis_id"
                    component="select"
                  >
                    <option value="" selected disabled hidden>
                      {varietasName}
                    </option>
                    {jenis &&
                      jenis.map((value) => {
                        return (
                          <option key={value.id} value={value.id}>
                            {value.nama_jenis}
                          </option>
                        );
                      })}
                  </Field>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-pilihSupplier">Select Process</CLabel>
                  <Field
                    className="textInput grosir"
                    name="proses_id"
                    component="select"
                  >
                    <option value="" selected disabled hidden>
                      {prosesName}
                    </option>
                    {proses &&
                      proses.map((value) => {
                        return (
                          <option key={value.id} value={value.id}>
                            {value.nama_proses}
                          </option>
                        );
                      })}
                  </Field>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-pilihSupplier">
                    Select Coffee Origin
                  </CLabel>
                  <Field
                    className="textInput grosir"
                    name="supplier_id"
                    component="select"
                  >
                    <option value="" selected disabled hidden>
                      {supplierName}
                    </option>
                    {supplier &&
                      supplier.map((value) => {
                        return (
                          <option key={value.id} value={value.id}>
                            {value.lokasi_supplier}
                          </option>
                        );
                      })}
                  </Field>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-moisture">Moisture</CLabel>
                  <Field
                    className="textInput grosir"
                    name="moisture"
                    component="input"
                    type="text"
                    placeholder={moisture}
                  />
                </CFormGroup>
                <CFormGroup row>
                  <CLabel col xs="12" htmlFor="nf-volume">
                    Volume
                  </CLabel>
                  <CCol xs="10">
                    <Field
                      className="textInput grosir"
                      name="volume"
                      component="input"
                      type="number"
                      placeholder={volume}
                    />
                  </CCol>
                  <CCol xs="2" style={{ margin: "auto" }}>
                    <span>kg</span>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CLabel col xs="12" htmlFor="file-gambarPanen">
                    Harvest Image
                  </CLabel>
                  <CCol xs="12">
                    <CInputFile
                      id="file-input"
                      name="gambar"
                      type="file"
                      onChange={onFileChange}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-videoCulture">Video Culture</CLabel>
                  <Field
                    className="textInput grosir"
                    name="videoCulture"
                    placeholder="https://youtube.com/"
                    component="input"
                    type="text"
                    placeholder={videoCulture}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-tanggalPanen">Harvest Date</CLabel>
                  <Field
                    className="textInput grosir"
                    name="tgl_panen"
                    component="input"
                    type="month"
                  />
                </CFormGroup>
                <CFormGroup row>
                  <CLabel col xs="12" htmlFor="file-certificate">
                    Certificate Image
                  </CLabel>
                  <CCol xs="12">
                    <CInputFile
                      id="file-input"
                      name="certificate"
                      type="file"
                      onChange={onCertificateChanges}
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-storytelling">Storytelling</CLabel>
                  <Field
                    className="textAreaInput grosir"
                    name="storytelling"
                    component="textarea"
                    placeholder={storyTelling}
                  />
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
  form: "editBatch", // a unique identifier for this form
})(EditBatchForm);
