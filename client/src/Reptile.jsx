import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { useApi } from "./utils/use_api";
import { requireLogin } from "./utils/require_login";
import ReptilePopup from "./components/create_items/ReptilePopup";
import Feeding from "./components/create_items/Feeding";
import Husbandry from "./components/create_items/Husbandry";
import ReptileSchedule from "./components/create_items/ReptileSchedule";




export const Reptile = () => {
    const location = useLocation();

    const api = useApi();
    requireLogin();

    const [reptile, setReptile] = useState(null);
    const [updateReptileTrigger, setUpdateReptileTrigger] = useState(false);
    const [createFeedingTrigger, setCreateFeedingTrigger] = useState(false);
    const [createHusbandryTrigger, setCreateHusbandryTrigger] = useState(false);
    const [createScheduleTrigger, setCreateScheduleTrigger] = useState(false);
    const [feedings, setFeedings] = useState(null);
    const [husbandryRecords, setHusbandryRecords] = useState(null);
    const [schedules, setSchedules] = useState(null);

    useEffect(() => {
        getReptile();
    }, []);

    async function getReptile() {
        const path = location.pathname;
        const reptileId = path.slice(-1);
        const {reptile} = await api.get(`/reptiles/${reptileId}`);
        setReptile(reptile);
    }

    function createFeeding() {
        setCreateFeedingTrigger(true);
    }

    function updateReptile() {
        setUpdateReptileTrigger(true);
    }

    function createHusbandry() {
        setCreateHusbandryTrigger(true);
    }

    function createSchedule() {
        setCreateScheduleTrigger(true);
    }

    return (
        <>
            <div>{reptile && <h2>{reptile.name}</h2>}</div>
            <div>{reptile && <p>{reptile.description}</p>}</div>
            <button onClick={() =>setUpdateReptileTrigger(true)}>Update Reptile</button>
            <button>Create Feeding</button>
            <button>Create Husbandry Record</button>
            <button>Create Schedule</button>
            <div>
                <h3>Feedings</h3>
            </div>
            <div>
                <h3>Husbandry Records</h3>
            </div>
            <div>
                <h3>Schedules</h3>
            </div>

            <ReptilePopup
            trigger={updateReptileTrigger}
            reptile={reptile}
            close={()=> {setUpdateReptileTrigger(false)}}
            />

        </>
    );
}