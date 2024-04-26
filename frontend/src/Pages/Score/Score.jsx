import { useEffect, useState } from "react";
import apiClient from "../../utils/api-client";
import "./Score.scss";

const Score = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [attentionScore, setAttentionScore] = useState(null);
  const [engagementScore, setEngagementScore] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const message1 = await apiClient.get("/score/generateaverageplot");
        console.log(message1);
        const response1 = await apiClient.get("/score/averageplot");
        console.log(response1.data[0].plot);
        setImage1(response1.data[0].plot);

        const message2 = await apiClient.get("/score/generateoveralldayplot");
        console.log(message2);
        const response2 = await apiClient.get("/score/overalldayplot");
        setImage2(response2.data[0].plot);

        const scorelist = await apiClient.get("/score/list");
        console.log(scorelist.data);
        console.log(scorelist.data[0].score);

        //Traverse array of object in scorelist and find total sum of scores
        let total = 0;
        for (let i = 0; i < scorelist.data.length; i++) {
          total += scorelist.data[i].score;
        }
        console.log(total);
        //Calculate the attention score
        let attentionScore = (total / (200 * scorelist.data.length)) * 100;
        setAttentionScore(attentionScore);
        console.log(attentionScore);

        let engagementScore = ((scorelist.data.length ) / (15)) * 100;
        console.log(engagementScore);
        setEngagementScore(engagementScore);
        // setEngagementScore(engagementScore);
      } catch (error) {
        console.error("Error fetching image", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="score-container">
      {image1 && <img src={image1} width={500} alt="Score" />}
      {image2 && <img src={image2} width={500} alt="Score" />}
      <div className="analysis-container">
        <h2>Analysis:</h2>
        <p className="attention-score-container">
          Attention Score:{" "}
          {attentionScore !== null ? attentionScore.toFixed(2) : "Calculating"}%
        </p>
        <p className="engagement-score-container">
        Engagement Score:{" "}
          {engagementScore !== null ? engagementScore.toFixed(2) : "Calculating"}%
        </p>
      </div>
    </div>
  );
};

export default Score;
