import { Fragment, useState, useEffect } from "react";
import AddCuppingForm from "./AddCuppingForm";
import QRcode from "qrcode.react";
import showResults from "../../../../showResults/showResults";
import UserService from "../../../../../services/user.service";

const AddCupping = (props) => {
  const code = props.code;
  const [certificateFile, setCertificateFile] = useState("");

  const [qr, setQr] = useState("test");
  const handleChange = (value) => {
    setQr(value);
  };

  const downloadQR = (produkId, cuppingId) => {
    const canvas = document.getElementById("myqr");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "" + produkId + "/" + cuppingId + ".png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleSubmit = (values) => {

    console.log('cek valuenya nih', values);
    const formData = new FormData();

     if (
      values.productId &&
      values.curated_date &&
      values.curated_by &&
      values.fragrance_aroma &&
      values.flavor &&
      values.aftertaste &&
      values.acidity &&
      values.body &&
      values.cupping_score &&
      values.category &&
      certificateFile != ""
    ) {
      formData.append("productId", values.productId);
      formData.append("curated_date", values.curated_date);
      formData.append("curated_by", values.curated_by);
      formData.append("fragrance_aroma", values.fragrance_aroma);
      formData.append("flavor", values.flavor);
      formData.append("aftertaste", values.aftertaste);
      formData.append("acidity", values.acidity);
      formData.append("body", values.body);
      formData.append("cupping_score", values.cupping_score);
      formData.append("category", values.category);

      // formData.append("certificateFile[]", certificateFile);
      // for (let i = 0; i < certificateFile.length; i++) {
      //   formData.append("certificateFile[]", certificateFile[i]);
      // }
      formData.append("certificateFile", certificateFile);
      formData.append("certificateFileName", certificateFile.name);

      UserService.addCupping(formData).then(async (response) => {
      console.log("cek response cupping", response);
        const linkQRCode =
          process.env.REACT_APP_PROD_URL +
          "Cupping/" +
          code +
          "/" +
          response.data.data.id;
        await handleChange(linkQRCode);

        const canvas = document.getElementById("myqr");
        let imageBlob = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/png")
        );

        let formDataQR = new FormData();
        formDataQR.append("files_qr", imageBlob, "" + response.data.data.id + ".png");
        console.log("gambar qr", imageBlob, "" + response.data.data.id + ".png");
        formDataQR.append("fileName_qr", "" + response.data.data.id + ".png");

        downloadQR(values.productId, response.data.data.id);

        UserService.pushQRCodeImageCupping(response.data.data.id, formDataQR);

        showResults("Data has been added")
      });



    } else {
      showResults("Please fill all the fields");
    }
  };

  const onCertificateChange = (file) => {
    setCertificateFile(file);
  };

  return (
    <Fragment>
      <AddCuppingForm 
        onSubmit={handleSubmit}
        onSelectCertificate={onCertificateChange} 
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

export default AddCupping;
