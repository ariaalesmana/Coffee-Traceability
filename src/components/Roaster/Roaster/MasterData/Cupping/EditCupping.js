import { Fragment, useState } from "react";
import showResults from "../../../../showResults/showResults";
import UserService from "../../../../../services/user.service";
import { useParams } from "react-router";
import EditCuppingForm from "./EditCuppingForm";

const EditCupping = () => {
  const { id } = useParams();

  const [certificateFile, setCertificateFile] = useState("");

  const handleSubmit = (values) => {
    const formData = new FormData();

    if (values.curated_date != undefined) {
      formData.append("curated_date", values.curated_date);
    }
    if (values.curated_by != undefined) {
      formData.append("curated_by", values.curated_by);
    }
    if (values.fragrance_aroma != undefined) {
      formData.append("fragrance_aroma", values.fragrance_aroma);
    }
    if (values.flavor != undefined) {
      formData.append("flavor", values.flavor);
    }
    if (values.aftertaste != undefined) {
      formData.append("aftertaste", values.aftertaste);
    }
    if (values.acidity != undefined) {
      formData.append("acidity", values.acidity);
    }
    if (values.body != undefined) {
      formData.append("body", values.body);
    }
    if (values.cupping_score != undefined) {
      formData.append("cupping_score", values.cupping_score);
    }
    if (values.category != undefined) {
      formData.append("category", values.category);
    }
    if (certificateFile != "") {
       formData.append("certificateFile", certificateFile);
       formData.append("certificateFileName", certificateFile.name);
      //  formData.append("certificateFile[]", certificateFile);
      // for (let i = 0; i < certificateFile.length; i++) {
      //   formData.append("certificateFile[]", certificateFile[i]);
      // }
    }
    UserService.editCupping(id, formData).then(
      showResults("Data has been changed")
    );
  };

  const onCertificateChange = (file) => {
    setCertificateFile(file);
  };

  return (
    <Fragment>
      <EditCuppingForm 
        onSubmit={handleSubmit} 
        cuppingID={id} 
        onSelectCertificate={onCertificateChange} />
    </Fragment>
  );
};

export default EditCupping;
