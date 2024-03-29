import React from "react";
export default ReptileSchedule

function ReptileSchedule(props) {
    return (props.trigger) ? (
        <>
            <div className="popup">
                <div className="popup-inner">
                    <h4>
                        {props.reptile.name}
                    </h4>
                    <form id="popup-pass">
                        
                        <label className="input-element">
                            Choose schedule type:
                            <select onChange={e => props.setType(e.target.value)}>
                                <option value="clean">Clean</option>
                                <option value="record">Record</option>
                                <option value="feed">Feed</option>
                            </select>
                        </label>
                        <label className="input-element">
                            Monday:
                            <input type="checkbox" value="true" onChange={e => props.setMonday(e.target.value ? true : false)}>
                            </input>
                        </label>
                        <label className="input-element">
                            Tuesday:
                            <input type="checkbox" value="true" onChange={e => props.setTuesday(e.target.value ? true : false)}>
                            </input>
                        </label>
                        <label className="input-element">
                            Wednesday:
                            <input type="checkbox" value="true" onChange={e => props.setWednesday(e.target.value ? true : false)}>
                            </input>
                        </label>
                        <label className="input-element">
                            Thursday:
                            <input type="checkbox" value="true" onChange={e => props.setThursday(e.target.value ? true : false)}>
                            </input>
                        </label>
                        <label className="input-element">
                            Friday:
                            <input type="checkbox" value="true" onChange={e => props.setFriday(e.target.value ? true : false)}>
                            </input>
                        </label>
                        <label className="input-element">
                            Saturday:
                            <input type="checkbox" value="true" onChange={e => props.setSaturday(e.target.value ? true : false)}>
                            </input>
                        </label>
                        <label className="input-element">
                            Sunday:
                            <input type="checkbox" value="true" onChange={e => props.setSunday(e.target.value ? true : false)}>
                            </input>
                        </label>
                        <label className="input-element">
                            Description:
                            <textarea onChange={e => props.setDescription(e.target.value)}>
                            </textarea>
                        </label>
                        
                    </form>
                    <button onClick={() => props.close()}>Close</button>
                    <button onClick={() => props.create()}>Create</button>
                </div>

            </div>
        </>
    ) : "";
  }