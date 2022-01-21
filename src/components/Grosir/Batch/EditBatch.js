import { Fragment, useState } from "react";
import showResults from "../../showResults/showResults";
import EditBatchForm from "./EditBatchForm";
import UserService from "../../../services/user.service";
import { useParams } from "react-router";

const EditBatch = () => {
  const { id } = useParams();

  const [imageFile, setImage] = useState("");
  const [certificateFile, setCertificate] = useState("");

  const handleSubmit = (values) => {
    const formData = new FormData();

    if (values.biji_id != undefined) {
      formData.append("biji_id", values.biji_id);
    }
    if (values.jenis_id != undefined) {
      formData.append("jenis_id", values.jenis_id);
    }
    if (values.proses_id != undefined) {
      formData.append("proses_id", values.proses_id);
    }
    if (values.supplier_id != undefined) {
      formData.append("supplier_id", values.supplier_id);
    }
    if (values.tgl_panen != undefined) {
      formData.append("tgl_panen", values.tgl_panen);
    }
    if (values.volume != undefined) {
      formData.append("volume", values.volume);
    }

    //Form Baru
    if (values.moisture != undefined) {
      formData.append("moisture", values.moisture);
    }
    if (values.videoCulture != undefined) {
      formData.append("video_culture", values.videoCulture);
    }
    if (values.storytelling != undefined) {
      formData.append("storytelling", values.storytelling);
    }

    if (imageFile != "") {
      formData.append("files[]", imageFile);
      // for (let i = 0; i < imageFile.length; i++) {
      //   formData.append("files[]", imageFile[i]);
      // }
    }
    if (certificateFile != "") {
      formData.append("certificate[]", certificateFile);
      // for (let i = 0; i < certificateFile.length; i++) {
      //   formData.append("certificate[]", certificateFile[i]);
      // }
    }

    UserService.editBatch(id, formData).then(showResults("Data has been changed"));
  };

  const onFileChange = (file) => {
    setImage(file);
  };

  const onCertificateChange = (file) => {
    setCertificate(file);
  };

  return (
    <Fragment>
      <EditBatchForm
        onSubmit={handleSubmit}
        onSelectImage={onFileChange}
        batchID={id}
        onSelectCertificate={onCertificateChange}
      />
    </Fragment>
  );
};

export default EditBatch;
