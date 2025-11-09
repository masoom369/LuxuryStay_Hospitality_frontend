import { useEffect } from "react";
import { BookForm, HeroSlider, RoomPackage, ScrollToTop } from "../../components";
import { useRoomPackageContext } from "../../context";
import HotelCarousel from "../../components/HotelCarousel";

const HomePage = () => {
  const { roomPackages, loading, handleCheck, resetRoomPackageFilterData } = useRoomPackageContext();

  return (
    <div>
      <ScrollToTop />

      <HeroSlider />

      <div className="container mx-auto relative">
        <div className="bg-accent/20 mt-4 p-4 lg:absolute lg:left-0 lg:right-0 lg:p-0 lg:-top-12 lg:z-30 lg:shadow-xl">
          <BookForm handleCheck={handleCheck} />
        </div>
      </div>

      <HotelCarousel/>

      <RoomPackage roomPackages={roomPackages} loading={loading} />
    </div>
  );
};

export default HomePage;
