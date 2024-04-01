import React from "react";
import { printDate } from "../../utils/print_date";
export default FeedingList;


function FeedingList(props) {
    return (
        <>
        <div className="stuff-box" onClick={() => props.delete(props.id, "feeding")}>
            <h4>
                Food item: {props.foodItem}
            </h4>
            <h4>
                Fed at: {printDate(props.createdAt)}
            </h4>
        </div>
        </>
    )
}