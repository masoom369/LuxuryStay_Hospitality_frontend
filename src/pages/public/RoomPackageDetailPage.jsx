import { ScrollToTop } from "../../components";
import { hotelRules } from "../../constants/data";
import { useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { roomPackageData } from "../../db/data";

const RoomPackageDetailPage = () => {
  const { id } = useParams(); // id get form url (/roompackage/:id) as string...
  const roomId = parseInt(id);
  const roomPackage = roomPackageData.find((room) => room.id === roomId);

  if (!roomPackage) {
    return <div>Room Package not found</div>;
  }

  const { name, description, facilities, price, imageLg } = roomPackage;

  return (
    <section>
      <ScrollToTop />

      <div className="bg-room h-[400px] relative flex justify-center items-center bg-cover bg-center">
        <div className="absolute w-full h-full bg-black/70" />
        <h1 className="text-6xl text-white z-20 font-primary text-center">
          {name} Details
        </h1>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-x-8 h-full py-24">
          {/* ⬅️⬅️⬅️ left side ⬅️⬅️⬅️ */}
          <div className="w-full lg:w-[60%] h-full text-justify">
            <h2 className="h2">{name}</h2>
            <p className="mb-8">{description}</p>
            <img className="mb-8" src={imageLg} alt="roomImg" />

            <div className="mt-12">
              <h3 className="h3 mb-3">Room Amenities</h3>

              {/* icons grid */}
              <div className="grid grid-cols-2 gap-6 mb-12">
                {facilities.map((item, index) => (
                  <div key={index} className="flex items-center gap-x-3 flex-1">
                    <div className="text-3xl text-accent">{<item.icon />}</div>
                    <div className="text-base">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ➡️➡️➡️ right side ➡️➡️➡️ */}
          <div className="w-full lg:w-[40%] h-full">
            {/* package info */}
            <div className="py-8 px-6 bg-accent/20 mb-12">
              <h3 className="h3 mb-6">Package Details</h3>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">
                    Price per night:
                  </span>
                  <span className="text-xl font-bold text-accent">
                    ${price}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Check className="text-accent mr-2" />
                    <span>Free cancellation up to 24 hours</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="text-accent mr-2" />
                    <span>Breakfast included</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="text-accent mr-2" />
                    <span>Free Wi-Fi</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="text-accent mr-2" />
                    <span>Room service available</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Contact us to book:</h4>
                <p className="text-sm">Phone: +1 (555) 123-4567</p>
                <p className="text-sm">Email: reservations@luxurystay.com</p>
              </div>
            </div>

            <div>
              <h3 className="h3">Package Inclusions</h3>
              <p className="mb-6 text-justify">
                Your package includes all the amenities and services listed,
                ensuring a comfortable and memorable stay.
              </p>

              <ul className="flex flex-col gap-y-4">
                {hotelRules.map(({ rules }, idx) => (
                  <li key={idx} className="flex items-center gap-x-4">
                    <Check className="text-accent" />
                    {rules}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomPackageDetailPage;
