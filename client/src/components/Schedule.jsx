import React from "react";
export default Schedule;

function printTrueFalse(day) {
    if (day) {
        return "true";
    }
    else {
        return "false";
    }
}

function Schedule(props) {
    return (
        <>
            <table>
                <tr>
                    <th>Reptile</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                </tr>
                
                {props.reptiles.map((reptile) => {
                    return (
                    <tr key={reptile.id}>
                        <td>{reptile.name}</td>
                        <td>{printTrueFalse(reptile.monday)}</td>
                        <td>{printTrueFalse(reptile.tuesday)}</td>
                        <td>{printTrueFalse(reptile.wednesday)}</td>
                        <td>{printTrueFalse(reptile.thursday)}</td>
                        <td>{printTrueFalse(reptile.friday)}</td>
                        <td>{printTrueFalse(reptile.saturday)}</td>
                        <td>{printTrueFalse(reptile.sunday)}</td>
                    </tr>
                    )
                })}
            </table>
        </>
    )

}

