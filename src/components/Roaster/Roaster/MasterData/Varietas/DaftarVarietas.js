import { Fragment } from "react";
import showResults from "../../../../showResults/showResults";
import UserService from "../../../../../services/user.service";
import DaftarVarietasForm from "./DaftarVarietasForm";

const DaftarJenis = () => {
  const handleSubmit = (values) => {
    if (values.nama_jenis && values.deskripsi_jenis) {
      var raw = JSON.stringify(values);
      UserService.addJenisRoaster(raw).then(showResults("Data has been added"));
    } else {
      showResults("Please fill all the fields");
    }
  };

  return (
    <Fragment>
      <DaftarVarietasForm onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default DaftarJenis;
