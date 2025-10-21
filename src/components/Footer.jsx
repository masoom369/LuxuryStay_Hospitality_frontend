import { LOGO } from "../assets";

const Footer = () => (
  <footer className='bg-primary py-8'>

    <div className='container mx-auto text-white flex items-center gap-5 sm:justify-start flex-col sm:flex-row'>
      <a href="/">
        <img src={LOGO} alt="Logo" className='w-[180px]' />
      </a>
      <div className="flex flex-col items-center">
        <p>Copyright &copy; {new Date().getFullYear()}, All Right Reserved,</p>
      </div>
    </div>

  </footer>
);

export default Footer;