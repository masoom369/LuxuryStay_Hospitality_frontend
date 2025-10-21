import React from 'react';

const AboutUsPage = () => {
  return (
    <section>
      {/* Hero Section */}
      <div className='bg-room h-[560px] relative flex justify-center items-center bg-cover bg-center'>
        <div className='absolute w-full h-full bg-black/70' />
        <h1 className='text-6xl text-white z-20 font-primary text-center'>About Us</h1>
      </div>

      {/* Content Section */}
      <div className='container mx-auto py-24'>
        <div className='flex justify-center'>
          <div className='w-full max-w-4xl'>
            <div className='bg-white shadow-lg rounded-lg p-8'>
              <h2 className='text-3xl font-primary text-center mb-6'>About LuxuryStay Hospitality</h2>
              <p className='text-lg text-gray-700 mb-6 text-justify'>
                LuxuryStay is a high-end hotel chain renowned for providing exceptional service and luxurious accommodations. Our mission is to create unforgettable experiences for our guests, combining elegance, comfort, and personalized attention in every stay.
              </p>
              <p className='text-lg text-gray-700 mb-6 text-justify'>
                With locations worldwide, we offer a range of amenities designed to cater to the discerning traveler. From opulent suites to world-class dining, our properties are crafted to exceed expectations and ensure every moment is memorable.
              </p>
              <p className='text-lg text-gray-700 text-justify'>
                At LuxuryStay, we believe in sustainability and community involvement, striving to make a positive impact wherever we operate. Join us and discover the pinnacle of hospitality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
