import React from "react";
import { useParams } from "react-router";

import CuppingScanDetail from "./CuppingScanDetail";

function GetCupping() {
  const { id, code } = useParams();

  return (
    <div>
      <CuppingScanDetail CuppingId={id} code={code} />
    </div>
  );
}

export default GetCupping;
