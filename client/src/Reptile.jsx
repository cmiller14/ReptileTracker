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

    
    // triggers
    const [updateReptileTrigger, setUpdateReptileTrigger] = useState(false);
    const [createFeedingTrigger, setCreateFeedingTrigger] = useState(false);
    const [createHusbandryTrigger, setCreateHusbandryTrigger] = useState(false);
    const [createScheduleTrigger, setCreateScheduleTrigger] = useState(false);
    // objects
    const [reptile, setReptile] = useState(null);
    const [feedings, setFeedings] = useState(null);
    const [husbandryRecords, setHusbandryRecords] = useState(null);
    const [schedules, setSchedules] = useState(null);
    const [user, setUser] = useState(null);
    // reptile update values
    const [reptileNameUpdate, setReptileNameUpdate] = useState("");
    const [reptileSexUpdate, setReptileSexUpdate] = useState("");
    const [reptileSpeciesUpdate, setReptileSpeciesUpdate] = useState("");
    // create feeding values
    const [foodItem, setFoodItem] = useState("");
    // create Husbandry Record Values
    const [temperature, setTemperature] = useState(0);
    const [weight, setWeight] = useState(0);
    const [length, setLength] = useState(0);
    const [humidity, setHumidity] = useState(0);
    // create schedule values
    const [type, setType] = useState("clean");
    const [monday, setMonday] = useState(false);
    const [tuesday, setTuesday] = useState(false);
    const [wednesday, setWednesday] = useState(false);
    const [thursday, setThursday] = useState(false);
    const [friday, setFriday] = useState(false);
    const [saturday, setSaturday] = useState(false);
    const [sunday, setSunday] = useState(false);
    const [description, setDescription] = useState("");

    useEffect(() => {
        getReptile();
        getUser();
    }, []);

    async function getUser() {
        const {user} = await api.get("/users/me");
        setUser(user);
      }

    async function getReptile() {
        const path = location.pathname;
        const reptileId = path.slice(-1);
        const {reptile} = await api.get(`/reptiles/${reptileId}`);
        setReptile(reptile);
    }

    async function getFeedings() {
        const {feedings} = await api.get(`/feeding/reptile/${reptile.id}`);
        setFeedings(feedings);
    }

    async function createFeeding() {
        setCreateFeedingTrigger(false);
        const feeding = await api.post("/feeding", {
            reptileId: reptile.id,
            foodItem: foodItem
        });
        getReptile();
    }

    async function updateReptile() {
        setUpdateReptileTrigger(false);
        const res = await api.put(`/reptiles/${reptile.id}`, {
            id: reptile.id,
            name: reptileNameUpdate,
            sex: reptileSexUpdate,
            species: reptileSpeciesUpdate
        });
        setReptile(res.reptile);
    }

    async function createHusbandry() {
        setCreateHusbandryTrigger(false);
        const res = await api.post(`/husbandry`, {
            reptileId: reptile.id,
            length: length,
            weight: weight,
            temperature: temperature,
            humidity: humidity

        });
        getReptile();
    }

    async function createSchedule() {
        setCreateScheduleTrigger(false);
        const res = await api.post(`/schedules`, {
            reptileId: reptile.id,
            userId: user.id,
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            sunday: sunday,
            type: type,
            description: description
        });

        console.log(res)

        setType("clean");
        setDescription("");
        setMonday(false);
        setTuesday(false);
        setWednesday(false);
        setThursday(false);
        setFriday(false);
        setSaturday(false);
        setSunday(false);

    }

    return (
        <>
            <div>{reptile && <h2>{reptile.name}</h2>}</div>
            <div>{reptile && <p>{reptile.description}</p>}</div>
            <button onClick={() => setUpdateReptileTrigger(true)}>Update Reptile</button>
            <button onClick={() => setCreateFeedingTrigger(true)}>Create Feeding</button>
            <button onClick={() => setCreateHusbandryTrigger(true)}>Create Husbandry Record</button>
            <button onClick={() => setCreateScheduleTrigger(true)}>Create Schedule</button>
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
            name={reptileNameUpdate}
            sex={reptileSexUpdate}
            species={reptileSpeciesUpdate}
            setName={setReptileNameUpdate}
            setSex={setReptileSexUpdate}
            setSpecies={setReptileSpeciesUpdate}
            update={updateReptile}
            />

            <Feeding
            trigger={createFeedingTrigger}
            close={() => setCreateFeedingTrigger(false)}
            create={() => createFeeding()}
            reptile={reptile}
            foodItem={foodItem}
            setFoodItem={setFoodItem}
            />

            <Husbandry
            trigger={createHusbandryTrigger}
            close={() => setCreateHusbandryTrigger(false)}
            create={() => createHusbandry()}
            reptile={reptile}
            length={length}
            temperature={temperature}
            weight={weight}
            humidity={humidity}
            setLength={setLength}
            setTemperature={setTemperature}
            setWeight={setWeight}
            setHumidity={setHumidity}
            />

            <ReptileSchedule
            trigger={createScheduleTrigger}
            close={() => setCreateScheduleTrigger(false)}
            create={() => createSchedule()}
            reptile={reptile}
            setType={setType}
            setMonday={setMonday}
            setTuesday={setTuesday}
            setWednesday={setWednesday}
            setThursday={setThursday}
            setFriday={setFriday}
            setSaturday={setSaturday}
            setSunday={setSunday}
            setDescription={setDescription}
            />

        </>
    );
}