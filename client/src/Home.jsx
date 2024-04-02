import { useApi } from "./utils/use_api";

export const Home = () => {
  const api = useApi();
  return (
    <div>
      <div className="app-info-box">
        <h2>Welcome to the Reptile Tracker!</h2>
        <p>The reptile tracker allows you to keep track of all your personal reptiles. You can record feeding, cleaning, and size schedules for
          your reptile. The applicaiton also tracks your reptiles growth and its diet.</p>
    </div>
    </div>
  )
}