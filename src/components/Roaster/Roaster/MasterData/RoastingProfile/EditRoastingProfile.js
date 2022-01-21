import { Fragment } from "react";
import showResults from "../../../../showResults/showResults";
import UserService from "../../../../../services/user.service";
import { useParams } from "react-router";
import EditRoastingProfileForm from "./EditRoastingProfileForm";

const EditRoastingProfile = () => {
  const { id } = useParams();

  const handleSubmit = (values) => {
    var raw = JSON.stringify(values);
    UserService.editRoastingProfile(id, raw).then(showResults("Data has been changed"));
  };

  return (
    <Fragment>
      <EditRoastingProfileForm onSubmit={handleSubmit} roastingProfileID={id} />
    </Fragment>
  );
};

export default EditRoastingProfile;
