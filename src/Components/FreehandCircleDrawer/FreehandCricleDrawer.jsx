import { useState } from "react";
import { Stage, Layer, Line, Rect } from "react-konva";
import "./FreehandCircleDrawer.scss";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

function FreehandCircleDrawer() {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (event) => {
    setIsDrawing(true);
    const { x, y } = event.target.getStage().getPointerPosition();
    // Start a new line with the initial point
    setLines([...lines, [{ x, y }]]);
  };

  const handleMouseMove = (event) => {
    if (!isDrawing) return;

    const { x, y } = event.target.getStage().getPointerPosition();
    // Add the current point to the current line
    const currentLine = lines[lines.length - 1];
    currentLine.push({ x, y });
    // Update the lines array with the modified line
    const updatedLines = [...lines];
    updatedLines[lines.length - 1] = currentLine;
    setLines(updatedLines);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    calculatePerfectness();
  };

  const calculatePerfectness = () => {
    // Calculate the perfectness of the drawn shape
    if (lines.length > 0) {
      // Retrieve the first and only line drawn
      const line = lines[lines.length - 1];

      // Calculate the centroid of the drawn shape
      let sumX = 0;
      let sumY = 0;
      line.forEach((point) => {
        sumX += point.x;
        sumY += point.y;
      });
      const centroidX = sumX / line.length;
      const centroidY = sumY / line.length;

      // Calculate the average distance from each point to the centroid
      let sumDistance = 0;
      line.forEach((point) => {
        const dx = point.x - centroidX;
        const dy = point.y - centroidY;
        sumDistance += Math.sqrt(dx ** 2 + dy ** 2);
      });
      const averageDistance = sumDistance / line.length;

      // Calculate the standard deviation of distances
      let sumSquaredDifference = 0;
      line.forEach((point) => {
        const dx = point.x - centroidX;
        const dy = point.y - centroidY;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        sumSquaredDifference += (distance - averageDistance) ** 2;
      });
      const standardDeviation = Math.sqrt(sumSquaredDifference / line.length);

      // The perfectness score can be calculated based on the standard deviation of distances
      // Lower standard deviation indicates the drawn shape is closer to a perfect circle
      const perfectnessScore = 1 / (1 + standardDeviation);

      console.log(`Perfectness Score: ${perfectnessScore.toFixed(2)}`);
    }
  };

  return (
    <div className="canvasContainer">
      <div className="title-container">
        <h1>Lets Draw Circles!!</h1>
        <Link to="/game2">
          <button className="btn-next">
            Next
            <span className="icon">
              <FaArrowCircleRight />
            </span>
          </button>
        </Link>
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <Rect
            width={window.innerWidth}
            height={window.innerHeight}
            fill="#242424"
          />
          {lines.map((line, index) => (
            <Line
              key={index}
              points={line.flatMap((point) => [point.x, point.y])}
              stroke="black"
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default FreehandCircleDrawer;
