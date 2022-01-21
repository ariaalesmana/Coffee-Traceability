import { Fragment, useState, useEffect } from "react";
import AddRoastingForm from "./AddRoastingForm";
import showResults from "../../../showResults/showResults";
import UserService from "../../../../services/user.service";
import QRcode from "qrcode.react";
import { sha256 } from "js-sha256";
import Web3 from "web3";
import { AddProduct } from "../../../../abi/abi";

require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");

const AddRoasting = (props) => {
  const provider = new HDWalletProvider(
    process.env.REACT_APP_MNEMONIC,
    "https://ropsten.infura.io/v3/" + process.env.REACT_APP_INFURA_PROJECT_ID
  );
  const web3 = new Web3(provider);
  provider.engine.stop()
  const contractAddress = "0x061Bca64852219aA03a9615ef66Dc301e075F6d9";

  const code = props.code;
  const [qr, setQr] = useState("test");
  const [roastingFile, setRoastingFile] = useState("");
  const [filesGambar, imageFileGambar] = useState("");
  const [account, setAccount] = useState("");
  const [content, setContent] = useState([]);

  useEffect(() => {
    getData();
    handleIDBatch();
  }, []);

  const getData = () => {
    UserService.getListRoastingProductsAsc().then((response) => {
      setContent(response.data.roasting);
    });
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

  const handleChange = (value) => {
    setQr(value);
  };

  const onFileChangeGambar = (file) => {
    imageFileGambar(file);
  };

  const downloadQR = (roasting_id) => {
    const canvas = document.getElementById("myqr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "" + roasting_id + ".png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const onRoastingChange = (file) => {
    setRoastingFile(file);
  };

  useEffect(() => {
    getWallet();
  }, []);

  const handleSubmit = async (values) => {
    if (
      values.roastingMenu &&
      values.roastingProfile &&
      values.roastingName &&
      values.flavorNote &&
      values.acidity &&
      values.intensity &&
      values.weight &&
      roastingFile != "" &&
      filesGambar != ""
    ) {
      // console.log(process.env.REACT_APP_MNEMONIC);
      // console.log("https://ropsten.infura.io/v3/" + process.env.REACT_APP_INFURA_PROJECT_ID);
      const formData = new FormData();
      const batchID = handleIDBatch();
      formData.append("roasting_batch_id", batchID);

      if (values.roastingMenu == "Single") {
        formData.append("bean_id", values.bean);
      }
      if (values.roastingMenu == "Blended") {
        formData.append("beans", JSON.stringify(values.beans));
      }

      formData.append("roasting_profile_id", values.roastingProfile);
      formData.append("cupping_id", values.roastingCupping);
      formData.append("roasting_name", values.roastingName);
      formData.append("roastingMenu", values.roastingMenu);
      formData.append("flavor_note", values.flavorNote);
      formData.append("acidity", values.acidity);
      formData.append("intensity", values.intensity);
      formData.append("weight", values.weight);
      formData.append("sku", values.sku);
      formData.append("tgl_roasting", values.tgl_roasting);
      formData.append("roaster_name", values.roaster_name);

      formData.append("roastingFile", roastingFile);
      formData.append("roastingFileName", roastingFile.name);
      // for (let i = 0; i < roastingFile.length; i++) {
      //   formData.append("roastingFile[]", roastingFile[i]);
      // }

      formData.append("files_gambar", filesGambar);
      formData.append("fileName_gambar", filesGambar.name);

      UserService.addRoastingProduct(formData).then(async (response) => {
        const roasting_id = response.data.roasting.id;
        const linkQRCode =
          process.env.REACT_APP_PROD_URL +
          "detailRoasting/" +
          code +
          "/" +
          roasting_id;
        await handleChange(linkQRCode);

        const canvas = document.getElementById("myqr");
        let imageBlob = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/png")
        );

        let formDataQR = new FormData();
        formDataQR.append("files_qr", imageBlob, "" + roasting_id + ".png");
        formDataQR.append("fileName_qr", "" + roasting_id + ".png");

        downloadQR(roasting_id);

        UserService.pushQRCodeImageRoasting(roasting_id, formDataQR);

        UserService.getDetailRoastingProduct(roasting_id).then(
          async (response) => {
            console.log("data get setelah submit",response.data);
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

            //Blockchain Function
            // const storageContract = new web3.eth.Contract(
            //   AddProduct,
            //   contractAddress
            // );
            // // const gas = await storageContract.methods
            // // .tambahProduct(
            // //   sha256(json),
            // //   year + "-" + month + "-" + date
            // // )
            // // .estimateGas();

            // var post = await storageContract.methods
            //   .tambahProduct(sha256(json), year + "-" + month + "-" + date)
            //   .send(
            //     {
            //       from: account,
            //       // gas,
            //     },
            //     (error, transactionHash) => {
            //       console.log(transactionHash);
            //     }
            //   );
            // console.log(post);


            // queued post api marketplace kk
            var arrFiles = [];

            var formdata = new FormData();
            formdata.append("code", code);
            formdata.append("roasted_id", roasting_id);
            formdata.append("category_id", 115);
            formdata.append("name", values.roastingName);
            if(values.roastingMenu === 'Single') {
              formdata.append("description", object.roasting[0] ? object.roasting[0].product.green_beans.description : response.data.roasting[0].product.green_beans.description);
            } else {
              formdata.append("description", json);
            }
            formdata.append("indonesia_price", 1000);
            formdata.append("usd_price", 10);
            formdata.append("aed_price", 50);
            formdata.append("weight", values.weight);

            for (let i = 0; i < (roastingFile.length + 2); i++) {
              arrFiles.push(roastingFile[i]);
            }

            arrFiles.push(filesGambar)
            arrFiles.push(imageBlob)

            for (let i = 0; i < arrFiles.length; i++) {
              if((i+1) === arrFiles.length) {
                formdata.append('image[]', arrFiles[i], "" + roasting_id + ".png")
              } else {
                formdata.append('image[]', arrFiles[i])
              }
            }

            UserService.apiPostToMarketpalceKK(formdata).then(async (response) => {
              console.log('cek ini mal', response);
            })

            //Postman Kopi Ketjil (sekarang di hanlde di backend laravel)
            // try{
            //   var myHeaders = new Headers();
            //   myHeaders.append("x-api-key", "kk-blockchain-2021-dev");

            //   var arrFiles = [];

            //   var formdata = new FormData();
            //   formdata.append("category_id", "115");
            //   formdata.append("name", values.roastingName);
            //   if(values.roastingMenu === 'Single') {
            //     formdata.append("description", object.roasting[0] ? object.roasting[0].product.green_beans.description : response.data.roasting[0].product.green_beans.description);
            //   } else {
            //     formdata.append("description", json);
            //   }
            //   formdata.append("indonesia_price", "1000");
            //   formdata.append("usd_price", "10");
            //   formdata.append("aed_price", "50");

            //   for (let i = 0; i < (roastingFile.length + 2); i++) {
            //     arrFiles.push(roastingFile[i]);
            //   }

            //   arrFiles.push(filesGambar)
            //   arrFiles.push(imageBlob)

            //   for (let i = 0; i < arrFiles.length; i++) {
            //     if((i+1) === arrFiles.length) {
            //       formdata.append('image[]', arrFiles[i], "" + roasting_id + ".png")
            //     } else {
            //       formdata.append('image[]', arrFiles[i])
            //     }
            //   }

            //   var requestOptions = {
            //     method: "POST",
            //     headers: myHeaders,
            //     body: formdata,
            //     redirect: "follow",
            //   };

            //   fetch(
            //     "https://api-staging.kopiketjil.com/api/kopiketjil/insert-product",
            //     requestOptions
            //   )
            //     .then((response) => showResults(`Response API, ${response}`))
            //     .then((result) => console.log('result API',result))
            //     .catch((error) => showResults(`Response API, ${error}`));
            // } catch (e) {
            //   showResults(`Error Post To Kopi Ketjil, ${e}`);
            // }
          }
        );
      });

      showResults("Data has been added");
    } else {
      showResults("Please fill all the fields");
    }
  };

  const handleIDBatch = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear().toString().substr(-2);

    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + month;
    }

    let increment = 1;
    let incrementalResultIDBatch = "0" + increment;
    let resultIDBatch = "" + year + month + incrementalResultIDBatch;

    for (let i = 0; i < content.length; i++) {
      if (content[i].roasting_batch_id == resultIDBatch) {
        increment += 1;
        if (increment < 10) {
          incrementalResultIDBatch = "0" + increment;
        }
        else {
          incrementalResultIDBatch = increment;
        }
        resultIDBatch = "" + year + month + incrementalResultIDBatch;
      }
    }

    return resultIDBatch;
  };

  return (
    <Fragment>
      <AddRoastingForm
        onSubmit={handleSubmit}
        onSelectRoasting={onRoastingChange}
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

export default AddRoasting;
