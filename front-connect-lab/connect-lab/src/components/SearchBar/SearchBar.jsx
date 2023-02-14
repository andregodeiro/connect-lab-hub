import React, { useEffect, useState, createContext } from "react";
import { StyledSearchBar } from "../../styles";
import { getDevice } from "../../services/api";
import { Loading } from "../Loading/Loading";

export const filteredDevicesProvider = createContext();

export const SearchBar = ({ children }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState([]);
  const [searchDevice, setSearchDevice] = useState([]);

  const [searchParameter] = useState(["name"]);

  useEffect(() => {
    (async () => {
      const response = await getDevice();
      setDevices(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const filteredDevices = devices.filter((device) => {
    return searchParameter.some((newDevice) => {
      return (
        device[newDevice]
          ?.toString()
          ?.toLowerCase()
          ?.indexOf(search.toLowerCase()) > -1
      );
    });
  });

  // setSearchDevice(filteredDevices);

  // create a context and set it to setDevices

  return (
    <filteredDevicesProvider.Provider value={searchDevice}>
      <StyledSearchBar>
        <div>
          <form action="">
            <input
              type="text"
              placeholder="Insira o nome de um dispositivo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
      </StyledSearchBar>
      {children}
    </filteredDevicesProvider.Provider>
  );
};
