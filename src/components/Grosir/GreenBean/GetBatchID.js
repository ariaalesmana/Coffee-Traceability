import React from "react";
import { useParams } from "react-router";

import ScanQRGreenBean from "./ScanQRGreenBean";

function GetBatchID() {
  const { code, id } = useParams();

  console.log('cek code', code);
  console.log('cek batch', id);

  return (
    <div>
      <ScanQRGreenBean code={code} batchId={id} />
    </div>
  );
}

export default GetBatchID;
