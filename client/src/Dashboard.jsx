import { useNavigate } from "react-router-dom";
import { requireLogin } from "./utils/require_login";
import App from './App';
import Schedule from './components/schedule';



export const Dashboard = () => {
    const navigate = useNavigate();


    requireLogin();

    function getReptiles() {}

    return (
        <>
        <div>
            <h1>Dashboard</h1>
            <h2>Schedules</h2>
            <Schedule></Schedule>
            <h2>Reptiles</h2>
            <h2>Create Reptile</h2>
        </div>
        
        <button onClick={e => navigate("/")}>
            Home
        </button>
    
        </>
    )
}