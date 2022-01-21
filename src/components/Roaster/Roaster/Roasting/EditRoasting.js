import { Fragment, useState } from "react";
import EditRoastingForm from "./EditRoastingForm";
import showResults from "../../../showResults/showResults";
import UserService from "../../../../services/user.service";
import { useParams } from "react-router";

const EditRoasting = () => {
  const { id } = useParams();

  const [roastingFile, setRoastingFile] = useState("");
  const [filesGambar, imageFileGambar] = useState("");

  const onFileChangeGambar = (file) => {
    imageFileGambar(file);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    
    if (values.roastingName != null) {
      formData.append("roasting_name", values.roastingName);
    }
    if (values.roastingCupping != null) {
      formData.append("cupping_id", values.roastingCupping);
    }
    if (values.roastingProfile != null) {
      formData.append("roasting_profile_id", values.roastingProfile);
    }
    if (values.flavorNote != null) {
      formData.append("flavor_note", values.flavorNote);
    }
    if (values.acidity != null) {
      formData.append("acidity", values.acidity);
    }
    if (values.intensity != null) {
      formData.append("intensity", values.intensity);
    }
    if (values.tgl_roasting != null) {
      formData.append("tgl_roasting", values.tgl_roasting);
    }
    if (values.sku != null) {
      formData.append("sku", values.sku);
    }
    if (values.roaster_name != null) {
      formData.append("roaster_name", values.roaster_name);
    }
    if (values.bean != null) {
      formData.append("bean_id", values.bean);
    }
    if (roastingFile != undefined) {
      formData.append("roastingFile", roastingFile);
      formData.append("roastingFileName", roastingFile.name);
      // for (let i = 0; i < roastingFile.length; i++) {
      //   formData.append("roastingFile[]", roastingFile[i]);
      // }
    }
    if (filesGambar != "") {
      formData.append("files_gambar", filesGambar);
      formData.append("fileName_gambar", filesGambar.name);
    }

    UserService.editRoastingProduct(id, formData);
    showResults("Data has been changed");
  };

  const onRoastingChange = (file) => {
    setRoastingFile(file);
  };

  return (
    <Fragment>
      <EditRoastingForm
        onSubmit={handleSubmit}
        roastingID={id}
        onSelectRoasting={onRoastingChange}
        onSelectImageGambar={onFileChangeGambar}
      />
    </Fragment>
  );
};

export default EditRoasting;
