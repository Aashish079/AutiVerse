import { Link } from "react-router-dom";
import "./Welcome.scss";
import starIcon from "../../assets/star.svg";

const Welcome = () => {
  return (
    <div className="welcome-screen">
        <h1 className="title-Welcome">Welcome,</h1>
      <div className="brand-container">
        <h1 className="title">Rising Star</h1>
        <img src={starIcon} alt="Star" className="star-icon" />
      </div>

      <div className="btn-container">
        <Link to="/get-started">
          <button className="get-started-btn">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
