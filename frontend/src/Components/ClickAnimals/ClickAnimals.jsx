import Animaldata from "./AnimalData";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import "./ClickAnimals.scss";
import { ScoreContext } from "../../contexts/ScoreContext";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import apiClient from "../../utils/api-client";
import { head_selector } from "svelte/internal";

const ClickAnimals = () => {
  const { score, setScore } = useContext(ScoreContext);

  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [click, setClick] = useState(0);

  //Shuffle the array of animals and set the first one as the current animal
  useEffect(() => {
    const shuffledAnimals = [...Animaldata()].sort(() => Math.random() - 0.5);
    setCurrentAnimal(shuffledAnimals[0]);
  }, [selectedAnimal, click]);
  //Handle image click
  const handleImageClick = (animal) => {
    setSelectedAnimal(animal);
  };

  //Play sound based on the selected animal
  useEffect(() => {
    let sound;
    if (selectedAnimal) {
      if (selectedAnimal.name == currentAnimal.name) {
        //Play the animal sound
        sound = new Audio(selectedAnimal.sound);
        setScore(score + 10);
        setClick(click + 1);
      } else {
        //Play the error sound
        sound = new Audio(selectedAnimal.error);
        setClick(click + 1);
      }
      sound?.play();
      // Stop the sound after 5 seconds
      const timeoutId = setTimeout(() => {
        sound?.pause();
        sound.currentTime = 0;
      }, 4000);
      // Clean up the timeout when the component unmounts or re-renders
      return () => {
        clearTimeout(timeoutId);
        sound.pause();
      };
    }
  }, [selectedAnimal]);
  console.log(score);
  const data = {
    name: "user1",
    score: Math.round(score),
    game_session: "Game5",
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //Save the score to the backend
const saveScore = () => {

  apiClient
    .post("/score/list/", data, config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
    setScore(0);
    
};


return (
  <div>
    <div className="Nav-Container">
      <div className="select-message">
        Find: <span className="animal">{currentAnimal?.name}</span>
      </div>
      <ScoreBoard />
      <Link to="/get-started" onClick={saveScore}>
        <button className="btn-next">
          Exit
          <span className="icon">
            <IoMdExit />
          </span>
        </button>
      </Link>
    </div>
    <div className="animal-container">
      {Animaldata().map((animal, index) => (
        <img
          className="animal-image"
          key={index}
          src={animal.image}
          alt={animal.name}
          width={100}
          height={100}
          onClick={() => handleImageClick(animal)}
        />
      ))}
    </div>
  </div>
);
};

export default ClickAnimals;
