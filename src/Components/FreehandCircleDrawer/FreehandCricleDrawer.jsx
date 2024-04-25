import { useContext, useState } from "react";
import { Stage, Layer, Line, Rect, Circle } from "react-konva";
import "./FreehandCircleDrawer.scss";
import { Link } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import { ScoreContext } from "../../contexts/ScoreContext";
import ScoreBoard from "../ScoreBoard/ScoreBoard";

function FreehandCircleDrawer() {
  const { score, setScore } = useContext(ScoreContext);

  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [perfectCircle, setPerfectCircle] = useState(null);

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
      let sumAngle = 0;
      line.forEach((point) => {
        const dx = point.x - centroidX;
        const dy = point.y - centroidY;
        const angle = Math.atan2(dy, dx);
        sumDistance += Math.sqrt(dx ** 2 + dy ** 2);
        sumAngle += angle;
      });
      const averageDistance = sumDistance / line.length;
      const averageAngle = sumAngle / line.length;
      console.log(`Avg distance: ${averageDistance}`);
      setPerfectCircle({
        x: centroidX,
        y: centroidY,
        radius: averageDistance,
      });

      // Calculate the standard deviation of distances
      let sumSquaredDifference = 0;
      let sumSquaredDifferenceAngle = 0;
      line.forEach((point) => {
        const dx = point.x - centroidX;
        const dy = point.y - centroidY;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        sumSquaredDifference += (distance - averageDistance) ** 2;
        const angle = Math.atan2(dy, dx);
        sumSquaredDifferenceAngle += (angle - averageAngle) ** 2;
      });
      const standardDeviation = Math.sqrt(sumSquaredDifference / line.length);
      const standardDeviationAngle = Math.sqrt(
        sumSquaredDifferenceAngle / line.length
      );

      console.log(`standard deviation: ${standardDeviation.toFixed(2)}`);

      // The perfectness score can be calculated based on the standard deviation of distances
      // Lower standard deviation indicates the drawn shape is closer to a perfect circle
      let perfectnessScore =
        1 / (1 + standardDeviation + standardDeviationAngle);
      // Add a bias based on the radius
      const radiusBias = averageDistance * 0.01;

      perfectnessScore = 1 / (1 + Math.exp(-(perfectnessScore*1 + radiusBias)));
      let finalScore = perfectnessScore * 10;

      setScore(score + finalScore);
      console.log(`Perfectness Score: ${perfectnessScore.toFixed(2)}`);
      // Update perfect circle data
    }
  };

  return (
    <div className="canvasContainer">
      <div className="title-container">
        <h1>Lets Draw Circles!!</h1>
        <ScoreBoard />
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
          {perfectCircle && (
            <Circle
              x={perfectCircle.x}
              y={perfectCircle.y}
              radius={perfectCircle.radius}
              stroke="red"
              strokeWidth={4}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}

export default FreehandCircleDrawer;
