import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content mt-12">
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
      <form>
        <h6 className="footer-title">Contest Hub</h6>
        <div className="grid grid-cols-1 mt-2 mb-2">
            <h2>Connect with</h2>
            <div className="mt-2 flex space-x-3">
              <div className="link link-hover hover:w-5 transition-all duration-700"><FaFacebook/></div>
              <div className="link link-hover hover:w-5 transition-all duration-700"><FaTwitter /></div>
              <div className="link link-hover hover:w-5 transition-all duration-700"><FaYoutube /></div>
            </div>
        </div>
      </form>
    </footer>
  );
};

export default Footer;
