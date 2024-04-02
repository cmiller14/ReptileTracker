import React from "react";
export default Schedule;

function getReptile(reptiles, schedule, today) {
    for (let reptile of reptiles) {
        if (schedule.reptileId == reptile.id) {
            return reptile;
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
                    <th>Task</th>
                    <th>Description</th>
                </tr>
                
                {props.schedules.map((schedule) => {
                    const reptile = getReptile(props.reptiles, schedule);
                    const today = props.today;
                    return (schedule[today] ?
                    <tr key={reptile.id}>
                        <td>{reptile.name}</td>
                        <td>{schedule.type}</td>
                        <td></td>
                    </tr>
                    : "")
                })}
                </tbody>
            </table>
        </>
    )

}

