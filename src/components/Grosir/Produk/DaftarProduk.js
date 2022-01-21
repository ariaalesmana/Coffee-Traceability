import { Fragment, useState, useEffect } from "react";
import showResults from "../../showResults/showResults";
import DaftarProdukForm from "./DaftarProdukForm";
import UserService from "../../../services/user.service";
import Web3 from "web3";
import { AddProduct } from "../../../abi/abi";

import QRcode from "qrcode.react";
import { sha256 } from "js-sha256";

require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");

const DaftarProduk = (props) => {
  const provider = new HDWalletProvider(
    process.env.REACT_APP_MNEMONIC,
    "https://ropsten.infura.io/v3/" + process.env.REACT_APP_INFURA_PROJECT_ID
  );
  const web3 = new Web3(provider);
  provider.engine.stop();

  // const contractAddress = "0xEb8eF83cB027D9d3594b77eCd05051E138741e5B";
  const contractAddress = "0x061Bca64852219aA03a9615ef66Dc301e075F6d9";

  const code = props.code;

  const [files, imageFile] = useState("");
  const [filesGambar, imageFileGambar] = useState("");
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState("");

  const [currencyID, setCurrencyID] = useState([]);

  const onFileChange = (file) => {
    imageFile(file);
  };

  const onFileChangeGambar = (file) => {
    imageFileGambar(file);
  };

  const getWallet = async () => {
    web3.eth.getAccounts(function (err, accounts) {
      if (err != null) {
        alert("An error occurred: " + err);
      } else if (accounts.length == 0) {
        alert("User is not logged in to MetaMask");
      } else {
        setAccount(accounts[0]);
      }
    });
  };

  useEffect(() => {
    getWallet();
    getDefaultCurrency();
  }, []);

  const getDefaultCurrency = () => {
    UserService.getAddDetailProduct().then((response) => {
      response.data.currencies.map((value) => {
        if (value.code == response.data.defaultCurrencies) {
          setCurrencyID(value.id);
        }
      });
    });
  };

  const [qr, setQr] = useState("test");
  const handleChange = (value) => {
    setQr(value);
  };

  const downloadQR = (product_id) => {
    const canvas = document.getElementById("myqr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "" + product_id + ".png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleSubmit = async (values) => {
    if (
      values.roastingMenu &&
      values.batch_id &&
      values.name &&
      values.productGroup &&
      values.category &&
      values.subcategory &&
      values.description &&
      values.short_description &&
      values.price &&
      values.unit &&
      values.stock &&
      values.sku &&
      values.weight &&
      values.tgl_produksi &&
      files != "" &&
      filesGambar != ""
    ) {
      const formData = new FormData();

      if (values.roastingMenu == "Single") {
        formData.append("batch_id", values.batch_id);
      }

      if (values.roastingMenu == "Blended") {
        formData.append("beans", JSON.stringify(values.beans));
      }

      formData.append("name", values.name);
      formData.append("product_group", values.productGroup);
      formData.append("category", values.category);
      formData.append("subcategory", values.subcategory);
      formData.append("description", values.description);
      formData.append("short_description", values.short_description);
      formData.append("price", values.price);

      if (values.currency == undefined) {
        formData.append("currency", currencyID);
      } else {
        formData.append("currency", values.currency);
      }

      formData.append("unit", values.unit);
      formData.append("stock", values.stock);
      formData.append("sku", values.sku);
      // formData.append("vendor_sku", values.vendor_sku);
      formData.append("weight", values.weight);
      formData.append("tgl_produksi", values.tgl_produksi);

      for (let i = 0; i < files.length; i++) {
        console.log("gambar files i", files[i]);
        formData.append("files[]", files[i]);
      }

      formData.append("files_gambar", filesGambar);
      console.log("gambar gambar", filesGambar);
      formData.append("fileName_gambar", filesGambar.name);

      UserService.addProduct(formData).then(async (response) => {
        const product_id = response.data.product.id;
        // const linkQRCode = "http://127.0.0.1:3000/detailProduk/" + product_id;
        const linkQRCode =
          process.env.REACT_APP_PROD_URL +
          "detailProduk/" +
          code +
          "/" +
          product_id;
        await handleChange(linkQRCode);

        const canvas = document.getElementById("myqr");
        let imageBlob = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/png")
        );

        let formDataQR = new FormData();
        formDataQR.append("files_qr", imageBlob, "" + product_id + ".png");
        console.log("gambar qr", imageBlob, "" + product_id + ".png");
        formDataQR.append("fileName_qr", "" + product_id + ".png");

        downloadQR(product_id);

        UserService.pushQRCodeImage(product_id, formDataQR);

        UserService.getDetailProduk(product_id).then(async (response) => {
          console.log(response.data);
          var object = response.data;
          // formData.forEach(function (value, key) {
          //   object[key] = value;
          // });
          var json = JSON.stringify(object);
          // console.log(json);
          console.log(sha256(json));
          // console.log(contractAddress);
          console.log(account);

          let date_ob = new Date();
          let date = ("0" + date_ob.getDate()).slice(-2);
          let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
          let year = date_ob.getFullYear();
          let hours = date_ob.getHours();
          let minutes = date_ob.getMinutes();
          let seconds = date_ob.getSeconds();
          console.log(year + "-" + month + "-" + date);

          // Blockchain Function
          const storageContract = new web3.eth.Contract(
            AddProduct,
            contractAddress
          );
          const gas = await storageContract.methods
          .tambahProduct(
            sha256(json),
            year + "-" + month + "-" + date
          )
          .estimateGas();

          var post = await storageContract.methods
            .tambahProduct(sha256(json), year + "-" + month + "-" + date)
            .send(
              {
                from: account,
                // gas,
              },
              (error, transactionHash) => {
                const formData = new FormData();
                formData.append("product_id", product_id);
                formData.append("t_hash", transactionHash);

                UserService.addTransactionHash(formData);
                console.log(transactionHash);
              }
            );
          console.log(post);          
        });

        showResults("Data has been added");
      });
    } else {
      showResults("Please fill all the fields");
    }
  };

  return (
    <Fragment>
      <DaftarProdukForm
        onSubmit={handleSubmit}
        onSelectImage={onFileChange}
        onSelectImageGambar={onFileChangeGambar}
      />
      <div style={{ visibility: "hidden" }}>
        {qr ? (
          <QRcode id="myqr" value={qr} size={320} includeMargin={true} />
        ) : (
          <p>No QR code preview</p>
        )}
      </div>
    </Fragment>
  );
};
export default DaftarProduk;
