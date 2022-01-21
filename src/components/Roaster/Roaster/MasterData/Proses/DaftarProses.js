import { Fragment } from "react";
import showResults from "../../../../showResults/showResults";
import DaftarProsesForm from "./DaftarProsesForm";
import UserService from "../../../../../services/user.service";

const DaftarProses = () => {
  const handleSubmit = (values) => {
    if (values.nama_proses && values.deskripsi_proses) {
      var raw = JSON.stringify(values);
      UserService.addProsesRoaster(raw).then(showResults("Data has been added"));
    } else {
      showResults("Please fill all the fields");
    }
  };

  return (
    <Fragment>
      <DaftarProsesForm onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default DaftarProses;
