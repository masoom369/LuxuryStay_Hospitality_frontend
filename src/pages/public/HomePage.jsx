import { useEffect, useState } from "react";
import { BookForm, HeroSlider, Rooms, ScrollToTop } from "../../components";
import { roomData } from "../../db/data";
import api from "../../services/api";

const HomePage = () => {
  const [rooms, setRooms] = useState(roomData);
  const [loading, setLoading] = useState(false);
  const [adults, setAdults] = useState('1 Adult');
  const [kids, setKids] = useState('0 Kid');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(+adults[0] + +kids[0]);
  }, [adults, kids]);

  const resetRoomFilterData = () => {
    setAdults('1 Adult');
    setKids('0 Kid');
    setRooms(roomData);
  };

  // user click at --> Check Now button... then execute this function...
  const handleCheck = (e) => {
    e.preventDefault();
    setLoading(true);

    // filter rooms based on total persons...
    const filterRooms = roomData.filter(room => total <= room.maxPerson);

    setTimeout(() => {
      setLoading(false);
      setRooms(filterRooms); // refresh UI with new filtered rooms after 3 second...
    }, 3000);
  };

  return (
    <div>
      <ScrollToTop />

      <HeroSlider />

      <div className="container mx-auto relative">
        <div className="bg-accent/20 mt-4 p-4 lg:absolute lg:left-0 lg:right-0 lg:p-0 lg:-top-12 lg:z-30 lg:shadow-xl">
          <BookForm handleCheck={handleCheck} />
        </div>
      </div>

      <Rooms rooms={rooms} loading={loading} />
    </div>
  );
};

export default HomePage;
