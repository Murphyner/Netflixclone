import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-bg-custom text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="w-[90%] mx-auto">
          <div className="flex justify-center md:justify-start space-x-6 mb-8">
            <Link to="#" className="text-gray-400 hover:text-gray-100">
              <FaFacebookF />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-gray-100">
              <FaInstagram />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-gray-100">
              <FaYoutube />
            </Link>
            <Link to="#" className="text-gray-400 hover:text-gray-100">
              <FaTwitter />
            </Link>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-8">
            <div>
              <Link to="#" className="block hover:underline">
                Audio and Subtitles
              </Link>
              <Link to="#" className="block hover:underline">
                Media Center
              </Link>
              <Link to="#" className="block hover:underline">
                Privacy
              </Link>
              <Link to="#" className="block hover:underline">
                Contact Us
              </Link>
            </div>
            <div>
              <Link to="#" className="block hover:underline">
                Help Center
              </Link>
              <Link to="#" className="block hover:underline">
                Investor Relations
              </Link>
              <Link to="#" className="block hover:underline">
                Legal Notices
              </Link>
            </div>
            <div>
              <Link to="#" className="block hover:underline">
                Gift Cards
              </Link>
              <Link to="#" className="block hover:underline">
                Jobs
              </Link>
              <Link to="#" className="block hover:underline">
                Cookie Preferences
              </Link>
            </div>
            <div>
              <Link to="#" className="block hover:underline">
                Terms of Use
              </Link>
              <Link to="#" className="block hover:underline">
                Corporate Information
              </Link>
              <Link to="#" className="block hover:underline">
                Legal Notices
              </Link>
            </div>
          </div>

          {/* Service Code and Copy */}
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center border-t border-gray-700 pt-8">
            <button className="text-gray-400 hover:text-gray-100 mb-4 md:mb-0">
              Service Code
            </button>
            <p className="text-sm">&copy; 2024 Netflix, Inc.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
