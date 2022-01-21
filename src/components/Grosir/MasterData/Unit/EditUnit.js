import { Fragment } from "react";
import showResults from "../../../showResults/showResults";
import UserService from "../../../../services/user.service";
import { useParams } from "react-router";
import EditUnitForm from "./EditUnitForm";

const EditUnit = () => {
  const { id } = useParams();

  const handleSubmit = (values) => {
    var raw = JSON.stringify(values);
    UserService.editUnit(id, raw).then(showResults("Data has been changed"));
  };

  return (
    <Fragment>
      <EditUnitForm onSubmit={handleSubmit} unitID={id} />
    </Fragment>
  );
};

export default EditUnit;
