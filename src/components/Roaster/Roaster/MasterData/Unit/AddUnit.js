import { Fragment } from "react";
import showResults from "../../../../showResults/showResults";
import AddUnitForm from "./AddUnitForm";
import UserService from "../../../../../services/user.service";

const AddUnit = () => {
  const handleSubmit = (values) => {
    if (values.nama_unit) {
      var raw = JSON.stringify(values);
      UserService.addUnitRoaster(raw).then(showResults("Data has been added"));
    } else {
      showResults("Please fill all the fields");
    }
  };

  return (
    <Fragment>
      <AddUnitForm onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default AddUnit;
