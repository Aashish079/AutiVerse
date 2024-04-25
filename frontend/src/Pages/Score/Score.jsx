import { useEffect, useState } from 'react';
import axios from 'axios';
import './Score.scss';

const Score = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const message = await axios.get('/score/generatesessionplot'); 
        // console.log(message);
        const response = await axios.get('/score/sessionplot'); 
        console.log(response);
        setImage(response.data);
      } catch (error) {
        console.error('Error fetching image', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="score-container">
      {image && <img src={image.url} alt="Score" />}
      {/* Add additional features here */}
    </div>
  );
};

export default Score;