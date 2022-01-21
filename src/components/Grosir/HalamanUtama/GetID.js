import React from "react";
import { useParams } from "react-router";

import HalamanUtama from "./HalamanUtama";

function GetId() {
  const { id, code } = useParams();

  return (
    <div>
      <HalamanUtama productID={id} code={code} />
    </div>
  );
}

export default GetId;
