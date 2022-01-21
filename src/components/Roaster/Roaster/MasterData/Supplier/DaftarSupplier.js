import { Fragment, React, useState } from "react";
import DaftarSupplierForm from "./DaftarSupplierForm";
import showResults from "../../../../showResults/showResults";
import UserService from "../../../../../services/user.service";

const DaftarSupplier = () => {
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
    if (
      values.nama_supplier &&
      values.lokasi_supplier &&
      values.nama_petani &&
      lat != "" &&
      long != "" &&
      values.estimatedProduction &&
      values.elevation &&
      values.unit &&
      files != ""
    ) {
      const formData = new FormData();
      formData.append("nama_supplier", values.nama_supplier);
      formData.append("lokasi_supplier", values.lokasi_supplier);
      formData.append("nama_petani", values.nama_petani);
      formData.append("latitude", lat);
      formData.append("longitude", long);
      formData.append("estimatedProduction", values.estimatedProduction);
      formData.append("elevation", values.elevation);
      formData.append("unit", values.unit);

      formData.append("files", files);
      formData.append("fileName", files.name);

      UserService.addSupplierRoaster(formData).then(
        showResults("Data has been added")
      );
    } else {
      showResults("Please fill all the fields");
    }
  };

  return (
    <Fragment>
      <DaftarSupplierForm
        onSubmit={handleSubmit}
        onSelectImage={onFileChange}
        onSelectLat={onLatChange}
        onSelectLong={onLongChange}
      />
    </Fragment>
  );
};

export default DaftarSupplier;
