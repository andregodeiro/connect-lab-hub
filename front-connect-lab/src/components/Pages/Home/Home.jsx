import { Navbar } from "../../Navbar/Navbar";
import { DeviceList } from "../../../styles";
import { OpenWeather } from "../../OpenWeather/OpenWeather";
import { WelcomeMessage } from "../../WelcomeMessage/WelcomeMessage";
import { UserDevicesList } from "../../UserDevicesList/UserDevicesList";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <WelcomeMessage />
      <div className="weatherContainer"> {/* <OpenWeather /> */}</div>
      <DeviceList>
        <div className="deviceList">
          <UserDevicesList />
        </div>
      </DeviceList>
    </div>
  );
};
export default Home;
