import { Fragment } from "react";
import showResults from "../../../showResults/showResults";
import DaftarBijiForm from "./DaftarBijiForm";
import UserService from "../../../../services/user.service";

const DaftarBiji = () => {
  const handleSubmit = (values) => {
    if (values.nama_biji == null || values.deskripsi_biji == null) {
      showResults("Please fill all the fields");
    }
    if (values.nama_biji != null && values.deskripsi_biji != null) {
      var raw = JSON.stringify(values);
      UserService.addBiji(raw).then(showResults("Data has been added"));
    }
  };

  return (
    <Fragment>
      <DaftarBijiForm onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default DaftarBiji;
