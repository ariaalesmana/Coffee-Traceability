import { Fragment } from "react";
import showResults from "../../../../showResults/showResults";
import UserService from "../../../../../services/user.service";
import { useParams } from "react-router";
import EditProsesForm from "./EditProsesForm";

const EditProses = () => {
  const { id } = useParams();

  const handleSubmit = (values) => {
    var raw = JSON.stringify(values);
    UserService.editProsesRoaster(id, raw).then(showResults("Data has been changed"));
  };

  return (
    <Fragment>
      <EditProsesForm onSubmit={handleSubmit} prosesID={id} />
    </Fragment>
  );
};

export default EditProses;
