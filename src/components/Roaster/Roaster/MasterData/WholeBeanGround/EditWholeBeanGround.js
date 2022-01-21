import { Fragment } from "react";
import "../../Roaster.css";
import "../../RoasterMedia.css";
import showResults from "../../../../showResults/showResults";
import UserService from "../../../../../services/user.service";
import { useParams } from "react-router";
import EditWholeBeanGroundForm from "./EditWholeBeanGroundForm";

const EditWholeBeanGround = () => {
  const { id } = useParams();

  const handleSubmit = (values) => {
    var raw = JSON.stringify(values);
    UserService.editWholeBean(id, raw);

    showResults("Diubah");
  };

  return (
    <Fragment>
      <EditWholeBeanGroundForm onSubmit={handleSubmit} wholeBeanID={id} />
    </Fragment>
  );
};

export default EditWholeBeanGround;
