import { useContext } from 'react'
import { ScoreContext } from '../../contexts/ScoreContext'
import './ScoreBoard.scss'

const ScoreBoard = () => {
    const {score } = useContext(ScoreContext);
  return (
    <div className='score-board'>
        <h2>Score</h2>
        <p>{Math.round(score)}</p>
    </div>
  );
}

export default ScoreBoard