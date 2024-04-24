import Animaldata from "./AnimalData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import "./ClickAnimals.scss";

const ClickAnimals = () => {
  const [currentAnimal, setCurrentAnimal] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  

  //Shuffle the array of animals and set the first one as the current animal
  useEffect(() => {
    const shuffledAnimals = [...Animaldata].sort(() => Math.random() - 0.5);
    setCurrentAnimal(shuffledAnimals[0]);
  }, []);
  //Handle image click
  const handleImageClick = (animal) => {
    setSelectedAnimal(animal);
  };

  //Play sound based on the selected animal
  useEffect(() => {
    if (selectedAnimal) {
      if (selectedAnimal.name == currentAnimal.name) {
        //Play the animal sound
        new Audio(selectedAnimal.sound).play();
      } else {
        //Play the error sound
        new Audio(selectedAnimal.error).play();
      }
    }
  }, [selectedAnimal]);

  return (
    <div>
      <div className="Nav-Container">
      <div className="select-message">
        Find: <span className="animal">{currentAnimal?.name}</span>
      </div>
        <Link to="/get-started">
          <button className="btn-next">
            Exit
            <span className="icon">
              <IoMdExit/>
            </span>
          </button>
        </Link>
      </div>
      <div className="animal-container">
      {Animaldata.map((animal, index) => (
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
