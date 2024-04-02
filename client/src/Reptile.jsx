import { useEffect, useState } from "react";
import { redirect, useLocation } from "react-router-dom"
import { useApi } from "./utils/use_api";
import { requireLogin } from "./utils/require_login";
import ReptilePopup from "./components/create_items/ReptilePopup";
import Feeding from "./components/create_items/Feeding";
import Husbandry from "./components/create_items/Husbandry";
import ReptileSchedule from "./components/create_items/ReptileSchedule";
import FeedingList from "./components/list_items/feedingList";
import HusbandryList from "./components/list_items/husbandryList";
import ScheduleList from "./components/list_items/scheduleList";
import DeletePopup from "./components/list_items/DeletePopup";
import { printSex, printSpecies } from "./utils/print_functions";
import { useNavigate } from "react-router-dom";




export const Reptile = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const api = useApi();
    requireLogin();

    
    // triggers
    const [updateReptileTrigger, setUpdateReptileTrigger] = useState(false);
    const [createFeedingTrigger, setCreateFeedingTrigger] = useState(false);
    const [createHusbandryTrigger, setCreateHusbandryTrigger] = useState(false);
    const [createScheduleTrigger, setCreateScheduleTrigger] = useState(false);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    // objects
    const [reptile, setReptile] = useState(null);
    const [feedings, setFeedings] = useState([]);
    const [husbandryRecords, setHusbandryRecords] = useState([]);
    const [schedules, setSchedules] = useState([]);
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
    // delte popup
    const [deleteId, setDeleteId] = useState(0);
    const [deleteType, setDeleteType] = useState("");

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            getReptile();
        }
    }, [user]);

    useEffect(() => {
        getFeedings();
        getHusbandryRecords();
        getSchedules();
    }, [reptile]);

    async function getUser() {
        const {user} = await api.get("/users/me");
        setUser(user);
      }

    async function getReptile() {
        const path = location.pathname;
        const reptileId = path.split("/").pop();
        const {reptile} = await api.get(`/reptiles/${reptileId}`);
        setReptile(reptile);
        setReptileSexUpdate("m");
        setReptileSpeciesUpdate("ball_python");
        setReptileNameUpdate(reptile.name);
    }

    async function getFeedings() {
        if (reptile) {
            const feedings = await api.get(`/feeding/reptile/${reptile.id}`);
            setFeedings(feedings.feeding);
        }
    }

    async function getHusbandryRecords() {
        if (reptile) {
            const husbandryRecords = await api.get(`/husbandry/reptile/${reptile.id}`);
            console.log(husbandryRecords.records);
            setHusbandryRecords(husbandryRecords.records);
        }
    }

    async function getSchedules() {
        if (reptile) {
            const schedules = await api.get(`/schedules/reptile/${reptile.id}`);
            setSchedules(schedules.schedule);
        }
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
        setReptileSexUpdate("m");
        setReptileSpeciesUpdate("ball_python");
        setReptileNameUpdate(reptile.name);
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

        setLength(0);
        setWeight(0);
        setTemperature(0);
        setHumidity(0);
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
        setType("clean");
        setDescription("");
        setMonday(false);
        setTuesday(false);
        setWednesday(false);
        setThursday(false);
        setFriday(false);
        setSaturday(false);
        setSunday(false);

        getReptile();

    }

    async function deleteSchedule(id) {
        const res = await api.del( `/schedules/${id}`);
        getReptile();
    }

    async function deleteFeeding(id) {
        const res = await api.del(`/feeding/${id}`);
        getReptile();
    }

    async function deleteHusbandry(id) {
        const res = await api.del(`/husbandry/${id}`);
        getReptile();
    }

    async function deleteReptile(id) {
        const res = await api.del(`/reptiles/${id}`);
        navigate("/dashboard");
    }

    function deleteRouter() {
        if (deleteType == "feeding") {
            deleteFeeding(deleteId);
        } else if (deleteType == "husbandry") {
            deleteHusbandry(deleteId);
        } else if (deleteType == "schedule") {
            deleteSchedule(deleteId);
        } else if (deleteType == "reptile") {
            deleteReptile(deleteId);
        }
        setDeleteTrigger(false);
        setDeleteId(0);
        setDeleteType("");
    }

    function openDeleteDialog(id, type) {
        setDeleteTrigger(true);
        setDeleteId(id);
        setDeleteType(type);
    }

    function closeUpdateReptile() {
        setUpdateReptileTrigger(false);
        setReptileSexUpdate("m");
        setReptileSpeciesUpdate("ball_python");
        setReptileNameUpdate(reptile.name);
    }



    return (
        <>
            <div>{reptile && <h2 className="title-name">{reptile.name} - {printSpecies(reptile)} - {printSex(reptile)}</h2>}</div>
            <div>{reptile && <p>{reptile.description}</p>}</div>
            <button onClick={() => setUpdateReptileTrigger(true)}>Update Reptile</button>
            <button onClick={() => setCreateFeedingTrigger(true)}>Create Feeding</button>
            <button onClick={() => setCreateHusbandryTrigger(true)}>Create Husbandry Record</button>
            <button onClick={() => setCreateScheduleTrigger(true)}>Create Schedule</button>
            <button onClick={() => openDeleteDialog(reptile.id, "reptile")}>Delete Reptile</button>
            <div>
                <h3 className="title-name">Feedings</h3>
            </div>
            <div className="scroll">
                {
                    feedings.map((feeding) => (
                        <FeedingList
                        key={feeding.id}
                        id={feeding.id}
                        foodItem={feeding.foodItem}
                        createdAt={feeding.createdAt}
                        delete={openDeleteDialog}
                        />
                    ))
                }
            </div>
            <div>
                <h3 className="title-name">Husbandry Records</h3>
            </div>
            <div className="scroll">
            {
                husbandryRecords.map((record) => (
                    <HusbandryList
                    key={record.id}
                    id={record.id}
                    temperature={record.temperature}
                    length={record.length}
                    weight={record.weight}
                    humidity={record.humidity}
                    createdAt={record.createdAt}
                    delete={openDeleteDialog}
                    />
                ))
            }
            </div>

            <div>
                <h3 className="title-name">Schedules</h3>
            </div>
            <div className="scroll">
            {
                schedules.map((schedule) => (
                    <ScheduleList
                    key={schedule.id}
                    id={schedule.id}
                    monday={schedule.monday}
                    tuesday={schedule.tuesday}
                    wednesday={schedule.wednesday}
                    thursday={schedule.thursday}
                    friday={schedule.friday}
                    saturday={schedule.saturday}
                    sunday={schedule.sunday}
                    description={schedule.description}
                    type={schedule.type}
                    delete={openDeleteDialog}
                    />
                ))
            }

            </div>

            <ReptilePopup
            trigger={updateReptileTrigger}
            reptile={reptile}
            close={()=> {closeUpdateReptile()}}
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

            <DeletePopup
            trigger={deleteTrigger}
            close={() => setDeleteTrigger(false)}
            type={deleteType}
            id={deleteId}
            delete={deleteRouter}
            />
        </>
    );
}