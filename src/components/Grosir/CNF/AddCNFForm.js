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
  CInputFile,
} from "@coreui/react";
import UserService from "../../../services/user.service";
import DatePicker from "react-datepicker";
import "../react-datepicker.css";
import moment from 'moment';

const AddCNFForm = (props) => {
  const { handleSubmit, reset } = props;

  const [jenis, setJenis] = useState([]);
  const [biji, setBiji] = useState([]);
  const [proses, setProses] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [tgl, setStartDate] = useState('');

  props.onSelectDate(moment(tgl).format('YYYY-MM-DD'));

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    UserService.getAddDetail().then((response) => {
      setJenis(response.data.jenis);
      setBiji(response.data.biji);
      setProses(response.data.proses);
      setSupplier(response.data.supplier);
    });
  };

  const onFileChange = (e) => {
    const file = e.target.files;
    props.onSelectImage(file);
  };

  const onCertificateChanges = (e) => {
    const file = e.target.files;
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
                  <h4 style={{ margin: "auto" }}>Add CNF</h4>
                </CCol>
                <CCol>
                  <CButton
                    block
                    color="dark"
                    to="/ListCNF"
                    style={{ backgroundColor: "#00c4cc" }}
                  >
                    <span style={{ color: "white" }}>X</span>
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              {/* <CForm action="" method="post" encType="multipart/form-data"> */}
                <CFormGroup>
                  <CLabel htmlFor="nf-moisture">Document Number</CLabel>
                  <Field
                    className="textInput grosir"
                    name="nomor_dokumen"
                    component="input"
                    type="text"
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-tanggalPanen">Dokumen Date</CLabel>
                  <DatePicker
                    selected={tgl}
                    className="textInput grosir"
                    onChange={(date) => setStartDate(date)}
                    maxDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    name="tanggal_dokumen"
                    placeholderText="Select a date"
                  />
                </CFormGroup>
              {/* </CForm> */}
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
  form: "AddCNF", // a unique identifier for this form
})(AddCNFForm);
