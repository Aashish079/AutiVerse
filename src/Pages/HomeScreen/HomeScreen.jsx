import './HomeScreen.scss';
import starIcon from "../../assets/star.svg";

const HomeScreen = () => {
  return (
    <>
    <div className="home-screen">
    <div className="brand-container">
        <h1 className="title">Guiding Star</h1>
        <img src={starIcon} alt="Star" className="star-icon" />
      </div>
      <button className="home-button">Play</button>
      <button className="home-button">Score</button>
      <button className="home-button">About</button>
    </div>
    </>
  );
};

export default HomeScreen;