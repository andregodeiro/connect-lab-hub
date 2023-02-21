import React, { useEffect, useState, createContext } from "react";
import { StyledSearchBar } from "../../styles";
import { getDevice } from "../../services/api";
import { Loading } from "../Loading/Loading";

export const filteredDevicesProvider = createContext();

export const SearchBar = ({ children }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);

  const [searchParameter] = useState(["name"]);

  useEffect(() => {
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
    setFilteredDevices(filteredDevices);
  }, [devices, search, searchParameter]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await getDevice();
      setDevices(response.data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <filteredDevicesProvider.Provider value={filteredDevices}>
      <StyledSearchBar>
        <div>
          <form action="">
            <input
              type="text"
              placeholder="Insira o nome de um dispositivo..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </form>
        </div>
      </StyledSearchBar>
      {children}
    </filteredDevicesProvider.Provider>
  );
};
