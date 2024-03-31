import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const authToken = useSelector(state => state.application.authToken)
  return (
    <div>
      <nav className="my-nav"><h1>Reptile Tracker</h1>{
        (
          <>
            <Link to="/sign_up"> Create Account </Link>
            <Link to="/login"> Sign In</Link>
            <Link to="/dashboard"> DashBoard</Link>
          </>
        )
      }</nav>
      <Outlet />
    </div>
  );
}

export default App
