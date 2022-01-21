import { Fragment } from "react";
import ShowProdukForm from "./ShowProdukForm";
import { useParams } from "react-router";

const ShowProduk = () => {
  const { id } = useParams();

  return (
    <Fragment>
      <ShowProdukForm productID={id} />
    </Fragment>
  );
};

export default ShowProduk;
