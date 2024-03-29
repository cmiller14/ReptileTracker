import React from "react";
export default Feeding

function Feeding(props) {
    return (props.trigger) ? (
        <>
            <div className="popup">
                <div className="popup-inner">
                    <h4>
                        {props.reptile.name}
                    </h4>
                    <form id="popup-pass">
                        
                        <label className="input-element">
                            Food Item:
                            <input
                                type="text"
                                value={props.foodItem}
                                onChange={e => props.setFoodItem(e.target.value)}>
                            </input>
                        </label>
                        
                    </form>
                    <button onClick={() => props.close()}>Close</button>
                    <button onClick={() => props.create()}>Create</button>
                </div>

            </div>
        </>
    ) : "";
  }