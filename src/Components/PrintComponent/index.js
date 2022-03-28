import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function PrintComponent(props) {
  let PrintComponentRef = useRef();

  return (
    <>
      <ReactToPrint
        trigger={() => props.trigger}
        content={() => PrintComponentRef}
      />
      <div
        style={{ zoom: props.zoom }}
        className={"hiddenprint"}
        ref={(el) => (PrintComponentRef = el)}
      >
        {props.children}
      </div>
    </>
  );
}
