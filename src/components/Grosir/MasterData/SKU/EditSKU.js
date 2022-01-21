import { Fragment, useState } from "react";
import showResults from "../../../showResults/showResults";
import UserService from "../../../../services/user.service";
import { useParams } from "react-router";
import EditSKUForm from "./EditSKUForm";
import { Redirect } from "react-router-dom";

const EditSKU = () => {
  const { id } = useParams();

  const [pindah, setPindah] = useState(false);

  const handleSubmit = (values) => {
    if (values.sku && values.name) {
      var raw = JSON.stringify(values);
      console.log(values);

      UserService.editSKU(id, raw).then((response) => {
          if(response.data.massage) {
              showResults(`${response.data.massage}`);
          } else {
              showResults("Data has been updated");

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
        <EditSKUForm onSubmit={handleSubmit} skuID={id} />
      </Fragment>
    );

  }
};

export default EditSKU;
