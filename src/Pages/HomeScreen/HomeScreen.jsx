import "./HomeScreen.scss";
import starIcon2 from "../../assets/star.png";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <>
      <div className="home-screen">
        <div className="brand-container">
          <h1 className="title">Guiding Star</h1>
          <img src={starIcon2} alt="Star" className="star-icon" />
        </div>
        <Link to="/game1">
          <button className="home-button">Play</button>
        </Link>
        <Link to="/score">
          <button className="home-button">Score</button>
        </Link>
        <Link to="/about">
          <button className="home-button">About</button>
        </Link>
      </div>
    </>
  );
};

export default HomeScreen;
