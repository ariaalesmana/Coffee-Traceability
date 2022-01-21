import { Fragment, useState } from "react";
import showResults from "../../../showResults/showResults";
import UserService from "../../../../services/user.service";
import { useParams } from "react-router";
import EditPOForm from "./EditPOForm";
import { Redirect } from "react-router-dom";

const EditPO = () => {
  const { id } = useParams();

  const [pindah, setPindah] = useState(false);
  const [date, setDate] = useState(false);

  const handleDate = (tgl) => {
    setDate(tgl);
  };

  const handleSubmit = (values) => {
    if(values.po_number &&
      date &&
      values.buyer_name
    ) {
      const formData = new FormData();
      formData.append("po_number", values.po_number);
      formData.append("po_date", date);
      formData.append("buyer_name", values.buyer_name);

      UserService.editPO(id, formData).then((response) => {
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
        <EditPOForm onSubmit={handleSubmit} poID={id} onSelectDate={handleDate} />
      </Fragment>
    );

  }
};

export default EditPO;
