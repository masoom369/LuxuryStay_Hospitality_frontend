import { createContext, useContext, useEffect, useState } from "react";
import { roomPackageData } from "../db/data";


const RoomPackageInfo = createContext();


export const RoomPackageContext = ({ children }) => {

  const [roomPackages, setRoomPackages] = useState(roomPackageData);
  const [loading, setLoading] = useState(false);

  const [adults, setAdults] = useState('1 Adult');
  const [kids, setKids] = useState('0 Kid');
  const [total, setTotal] = useState(0);


  useEffect(() => { setTotal(+adults[0] + +kids[0]) });


  const resetRoomPackageFilterData = () => {
    setAdults('1 Adult');
    setKids('0 Kid');
    setRoomPackages(roomPackageData)
  };


  // user click at --> Check Now button... then execute this function...
  const handleCheck = (e) => {
    e.preventDefault();
    setLoading(true);

    // filter roomPackages based on total persons...
    const filteredRoomPackages = roomPackageData.filter(room => total <= room.maxPerson)

    setTimeout(() => {
      setLoading(false);
      setRoomPackages(filteredRoomPackages); // refresh UI with new filtered roomPackages after 3 second...
    }, 3000);
  }


  const shareWithChildren = {
    roomPackages, loading,
    adults, setAdults,
    kids, setKids,
    handleCheck,
    resetRoomPackageFilterData,
  };


  return (
    <RoomPackageInfo.Provider value={shareWithChildren}>
      {
        children
      }
    </RoomPackageInfo.Provider>
  )
}

export const useRoomPackageContext = () => useContext(RoomPackageInfo);