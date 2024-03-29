import React from "react";
export default Husbandry

function Husbandry(props) {
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