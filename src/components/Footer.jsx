import { LogoWhite } from "../assets";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary py-8">
    <div className="container mx-auto text-white flex items-center gap-5 sm:justify-between flex-col sm:flex-row">
      <a href="/">
        <LogoWhite />
      </a>
      <div className="flex flex-row items-center">
        <p>Copyright &copy; {new Date().getFullYear()}, All Right Reserved</p>
        <span className="mx-2">|</span>
        <Link to="/FAQ" className="text-white hover:underline">
          FAQ
        </Link>
        <span className="mx-2">|</span>
        <Link to="/privacy-policy" className="text-white hover:underline">
          Privacy Policy
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
