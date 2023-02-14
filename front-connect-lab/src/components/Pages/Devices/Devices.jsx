import React from "react";
import { DeviceList } from "../../../styles";
import { Navbar } from "../../Navbar/Navbar";
import { DevicesCard } from "../../DevicesCard/DevicesCard";
import { SearchBar } from "../../SearchBar/SearchBar";

export const Devices = () => {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <DeviceList>
        <div className="deviceList">
          <DevicesCard />
        </div>
      </DeviceList>
    </div>
  );
};
