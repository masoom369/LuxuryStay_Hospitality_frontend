const Footer = () => {
  return (
    <footer>
      <div className="bg-white shadow-sm border-t text-center py-4 px-4 text-sm text-gray-500 w-full font-secondary">
        &copy; {new Date().getFullYear()} LuxuryStay Hospitality. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
