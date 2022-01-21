import { Fragment } from "react";
import AddRoastingProfileForm from "./AddRoastingProfileForm";
import showResults from "../../../../showResults/showResults";
import UserService from "../../../../../services/user.service";

const AddRoastingProfile = () => {
  const handleSubmit = (values) => {
    if (values.roasting_profile) {
      var raw = JSON.stringify(values);
      UserService.addRoastingProfile(raw).then(
        showResults("Data has been added")
      );
    } else {
      showResults("Please fill all the fields");
    }
  };

  return (
    <Fragment>
      <AddRoastingProfileForm onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default AddRoastingProfile;
