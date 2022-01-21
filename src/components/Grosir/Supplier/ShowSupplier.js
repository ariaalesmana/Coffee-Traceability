import { Fragment, React, useState } from "react";
import showResults from "../../showResults/showResults";
import UserService from "../../../services/user.service";
import { useParams } from "react-router";
import ShowSupplierForm from "./ShowSupplierForm";
import { Redirect } from "react-router-dom";

const ShowSupplier = () => {
    const { id } = useParams();
 
    return (
      <Fragment>
        <ShowSupplierForm supplierID={id} />
      </Fragment>
    );
};

export default ShowSupplier;
