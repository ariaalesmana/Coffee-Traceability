import { Fragment } from "react";
import showResults from "../../../showResults/showResults";
import DaftarProsesForm from "./DaftarProsesForm";
import UserService from "../../../../services/user.service";

const DaftarProses = () => {
  const handleSubmit = (values) => {
    if (values.nama_proses == null || values.deskripsi_proses == null) {
      showResults("Please fill all the fields");
    }
    if (values.nama_proses != null && values.deskripsi_proses != null) {
      var raw = JSON.stringify(values);
      UserService.addProses(raw).then(showResults("Data has been added"));
    }
  };

  return (
    <Fragment>
      <DaftarProsesForm onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default DaftarProses;
