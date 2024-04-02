import React from "react";
export default ReptileList;

function ReptileList(props) {
    return (
        <>
            <div className="stuff-box" onClick={e => props.navigate(`/reptile/${props.id}`)}>
                <h3>{props.name}</h3>
                <h4>{props.printSpecies(props.reptile)}</h4>
            </div>
        </>
    )
}