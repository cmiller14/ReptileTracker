import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "./store/application_slice";

function App() {
  const authToken = useSelector(state => state.application.authToken)
  const dispatch = useDispatch();

  function logout() {
    dispatch(setAuthToken(null));
  }
  return (
    <>
   
    <div>
    <div className="title-name"><h1>Reptile Tracker</h1></div>

      <nav className="navbar">{
        (
          <>
            <Link to="/sign_up" className="nav-link"> Create Account </Link>
            <Link to="/login" className="nav-link"> Sign In</Link>
            <Link to="/dashboard" className="nav-link"> DashBoard</Link>
            <Link to="/login" onClick={() => logout()} className="nav-link">Logout</Link>
          </>
        )
      }</nav>
      <Outlet />
    </div>
    </>
  );
}

export default App
