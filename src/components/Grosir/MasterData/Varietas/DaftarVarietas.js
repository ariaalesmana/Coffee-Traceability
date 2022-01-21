import { Fragment } from "react";
import showResults from "../../../showResults/showResults";
import UserService from "../../../../services/user.service";
import DaftarVarietasForm from "./DaftarVarietasForm";

const DaftarJenis = () => {
  const handleSubmit = (values) => {
    if (values.nama_jenis == null || values.deskripsi_jenis == null) {
      showResults("Please fill all the fields");
    }
    if (values.nama_jenis != null && values.deskripsi_jenis != null) {
      var raw = JSON.stringify(values);
      UserService.addJenis(raw).then(showResults("Data has been added"));
    }
  };

  return (
    <Fragment>
      <DaftarVarietasForm onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default DaftarJenis;
