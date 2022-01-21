import { Fragment } from "react";
import AddProductForm from "./AddProductForm";
import showResults from "../../../showResults/showResults";
import UserService from "../../../../services/user.service";

const AddProducts = () => {
  const handleSubmit = async (values) => {
    if (values.product_id) {
      const formData = new FormData();
      formData.append("productID", values.product_id);
      UserService.addProductRoaster(formData).then(showResults("Data has been added"));
    } else if (
      values.product_name &&
      values.biji_id &&
      values.jenis_id &&
      values.proses_id &&
      values.supplier_id
    ) {
      const formData = new FormData();
      formData.append("name", values.product_name);
      formData.append("biji_id", values.biji_id);
      formData.append("jenis_id", values.jenis_id);
      formData.append("proses_id", values.proses_id);
      formData.append("supplier_id", values.supplier_id);

      formData.append("weight", values.weight);
      UserService.addProductRoaster(formData).then(showResults("Data has been added"));
    } else {
      showResults("Please fill all the fields");
    }
  };

  return (
    <Fragment>
      <AddProductForm onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default AddProducts;
