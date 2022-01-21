import { Fragment } from "react";
import showResults from "../../../showResults/showResults";
import DaftarUnitForm from "./DaftarUnitForm";
import UserService from "../../../../services/user.service";

const DaftarUnit = () => {
  const handleSubmit = (values) => {
    if (values.nama_unit == null) {
      showResults("Please fill all the fields");
    }
    if (values.nama_unit != null) {
      var raw = JSON.stringify(values);
      UserService.addUnit(raw).then(showResults("Data has been added"));
    }
  };

  return (
    <Fragment>
      <DaftarUnitForm onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default DaftarUnit;
