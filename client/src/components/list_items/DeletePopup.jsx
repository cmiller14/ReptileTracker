import React from "react";
export default DeletePopup

function DeletePopup(props) {
    return (props.trigger) ? (
        <>
            <div className="popup">
                <div className="popup-inner">
                    <h3>Do you wish to delete this item?</h3>
                    <button onClick={() => props.close()}>Close</button>
                    <button onClick={() => props.delete()}>Delete</button>
                </div>
            </div>
        </>
    ) : "";
}