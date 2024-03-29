import React from "react";
export default Feeding

function Feeding(props) {
    return (props.trigger) ? (
        <>
        <h1>
            {props.reptile.name}
        </h1>
        <h2>
            {props.reptile.descritpion}
        </h2>
        </>
    ) : "";
  }