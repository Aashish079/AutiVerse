import './HomeScreen.scss';
import starIcon2 from "../../assets/star.png";

const HomeScreen = () => {
  return (
    <>
    <div className="home-screen">
    <div className="brand-container">
        <h1 className="title">Guiding Star</h1>
        <img src={starIcon2} alt="Star" className="star-icon" />
      </div>
      <button className="home-button">Play</button>
      <button className="home-button">Score</button>
      <button className="home-button">About</button>
    </div>
    </>
  );
};

export default HomeScreen;