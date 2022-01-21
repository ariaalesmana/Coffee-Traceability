import { Fragment } from "react";
import showResults from "../../../../showResults/showResults";
import AddBeansForm from "./AddBeansForm";
import UserService from "../../../../../services/user.service";

const AddBeans = () => {
  const handleSubmit = (values) => {
    if (values.nama_biji && values.deskripsi_biji) {
      var raw = JSON.stringify(values);
      UserService.addBijiRoaster(raw).then(showResults("Data has been added"));
    } else {
      showResults("Please fill all the fields");
    }
  };

  return (
    <Fragment>
      <AddBeansForm onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default AddBeans;
