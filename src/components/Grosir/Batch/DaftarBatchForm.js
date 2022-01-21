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
  CSwitch,
  CCardFooter,
  CRow,
  CCol,
  CInputFile,
} from "@coreui/react";
import UserService from "../../../services/user.service";

const DaftarBatchForm = (props) => {
  const { handleSubmit, reset } = props;

  const [jenis, setJenis] = useState([]);
  const [biji, setBiji] = useState([]);
  const [proses, setProses] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [batchAuto, setBatchAuto] = useState(true);
  const [auto, setAuto] = useState('Auto Increment');

  useEffect(() => {
    getData();
  }, []);

  const handleBatch = () => {
    if(auto === 'Auto Increment') {
      setAuto('Input Batch Id');
      setBatchAuto(false);
    } else {
      setAuto('Auto Increment');
      setBatchAuto(true);
    }
  }

  const getData = async () => {
    UserService.getAddDetail().then((response) => {
      setJenis(response.data.jenis);
      setBiji(response.data.biji);
      setProses(response.data.proses);
      setSupplier(response.data.supplier);
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
                  <h4 style={{ margin: "auto" }}>Add Batch</h4>
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
              <CForm action="" method="post" encType="multipart/form-data">
                <CFormGroup>
                  <CLabel htmlFor="nf-pilihJenis">Batch Id</CLabel> &nbsp;
                  <CSwitch className={'mx-1'} variant={'3d'} color={'primary'} defaultChecked labelOn={'\u2713'} labelOff={'\u2715'} onChange={handleBatch} /> &nbsp; {auto}
                  {(() => {
                    if(!batchAuto) {
                      return(
                        <Field
                          className="textInput grosir"
                          name="batch_id"
                          component="input"
                          type="text"
                          placeholder="input batch id.."
                        />
                      )
                    }
                  })()}
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-pilihJenis">Select Beans</CLabel>
                  <Field
                    className="textInput grosir"
                    name="biji_id"
                    component="select"
                  >
                    <option value="" selected disabled hidden>
                      ----
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
                      ----
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
                      ----
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
                      ----
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
                    />
                  </CCol>
                  <CCol xs="2" style={{ margin: "auto" }}>
                    <span>Kg</span>
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
                    placeholder="https://www.youtube.com/embed/tgbNymZ7vqY"
                    component="input"
                    type="text"
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
  form: "daftarBatch", // a unique identifier for this form
})(DaftarBatchForm);
