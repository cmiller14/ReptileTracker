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

function getSchedule(reptile, schedules) {
    for (let schedule of schedules) {
        if (schedule.reptileId == reptile.id) {
            return schedule;
        }
    }
    return {}; 
}

function Schedule(props) {
    return (
        <>
            <table>
                <tbody>
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
                    const schedule = getSchedule(reptile, props.schedules);
                    return (
                    <tr key={reptile.id}>
                        <td>{reptile.name}</td>
                        <td>{printTrueFalse(schedule.monday)}</td>
                        <td>{printTrueFalse(schedule.tuesday)}</td>
                        <td>{printTrueFalse(schedule.wednesday)}</td>
                        <td>{printTrueFalse(schedule.thursday)}</td>
                        <td>{printTrueFalse(schedule.friday)}</td>
                        <td>{printTrueFalse(schedule.saturday)}</td>
                        <td>{printTrueFalse(schedule.sunday)}</td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )

}

