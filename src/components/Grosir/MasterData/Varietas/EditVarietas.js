import { Fragment } from "react";
import showResults from "../../../showResults/showResults";
import UserService from "../../../../services/user.service";
import { useParams } from "react-router";
import EditProsesForm from "./EditVarietasForm";
import EditVarietasForm from "./EditVarietasForm";

const EditVarietas = () => {
  const { id } = useParams();

  const handleSubmit = (values) => {
    var raw = JSON.stringify(values);
    UserService.editJenis(id, raw).then(showResults("Data has been changed"));
  };

  return (
    <Fragment>
      <EditVarietasForm onSubmit={handleSubmit} jenisID={id} />
    </Fragment>
  );
};

export default EditVarietas;
