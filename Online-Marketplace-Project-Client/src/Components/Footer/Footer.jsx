import {
  FaFacebook,
  FaInstagramSquare,
  FaTwitterSquare,
  FaLocationArrow,
  FaMobile,
  FaRegEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="w-full bg-secondary p-8 text-white">
        <div className="flex flex-col lg:flex-row  items-center justify-center gap-y-6 gap-x-12 bg-secondary text-center md:justify-between">
          <div className="flex flex-col items-center">
            <div className="flex gap-2">
              <img
                src="https://i.ibb.co/WVN4wsN/logo2.png"
                alt="logo-ct"
                className="w-10 mb-4"
              />
              <h3 className="text-white  lg:block text-sm md:text-lg lg:text-sm font-bold">
              Online Marketplace
            </h3>
            </div>
            <div className="flex text-xl cursor-pointer space-x-2">
              <FaFacebook />
              <FaInstagramSquare />
              <FaTwitterSquare />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Adress</h3>
            <p className="flex items-center">
              <FaLocationArrow className="mr-4" /> 23 hosaetii st., Kutir,
              London
            </p>
            <p className="flex items-center">
              <FaMobile className="mr-4" /> 01919273352
            </p>
            <p className="flex items-center">
              <FaRegEnvelope className="mr-4" /> mdsayel111@gmail.com
            </p>
          </div>
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 cursor-pointer">
            <li>
              <a className="block font-sans text-base font-normal leading-relaxed antialiased transition-colors hover:text-pink-500 focus:text-pink-500">
                About Us
              </a>
            </li>
            <li>
              <a className="block font-sans text-base font-normal leading-relaxed  antialiased transition-colors hover:text-pink-500 focus:text-pink-500">
                License
              </a>
            </li>
            <li>
              <a className="block font-sans text-base font-normal leading-relaxed  antialiased transition-colors hover:text-pink-500 focus:text-pink-500">
                Contribute
              </a>
            </li>
            <li>
              <a className="block font-sans text-base font-normal leading-relaxed  antialiased transition-colors hover:text-pink-500 focus:text-pink-500">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-8 border-blue-gray-50" />
        <p className="block text-center font-sans text-base font-normal leading-relaxed  antialiased">
          © 2023 Material Tailwind
        </p>
      </footer>
    </div>
  );
};

export default Footer;
