import { useNavigate } from "react-router-dom";
import { requireLogin } from "./utils/require_login";
import { useApi } from "./utils/use_api";
import Schedule from './components/schedule';
import { useEffect, useState } from "react";



export const Dashboard = () => {
    const navigate = useNavigate();
    const api = useApi();
    requireLogin();

    const [reptiles, setReptiles] = useState([]);
    const [user, setUser] = useState(null);

    async function getUser() {
        const {user} = await api.get("/users/me");
        setUser(user);
      }

    async function getReptiles() {
        const {reptiles} = await api.get(`/reptiles/user/${user.id}`);
        setReptiles(reptiles);
    }
    
    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            getReptiles();
        }
    }, [user]);


    // useEffect(() => {
    //     //when the reptiles change i should reload the data on the ui

    // }, reptiles);

    return (
        <>
        <div>
            <h1>Dashboard</h1>
            <h2>Schedules</h2>
            <Schedule
            reptiles={reptiles}
            />
            <h2>Reptiles</h2>
            <h2>Create Reptile</h2>
        </div>
        
        <button onClick={e => navigate("/")}>
            Home
        </button>
    
        </>
    )
}