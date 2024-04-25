import { useEffect, useState } from 'react';
import apiClient from '../../utils/api-client';
import './Score.scss';

const Score = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const message1 = await apiClient.get('/score/generatesessionplot'); 
        console.log(message1);
        const response1 = await apiClient.get('/score/sessionplot'); 
        console.log(response1.data[0].plot);
        setImage1(response1.data[0].plot);

        const message2 = await apiClient.get('/score/generateoveralldayplot'); 
        console.log(message2);
        const response2 = await apiClient.get('/score/overalldayplot');
        setImage2(response2.data[0].plot); 
      } catch (error) {
        console.error('Error fetching image', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="score-container">
      {image1 && <img src={image1} 
      width={600}

      alt="Score" />}
      {image2 && <img src={image2} 
      width={600}

      alt="Score" />}
      <div className='analysis-container'>
        <h2>Analysis:</h2>
        <p className='attention-score-container'>
            Attention Score: {}
        </p>
        <p className='engagement-score-container'>
            Engagement Score:{} 
        </p>

      </div>
    </div>
  );
};

export default Score;