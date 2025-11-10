import { createContext, useContext, useState } from "react";
import { roomPackageData } from "../db/data";

const RoomPackageInfo = createContext();

export const RoomPackageContext = ({ children }) => {
  const [roomPackages, setRoomPackages] = useState(roomPackageData); // static packages only

  // Reset function (kept for compatibility)
  const resetRoomPackageFilterData = () => {
    // No dynamic data to reset, this context only handles static packages
  };

  const shareWithChildren = {
    roomPackages, // static packages only 
    
    resetRoomPackageFilterData,
  };

  return (
    <RoomPackageInfo.Provider value={shareWithChildren}>
      {children}
    </RoomPackageInfo.Provider>
  );
};

export const useRoomPackageContext = () => useContext(RoomPackageInfo);
