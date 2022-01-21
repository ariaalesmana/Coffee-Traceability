import { Fragment } from "react";
import "../../Roaster.css";
import "../../RoasterMedia.css";
import showResults from "../../../../showResults/showResults";
import UserService from "../../../../../services/user.service";
import AddWholeBeanGroundForm from "./AddWholeBeanGroundForm";

const AddGroundWhole = () => {
  const handleSubmit = (values) => {
    var raw = JSON.stringify(values);
    UserService.addWholeBean(raw).then(
      (response) => {},
      (error) => {}
    );
    showResults("Dimasukkan");
  };

  return (
    <Fragment>
      <AddWholeBeanGroundForm onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default AddGroundWhole;
