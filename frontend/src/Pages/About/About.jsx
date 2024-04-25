import './About.scss';
import { IoMdExit } from 'react-icons/io';
import { Link } from 'react-router-dom';
import pdfFile from '../../assets/SIC-PROPOSAL.pdf';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">Our Project Proposal</h1>
      <Link to="/get-started">
        <button className="btn-next">
          Home
          <span className="icon">
            <IoMdExit />
          </span>
        </button>
      </Link>

      <div className="pdf-wrapper">
        <iframe 
          className="pdf-viewer"
          src={`${pdfFile}#toolbar=0`} 
          type="application/pdf" 
          width="60%" 
          height="100%"
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
      </div>
    </div>
  );
};

export default About;