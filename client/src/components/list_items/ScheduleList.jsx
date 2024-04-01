import React from "react";
export default ScheduleList;

function printDay(day, type) {
    if (day) {
        return type;
    }
    else {
        return "Do nothing";
    }

}

function ScheduleList(props) {
    return (
        <>
        <div className="stuff-box" onClick={() => props.delete(props.id, "schedule")}>
            <h4>
                Type of schedule: {props.type}
            </h4>
            <h5>Description:</h5>
            <p>{props.description}</p>
            <table>
                <tbody>
                <tr>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                </tr>

                <tr>
                    <td>{printDay(props.monday, props.type )}</td>
                    <td>{printDay(props.tuesday, props.type )}</td>
                    <td>{printDay(props.wednesday, props.type )}</td>
                    <td>{printDay(props.thursday, props.type )}</td>
                    <td>{printDay(props.friday, props.type )}</td>
                    <td>{printDay(props.saturday, props.type )}</td>
                    <td>{printDay(props.sunday, props.type )}</td>
                </tr>
                    
                </tbody>
            </table>
        </div>
        </>
    )
}