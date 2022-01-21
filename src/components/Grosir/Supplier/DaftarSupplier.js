import { Fragment, React, useState } from "react";
import DaftarSupplierForm from "./DaftarSupplierForm";
import showResults from "../../showResults/showResults";
import UserService from "../../../services/user.service";
import { Redirect } from "react-router-dom";

const DaftarSupplier = () => {
  const [files, imageFile] = useState("");

  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [pindah, setPindah] = useState(false);

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
    console.log('cek values',values);

    formData.append("nama_supplier", values.nama_supplier);
    formData.append("lokasi_supplier", values.lokasi_supplier);
    formData.append("nama_petani", values.nama_petani);
    // formData.append("latitude", values.latitude);
    // formData.append("longitude", values.longitude);
    formData.append("latitude", parseFloat(values.latitude));
    formData.append("longitude", parseFloat(values.longitude));
    formData.append("link_maps", values.linkMaps);

    // kopi ketjil minta inputan ini dihilangkan karena tidak perlu
    // formData.append("estimatedProduction", values.estimatedProduction);

    formData.append("elevation", values.elevation);
    formData.append("unit", values.unit);

    formData.append("files", files);
    formData.append("fileName", files.name);

    UserService.addSupplier(formData).then(showResults("Data has been added"));

    setPindah(true);

    // if (
    //   values.nama_supplier != null &&
    //   values.lokasi_supplier != null &&
    //   values.nama_petani != null &&
    //   lat != "" &&
    //   long != "" &&
    //   values.estimatedProduction != null &&
    //   values.elevation != null &&
    //   values.unit != null &&
    //   files != ""
    // ) {
    //   formData.append("nama_supplier", values.nama_supplier);
    //   formData.append("lokasi_supplier", values.lokasi_supplier);
    //   formData.append("nama_petani", values.nama_petani);
    //   formData.append("latitude", lat);
    //   formData.append("longitude", long);
    //   formData.append("link_maps", values.linkMaps);
    //   formData.append("estimatedProduction", values.estimatedProduction);
    //   formData.append("elevation", values.elevation);
    //   formData.append("unit", values.unit);

    //   formData.append("files", files);
    //   formData.append("fileName", files.name);

    //   UserService.addSupplier(formData).then(showResults("Data has been added"));

    //   setPindah(true);
    // } else {
    //   showResults("Please fill all the fields");
    // }
  };

  if (pindah === true) {

    return <Redirect to="/listSupplier" />;

  } else {
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

  }
};

export default DaftarSupplier;
