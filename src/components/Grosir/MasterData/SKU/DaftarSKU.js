import { Fragment, useState } from "react";
import showResults from "../../../showResults/showResults";
import DaftarSKUForm from "./DaftarSKUForm";
import UserService from "../../../../services/user.service";
import { Redirect } from "react-router-dom";

const DaftarSKU = () => {
  const [pindah, setPindah] = useState(false);

  const handleSubmit = (values) => {

    if (values.sku && values.name) {
      var raw = JSON.stringify(values);

      UserService.addSKU(raw).then((response) => {
        if(response.data.massage) {
          showResults(`${response.data.massage}`);
        } else {
          showResults("Data has been added");
          setPindah(true);
        }
      });
    } else {
      showResults("Please fill all the fields");
    }

  };

  if (pindah === true) {

    return <Redirect to="/listBiji" />;

  } else {
    return (
      <Fragment>
        <DaftarSKUForm onSubmit={handleSubmit} />
      </Fragment>
    );

  }
};

export default DaftarSKU;
