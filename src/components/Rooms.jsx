import { useState } from 'react';
import { Link } from 'react-router-dom';
import { roomsData } from '../data/roomsData';

const Rooms = () => {
  const [rooms] = useState(roomsData);

  return (
    <section className='py-24'>
      <div className="container mx-auto lg:px-0">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {rooms.map((room) => (
            <Link to={`/room/${room.id}`} key={room.id}>
              <div className='bg-white shadow-lg min-h-[500px] group'>
                {/* Room image */}
                <div className='overflow-hidden'>
                  <img 
                    className='group-hover:scale-110 transition-all duration-300 w-full h-[300px] object-cover'
                    src={room.image} 
                    alt={room.name} 
                  />
                </div>
                {/* Room details */}
                <div className='bg-white shadow-lg max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base'>
                  <div className='flex justify-between w-[80%]'>
                    <div className='flex items-center gap-x-2'>
                      <div className='text-accent'>${room.price}</div>
                      <div className='text-sm text-grey'>/ per night</div>
                    </div>
                  </div>
                </div>
                {/* Room info */}
                <div className='text-center'>
                  <h3 className='h3'>{room.name}</h3>
                  <p className='max-w-[300px] mx-auto mb-3 lg:mb-6'>{room.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
