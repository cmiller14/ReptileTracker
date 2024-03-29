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
                    
                    <label className="input-element">
                        New Name:
                        <input
                            type="text"
                            value={props.name}
                            onChange={e => props.setName(e.target.value)}>
                        </input>
                    </label>
                    <label className="input-element">
                        Change Sex:
                        <input
                        value={props.sex}
                        onChange={e => props.setSex(e.target.value)}>
                        </input>
                    </label>
                    <label className="input-element">
                        Change Species:
                        <input
                        value={props.species}
                        onChange={e => props.setSpecies(e.target.value)}>
                        </input>
                    </label>
                    
                </form>
                <button onClick={() => props.close()}>Close</button>
                <button onClick={() => props.update()}>Update</button>
            </div>

        </div>

        </>
    ) : "";
  }
