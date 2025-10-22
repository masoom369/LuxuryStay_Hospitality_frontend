import React from 'react';

const HotelListingPage = () => {
  return (
    <section>
      {/* Hero Section */}
      <div className='bg-room h-[400px] relative flex justify-center items-center bg-cover bg-center'>
        <div className='absolute w-full h-full bg-black/70' />
        <h1 className='text-6xl text-white z-20 font-primary text-center'>Our Hotels</h1>
      </div>

      {/* Content Section */}
      <div className='container mx-auto py-14 px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-primary mb-6'>Discover Our Properties</h2>
          <p className='text-lg text-gray-700 max-w-2xl mx-auto'>
            Explore our collection of luxury hotels worldwide, each offering exceptional service and unforgettable experiences.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Placeholder for hotel cards - will be populated with actual data */}
          <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
            <div className='h-48 bg-gray-200 flex items-center justify-center'>
              <span className='text-gray-500'>Hotel Image</span>
            </div>
            <div className='p-6'>
              <h3 className='text-xl font-bold text-gray-700 mb-2'>LuxuryStay Downtown</h3>
              <p className='text-gray-700 mb-4'>Prime location in the city center with world-class amenities.</p>
              <div className='flex justify-between items-center'>
                <span className='text-accent font-bold'>From $299/night</span>
                <button className='btn btn-primary'>View Details</button>
              </div>
            </div>
          </div>

          <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
            <div className='h-48 bg-gray-200 flex items-center justify-center'>
              <span className='text-gray-500'>Hotel Image</span>
            </div>
            <div className='p-6'>
              <h3 className='text-xl font-bold text-gray-700 mb-2'>LuxuryStay Resort</h3>
              <p className='text-gray-700 mb-4'>Beachfront paradise with spa and fine dining.</p>
              <div className='flex justify-between items-center'>
                <span className='text-accent font-bold'>From $399/night</span>
                <button className='btn btn-primary'>View Details</button>
              </div>
            </div>
          </div>

          <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
            <div className='h-48 bg-gray-200 flex items-center justify-center'>
              <span className='text-gray-500'>Hotel Image</span>
            </div>
            <div className='p-6'>
              <h3 className='text-xl font-bold text-gray-700 mb-2'>LuxuryStay Mountain</h3>
              <p className='text-gray-700 mb-4'>Alpine retreat with breathtaking views and outdoor activities.</p>
              <div className='flex justify-between items-center'>
                <span className='text-accent font-bold'>From $349/night</span>
                <button className='btn btn-primary'>View Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelListingPage;
