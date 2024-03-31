import React from "react";
export default Husbandry

function Husbandry(props) {
    return (props.trigger) ? (
        <>
            <div className="popup">
                <div className="popup-inner">
                    <h4>
                        {props.reptile.name}
                    </h4>
                    <form id="popup-pass">
                        
                        <label className="input-element">
                            Length:
                            <input
                                type="number"
                                step="0.01"
                                value={props.length}
                                onChange={e => props.setLength(e.target.valueAsNumber)}>
                            </input>
                        </label>
                        <label className="input-element">
                            Weight:
                            <input
                                type="number"
                                step="0.01"
                                value={props.weight}
                                onChange={e => props.setWeight(e.target.valueAsNumber)}>
                            </input>
                        </label>
                        <label className="input-element">
                            Temperature:
                            <input
                                type="number"
                                step="0.01"
                                value={props.temperature}
                                onChange={e => props.setTemperature(e.target.valueAsNumber)}>
                            </input>
                        </label>
                        <label className="input-element">
                            Humidity:
                            <input
                                type="number"
                                step="0.01"
                                value={props.humidity}
                                onChange={e => props.setHumidity(e.target.valueAsNumber)}>
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