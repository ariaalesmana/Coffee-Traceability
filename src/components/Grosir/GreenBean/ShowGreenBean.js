import { Fragment } from "react";
import ShowGreenBeanForm from "./ShowGreenBeanForm";
import { useParams } from "react-router";

const ShowGreenBean = () => {
  const { id } = useParams();

  return (
    <Fragment>
      <ShowGreenBeanForm productID={id} />
    </Fragment>
  );
};

export default ShowGreenBean;
