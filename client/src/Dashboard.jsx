import { useNavigate } from "react-router-dom";
import { requireLogin } from "./utils/require_login";
import { useApi } from "./utils/use_api";
import Schedule from './components/Schedule';
import ReptileList from './components/list_items/ReptileList';
import { useEffect, useState } from "react";
import ReptileCreate from "./components/create_items/ReptileCreate";
import { printSex, printSpecies } from "./utils/print_functions";



export const Dashboard = () => {
    const navigate = useNavigate();
    const api = useApi();
    requireLogin();

    const [reptiles, setReptiles] = useState([]);
    const [user, setUser] = useState(null);
    const [schedules, setSchedules] = useState([]);
    // create reptile
    const [reptileTrigger, setReptileTrigger] = useState(false);
    const [reptileName, setReptileName] = useState("");
    const [reptileSpecies, setReptileSpecies] = useState("ball_python");
    const [reptileSex, setReptileSex] = useState("m");

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

    async function createReptile() {
        const res = api.post("/reptiles", {
            userId: user.id,
            name: reptileName,
            sex: reptileSex,
            species: reptileSpecies
        });

        setReptileTrigger(false);
        setReptileSex("m");
        setReptileSpecies("ball_python");
        getReptiles();
    }
    
    function getDay() {
        let day;
        switch (new Date().getDay()) {
            case 0:
              return "sunday";
            case 1:
              return "monday";
            case 2:
              return "tuesday";
            case 3:
              return "wednesday";
            case 4:
              return "thursday";
            case 5:
              return "friday";
            case 6:
              return "saturday";
          }
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


    return (
        <>
            <h1 className="title-name">Dashboard</h1>
            <h2 className="title-name">Schedules for {getDay().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</h2>
            <Schedule
            reptiles={reptiles}
            schedules={schedules}
            today={getDay()}
            />
            <h2 className="title-name">Reptiles</h2>
            <button onClick={() => setReptileTrigger(true)}>Create Reptile</button>
            {
                reptiles.map((reptile) => (
                    <ReptileList
                    key={reptile.id}
                    name={reptile.name}
                    species={reptile.species}
                    id={reptile.id}
                    navigate={navigate}
                    printSpecies={printSpecies}
                    printSex={printSex}
                    reptile={reptile}
                    />
                ))
            }
            <button onClick={e => navigate("/")}>
                Home
            </button>

            <ReptileCreate
            trigger={reptileTrigger}
            close={()=> {setReptileTrigger(false)}}
            name={reptileName}
            sex={reptileSex}
            species={reptileSpecies}
            setName={setReptileName}
            setSex={setReptileSex}
            setSpecies={setReptileSpecies}
            create={createReptile}
            />
        </>
    )
}