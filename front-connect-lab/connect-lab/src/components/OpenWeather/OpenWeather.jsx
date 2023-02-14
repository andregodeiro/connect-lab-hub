import React, { useState, useContext, useEffect } from "react";
import { AuthenticationContext } from "../Context/Authentication";
import styles from "../OpenWeather/styles.css";

export const OpenWeather = () => {
  const [cityWeather, setCityWeather] = useState({});
  const { user } = useContext(AuthenticationContext);

  const apiKey = "0c5d4813307ea2edd73a81f5c85cf910";

  useEffect(() => {
    (async (city) => {
      const userCity = user.userAddress.city;
      const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=metric&appid=${apiKey}&lang=pt_br`;

      const response = await fetch(apiWeatherUrl);
      const data = await response.json();
      setCityWeather(data);
    })();
  }, []);

  return (
    <div className="weather">
      <div className="weatherTile">
        <div className="imgBox"></div>
        <div className="infoBox">
          <h2>{cityWeather.main.temp} ºC</h2>
          <div className="cityData">
            <h5>
              {cityWeather.name}, {cityWeather.sys.country}
            </h5>
          </div>
          <div className="anotherData">
            <div className="humidityData">
              <img
                src="https://cdn-icons-png.flaticon.com/512/728/728093.png"
                alt=""
              />
              <p>{cityWeather.main.humidity}</p>
            </div>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};
