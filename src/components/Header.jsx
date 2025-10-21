import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGO } from '../assets';

const Header = () => {
  const [header, setHeader] = useState(false);

  useEffect(() => {
    const onScroll = () => setHeader(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Rooms', to: '/rooms' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Privacy Policy', to: '/policy' }
  ];

  return (
    // Reduced vertical padding so header sits slightly higher.
    // When `header` is true (scrolled) we keep it compact and add a white bg.
    <header
      className={`fixed z-50 w-full transition-all duration-300 ${header ? 'bg-white py-2 shadow-lg' : 'bg-transparent py-2'}`}
    >
      <div className='container mx-auto flex items-center justify-between gap-x-6'>
        {/* Logo area: shifted left 40% while container keeps layout intact */}
        <div className='flex items-center'>
          <Link to="/" className='block'>
            <img
              src={LOGO}
              alt="Logo"
              className="w-[180px] transform -translate-x-[40%] transition-transform duration-300"
              style={{ willChange: 'transform' }}
            />
          </Link>
        </div>

        {/* Nav: stays aligned to the right, text color toggles based on header state */}
        <nav className={`${header ? 'text-primary' : 'text-white'} hidden lg:flex gap-x-6 font-tertiary tracking-[3px] text-[15px] items-center uppercase`}>
          {navLinks.map((link) => (
            <Link
              to={link.to}
              className="transition hover:text-accent"
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile / small screens: a simple compact nav placeholder (you may already have a menu) */}
        <div className='lg:hidden'>
          {/* If you have a mobile menu button component, put it here.
              Otherwise this keeps layout balanced on small screens. */}
          <button className={`${header ? 'text-primary' : 'text-white'} px-3 py-2`} aria-label="menu">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
