import { Fragment, React, useState } from "react";
import showResults from "../../../../showResults/showResults";
import UserService from "../../../../../services/user.service";
import { useParams } from "react-router";
import EditSupplierForm from "./EditSupplierForm";

const EditSupplier = () => {
  const { id } = useParams();

  const [files, imageFile] = useState("");

  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const onFileChange = (file) => {
    imageFile(file);
  };

  const onLatChange = (latitude) => {
    setLat(latitude);
  };

  const onLongChange = (longitude) => {
    setLong(longitude);
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    if (values.nama_supplier != null) {
      formData.append("nama_supplier", values.nama_supplier);
    }
    if (values.lokasi_supplier != null) {
      formData.append("lokasi_supplier", values.lokasi_supplier);
    }
    if (values.nama_petani != null) {
      formData.append("nama_petani", values.nama_petani);
    }

    if (lat != "" && long != "") {
      formData.append("latitude", lat);
      formData.append("longitude", long);
    }

    if (values.estimatedProduction != null) {
      formData.append("estimatedProduction", values.estimatedProduction);
    }

    if (values.elevation != null) {
      formData.append("elevation", values.elevation);
    }

    if (values.unit != null) {
      formData.append("unit", values.unit);
    }

    formData.append("files", files);
    formData.append("fileName", files.name);

    UserService.editSupplierRoaster(id, formData).then(showResults("Data has been changed"));
  };

  return (
    <Fragment>
      <EditSupplierForm
        onSubmit={handleSubmit}
        onSelectImage={onFileChange}
        supplierID={id}
        onSelectLat={onLatChange}
        onSelectLong={onLongChange}
      />
    </Fragment>
  );
};

export default EditSupplier;
