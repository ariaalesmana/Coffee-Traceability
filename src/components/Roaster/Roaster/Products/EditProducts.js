import { Fragment, useState, useEffect, useCallback, Component } from "react";
import EditProductForm from "./EditProductForm";
import showResults from "../../../showResults/showResults";
import UserService from "../../../../services/user.service";
import { useParams } from "react-router";

const EditProduct = () => {
  const { id } = useParams();

  const handleSubmit = async (values) => {
    if (values.product_id) {
      const formData = new FormData();
      formData.append("productID", values.product_id);
      UserService.editProduct(id, formData).then(
        showResults("Data has been changed")
      );
    } else {
      const formData = new FormData();

      if (values.product_name != null) {
        formData.append("name", values.product_name);
      }
      if (values.biji_id != null) {
        formData.append("biji_id", values.biji_id);
      }
      if (values.jenis_id != null) {
        formData.append("jenis_id", values.jenis_id);
      }
      if (values.proses_id != null) {
        formData.append("proses_id", values.proses_id);
      }
      if (values.supplier_id != null) {
        formData.append("supplier_id", values.supplier_id);
      }
      UserService.editProduct(id, formData).then(
        showResults("Data has been changed")
      );
    }
  };

  return (
    <Fragment>
      <EditProductForm onSubmit={handleSubmit} productID={id} />
    </Fragment>
  );
};

export default EditProduct;
