import { Link } from 'react-router-dom';
import './Welcome.scss';

const Welcome = () => {
  return (
    <div className="welcome-screen">
      <h1 className="title">Rising Star</h1>
      <Link to="/get-started">
        <button className="get-started-btn">Get Started</button>
      </Link>
    </div>
  );
};

export default Welcome;