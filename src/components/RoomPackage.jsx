import { SpinnerDotted } from 'spinners-react';
import RoomPackageItem from './RoomPackageItem';

const RoomPackage = ({ roomPackages, loading }) => {
  return (
    <section className='py-24'>

      {
        // overlay & spinner effect
        loading &&
        <div className='h-screen w-full fixed bottom-0 top-0 bg-black/80 z-50 grid place-items-center'>
          <SpinnerDotted />
        </div>
      }

      <div className='container mx-auto lg:px-0'>

        <div className='text-center'>
          <p className='font-tertiary uppercase text-[15px] tracking-[6px]'>LuxuryStay Hospitality</p>
          <h2 className='font-primary text-[45px] mb-6'>Room Package & Suites</h2>
        </div>

        <div className='grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0'>
          {
            roomPackages.map(roomPackage =>
              <RoomPackageItem key={roomPackage.id} roomPackage={roomPackage} />
            )
          }
        </div>
      </div>

    </section>
  );
};

export default RoomPackage;
