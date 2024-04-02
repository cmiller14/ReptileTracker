import React from "react";
export default ReptileCreate

function ReptileCreate(props) {
    return (props.trigger) ? (
        <>
        <div className="popup">
            <div className="popup-inner">
                <h1>
                    New Reptile
                </h1>
                <form id="popup-pass">
                    
                    <label className="input-element">
                        Name:
                        <input
                            type="text"
                            value={props.name}
                            onChange={e => props.setName(e.target.value)}>
                        </input>
                    </label>
                    <label className="input-element">
                        Sex:
                        <select onChange={e => props.setSex(e.target.value)}>
                                <option value="m">Male</option>
                                <option value="f">Female</option>
                        </select>
                    </label>
                    <label className="input-element">
                        Species:
                        <select onChange={e => props.setSpecies(e.target.value)}>
                                <option value="ball_python">Ball Python</option>
                                <option value="king_snake">King Snake</option>
                                <option value="corn_snake">Corn Snake</option>
                                <option value="redtail_boa">Redtail Boa</option>
                        </select>
                    </label>
                    
                </form>
                <button onClick={() => props.close()}>Close</button>
                <button onClick={() => props.create()}>Create</button>
            </div>

        </div>

        </>
    ) : "";
  }