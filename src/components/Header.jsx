import { useRoomContext, useAuth } from '../context';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoWhite } from '../assets'; // SVG Logo
import { LogoDark } from '../assets'; // SVG Logo


const Header = () => {

  const { resetRoomFilterData } = useRoomContext();
  const { user, logout } = useAuth();

  const [header, setHeader] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () =>
      window.scrollY > 50
        ? setHeader(true)
        : setHeader(false)
    );
  });

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about-us' },
    { name: 'Contact', path: '/contact-us' },
  ];

  return (
    <header
      className={`fixed z-50 w-full transition-all duration-300 
      ${header ? 'bg-white py-6 shadow-lg' : 'bg-transparent py-8'}`}
    >

      <div className='container mx-auto flex flex-col lg:flex-row items-center lg:justify-between gap-y-6 lg:gap-y-0'>

        {/* Logo */}
        <Link to="/" onClick={resetRoomFilterData}>
          {
            header
              ? <LogoDark className='w-[160px]' /> //<img className='w-[160px]' src={LogoDark} />
              : <LogoWhite className='w-[160px]' /> //<img className='w-[160px]' src={LogoWhite} />
          }
        </Link>

        {/* Nav */}
        <nav className={`${header ? 'text-primary' : 'text-white'}
        flex gap-x-4 lg:gap-x-8 font-tertiary tracking-[3px] text-[15px] items-center uppercase`}>
          {
            navLinks.map(link =>
              <Link to={link.path} className='transition hover:text-accent' key={link.name} onClick={link.path === '/' ? resetRoomFilterData : undefined}>
                {link.name}
              </Link>
            )
          }
          {/* Auth Links */}
          {user ? (
            <>
              <Link to="/dashboard" className='transition hover:text-accent'>Dashboard</Link>
              <button onClick={logout} className='transition hover:text-accent'>Logout</button>
            </>
          ) : (
            <Link to="/login" className='transition hover:text-accent'>Login</Link>
          )}
        </nav>

      </div>

    </header>
  );
};

export default Header;
