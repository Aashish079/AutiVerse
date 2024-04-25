import { useEffect, useState } from 'react';
import apiClient from '../../utils/api-client';
import './Score.scss';

const Score = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const message = await apiClient.get('/score/generatesessionplot'); 
        console.log(message);
        const response = await apiClient.get('/score/sessionplot'); 
        console.log(response.data[0].plot);
        setImage(response.data[0].plot);
      } catch (error) {
        console.error('Error fetching image', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="score-container">
      {image && <img src={image} 
      width={800}

      alt="Score" />}
      {/* Add additional features here */}
    </div>
  );
};

export default Score;