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
} from "@coreui/react";
import UserService from "../../../../services/user.service";
import DatePicker from "react-datepicker";
import "../../react-datepicker.css";
import moment from 'moment';

const EditPOForm = (props) => {
  const { handleSubmit } = props;

  const [po, setPO] = useState("");
  const [tgl, setStartDate] = useState('');

  props.onSelectDate(moment(tgl).format('YYYY-MM-DD'));

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let id = props.poID;
    UserService.detailPO(id).then((response) => {
      setPO(response.data.data)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <main className="c-main">
        <div className="container-fluid">
          <CCard>
            <CCardHeader>
              <CRow>
                <CCol xs={9} md={10} lg={11} style={{ margin: "auto" }}>
                  <h4 style={{ margin: "auto" }}>Edit PO</h4>
                </CCol>
                <CCol>
                  <CButton
                    block
                    color="dark"
                    to="/listBiji"
                    style={{ backgroundColor: "#00c4cc" }}
                  >
                    <span style={{ color: "white" }}>X</span>
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
                <CFormGroup>
                  <CLabel htmlFor="nf-namaUnit">PO number</CLabel>
                  <Field
                    className="textInput grosir"
                    name="po_number"
                    component="input"
                    type="text"
                    placeholder={po.po_number}
                    required={true}
                  />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-namaUnit">PO Date</CLabel>
                  <DatePicker
                    selected={tgl}
                    className="textInput grosir"
                    onChange={(date) => setStartDate(date)}
                    // maxDate={new Date()}
                    dateFormat="dd/MMM/yyyy"
                    name="po_date"
                    required={true}
                    placeholderText="Select a date"
                  />
                </CFormGroup>
                &nbsp;
                <CFormGroup>
                  <CLabel htmlFor="nf-namaUnit">Buyer Name</CLabel>
                  <Field
                    className="textInput grosir"
                    name="buyer_name"
                    component="input"
                    type="text"
                    placeholder={po.buyer_name}
                    required={true}
                  />
                </CFormGroup>
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
  form: "editPO", // a unique identifier for this form
})(EditPOForm);
