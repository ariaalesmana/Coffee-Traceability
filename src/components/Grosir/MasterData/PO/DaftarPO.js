import { Fragment, useState } from "react";
import showResults from "../../../showResults/showResults";
import DaftarPOForm from "./DaftarPOForm";
import UserService from "../../../../services/user.service";
import { Redirect } from "react-router-dom";

const DaftarPO = () => {

  const [pindah, setPindah] = useState(false);
  const [date, setDate] = useState("");

  const handleDate = (tgl) => {
    setDate(tgl);
  };

  const handleSubmit = (values) => {
    console.log(date);
    if(values.po_number &&
      date != "" &&
      values.buyer_name
    ) {
      // var raw = JSON.stringify(values);
      const formData = new FormData();
      formData.append("po_number", values.po_number);
      formData.append("po_date", date);
      formData.append("buyer_name", values.buyer_name);

      UserService.addPO(formData).then((response) => {
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
        <DaftarPOForm onSubmit={handleSubmit} onSelectDate={handleDate} />
      </Fragment>
    );

  }
};

export default DaftarPO;
