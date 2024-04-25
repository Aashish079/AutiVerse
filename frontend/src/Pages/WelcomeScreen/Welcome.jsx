import { Link } from "react-router-dom";
import "./Welcome.scss";
import starIcon from "../../assets/star.svg";

const Welcome = () => {
  return (
    <>
    <div className="welcome-screen">
      <div className="brand-container">
        <p className="title">Guiding Star</p>
        <img src={starIcon} alt="Star" className="star-icon" />
      </div>
      <div className="title-Welcome">
        <h1 >Welcome,</h1>
        <p>Little Champ! </p>
      </div>

      <div className="btn-container">
        <Link to="/get-started">
          <button className="get-started-btn">Get Started</button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default Welcome;
