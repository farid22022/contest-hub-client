import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";
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
        <h4 className="footer-title text-orange-700">Md. Farid Hossen Rehad</h4>
        <h4 className="footer-title text-white">Khulna University</h4>
        <h3 className="footer-title text-white">Computer Science & Enginnering ,</h3>
        <h4 className="footer-tittle text-yellow-300">Contact Me!</h4>
        <h4>Email: <a>mdfaridhossenrehad@gmail.com</a></h4>
        
        <nav className="grid grid-cols-1 mt-2 mb-2">
            <h2>Connect with</h2>
            <div className="mt-2 flex space-x-3">
              <div className="link link-hover hover:w-5 transition-all duration-700"><Link to="https://www.facebook.com/profile.php?id=100088996016528"><FaFacebook/></Link></div>
              <div className="link link-hover hover:w-5 transition-all duration-700"><Link to="https://x.com/MdRehad10192"><FaTwitter /></Link></div>
              <div className="link link-hover hover:w-5 transition-all duration-700"><Link to="https://www.youtube.com/@Faridhossen22"><FaYoutube /></Link></div>
            </div>
        </nav>
      </form>
    </footer>
  );
};

export default Footer;
