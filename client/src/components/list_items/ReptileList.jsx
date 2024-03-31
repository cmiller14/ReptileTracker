import React from "react";
export default ReptileList;

function ReptileList(props) {
    return (
        <>
            <div className="stuff-box" onClick={e => props.navigate(`/reptile/${props.id}`)}>
                <h3>{props.name}</h3>
                <h4>{props.species}</h4>
            </div>
        </>
    )
}