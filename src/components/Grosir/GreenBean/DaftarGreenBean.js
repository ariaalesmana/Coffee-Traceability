import { Fragment, useState, useEffect } from "react";
import showResults from "../../showResults/showResults";
import DaftarGreenBeanForm from "./DaftarGreenBeanForm";
import UserService from "../../../services/user.service";
import Web3 from "web3";
import { AddProduct } from "../../../abi/abi";
import { Redirect, useHistory } from "react-router-dom";

import QRcode from "qrcode.react";
import { sha256 } from "js-sha256";

require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");

const DaftarGreenBean = (props) => {  

  const code = props.code;

  const [files, imageFile] = useState("");
  const [filesGambar, imageFileGambar] = useState("");
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState("");
  const [pindah, setPindah] = useState(false);
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [data, setData] = useState([]);

  const [currencyID, setCurrencyID] = useState([]);  

  const onLatChange = (latitude) => {
    setLat(latitude);
  };

  const onLongChange = (longitude) => {
    setLong(longitude);
  };

  const handleSubmit = async (values) => {
    console.log('cek value', values);
    // cek batch number

    if(values.po_number &&
      values.sku &&
      values.batch &&
      values.harvesting_year &&
      values.farm &&
      values.species &&
      values.process &&
      values.variety &&
      values.volume_order
    ){
      const formData = new FormData();
      formData.append("po_number", values.po_number);
      formData.append("batch", values.batch);
      formData.append("farm", values.farm);
      formData.append("harvesting_year", values.harvesting_year);
      formData.append("sku", values.sku);
      formData.append("species", values.species);
      formData.append("process", values.process);
      formData.append("variety", values.variety);
      formData.append("volume_order", values.volume_order);

      await UserService.addBatchGreenBean(formData).then((response) => {
        console.log('cek response', response);
        if(response.data.massage) {
          showResults(`${response.data.massage}`);
        } else {
          showResults("Data has been added");
          setPindah(true);
        }
      });
    } else {
      showResults("Please fill all the fields");
    }
  }
  

  if (pindah === true) {

    return <Redirect to="/listGreenBean" />;

  } else {

    return (
      <Fragment>
        <DaftarGreenBeanForm
          onSubmit={handleSubmit}
          onSelectLat={onLatChange}
          onSelectLong={onLongChange}
        />
      </Fragment>
    );

  }
};
export default DaftarGreenBean;
