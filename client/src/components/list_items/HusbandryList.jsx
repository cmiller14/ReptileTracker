import React from "react";
import { printDate } from "../../utils/print_functions";
export default HusbandryList;

function HusbandryList(props) {
    return (
        <>
        <div className="stuff-box" onClick={() => props.delete(props.id, "husbandry")}>
            <h4>
                Reptile Length: {props.length}
            </h4>
            <h4>
                Reptile Weight: {props.weight}
            </h4>
            <h4>
                Reptile Temperature: {props.temperature}
            </h4>
            <h4>
                Reptile Humidity: {props.humidity}
            </h4>
            <h4>
                Reptile Recored at: {printDate(props.createdAt)}
            </h4>
        </div>
        </>
    )
}