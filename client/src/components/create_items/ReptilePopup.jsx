import React from "react";
export default ReptilePopup

function ReptilePopup(props) {
    return (props.trigger) ? (
        <>
        <div className="popup">
            <div className="popup-inner">
                <h1>
                    {props.reptile.name}
                </h1>
                <h2>
                    {props.reptile.descritpion}
                </h2>
                <form id="popup-pass">
                    <label>
                        New Name:
                        <input>
                        </input>
                    </label>
                    <label>
                        New Description:
                        <input>
                        </input>
                    </label>
                </form>
                <button onClick={() => props.close()}>Close</button>
                <button>Update</button>
            </div>

        </div>

        </>
    ) : "";
  }
