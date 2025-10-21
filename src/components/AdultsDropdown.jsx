import { useState } from 'react';
import { Menu } from '@headlessui/react';
import { BsChevronDown } from 'react-icons/bs';

const AdultsDropdown = () => {
  const [adults, setAdults] = useState('1 Adult');

  return (
    <Menu as="div" className="w-full h-full bg-white relative">
      <Menu.Button className="w-full h-full flex items-center justify-between px-8">
        {adults}
        <BsChevronDown className="text-base text-accent-hover" />
      </Menu.Button>
      <Menu.Items as="ul" className="bg-white absolute w-full flex flex-col z-40">
        {['1 Adult', '2 Adults', '3 Adults', '4 Adults'].map((option, index) => (
          <Menu.Item
            as="li"
            key={index}
            className="border-b last-of-type:border-b-0 h-12 hover:bg-accent hover:text-white w-full flex justify-center items-center cursor-pointer"
            onClick={() => setAdults(option)}
          >
            {option}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default AdultsDropdown;
