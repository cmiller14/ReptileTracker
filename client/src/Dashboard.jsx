import { useNavigate } from "react-router-dom";
import { requireLogin } from "./utils/require_login";
import { useApi } from "./utils/use_api";
import Schedule from './components/Schedule';
import ReptileList from './components/list_items/ReptileList';
import { useEffect, useState } from "react";



export const Dashboard = () => {
    const navigate = useNavigate();
    const api = useApi();
    requireLogin();

    const [reptiles, setReptiles] = useState([]);
    const [reptile, setReptile] = useState([]);
    const [user, setUser] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [reptileName, setReptileName] = useState("");
    const [reptileSpecies, setReptileSpecies] = useState("");

    async function getUser() {
        const {user} = await api.get("/users/me");
        setUser(user);
      }

    async function getReptiles() {
        const {reptiles} = await api.get(`/reptiles/user/${user.id}`);
        console.log(reptiles);
        setReptiles(reptiles);
    }

    async function getSchedules() {
        const {schedules} = await api.get(`/schedules/user/${user.id}`);
        setSchedules(schedules);
    }
    
    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            getReptiles();
        }
    }, [user]);

    useEffect(() => {
        if (reptiles && user) {
            getSchedules();
        }
    }, [reptiles]);

    function launchPopup() {

    }


    // useEffect(() => {
    //     //when the reptiles change i should reload the data on the ui

    // }, reptiles);

    return (
        <>
            <h1>Dashboard</h1>
            <h2>Schedules</h2>
            <Schedule
            reptiles={reptiles}
            schedules={schedules}
            />
            <h2>Reptiles</h2>
            <button>Create Reptile</button>
            {
                reptiles.map((reptile) => (
                    <ReptileList
                    key={reptile.id}
                    name={reptile.name}
                    species={reptile.species}
                    id={reptile.id}
                    navigate={navigate}
                    />
                ))
            }
            <button onClick={e => navigate("/")}>
                Home
            </button>
        </>
    )
}