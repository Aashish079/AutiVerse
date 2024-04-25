import dogSound from "../../assets/Sounds/dog.mp3";
import dogImage from "../../assets/AnimalImages/dogR.png";
import catSound from "../../assets/Sounds/cat.mp3";
import catImage from "../../assets/AnimalImages/cat_final.png";
import elephantSound from "../../assets/Sounds/elephant.mp3";
import elephantImage from "../../assets/AnimalImages/elephant_F.png";
import lionSound from "../../assets/Sounds/lion_roar.mp3";
import lionImage from "../../assets/AnimalImages/lion_R.png";
import mouseSound from "../../assets/Sounds/mouse.mp3";
import mouseImage from "../../assets/AnimalImages/mouseR.png";
import errorSound from "../../assets/Sounds/wrong answer1.mp3";

const Animaldata = () => [
  {
    name: "Dog",
    image: dogImage,
    sound: dogSound,
    error: errorSound,
  },
  {
    name: "Cat",
    image: catImage,
    sound: catSound,
    error: errorSound,
  },
  {
    name: "Elephant",
    image: elephantImage,
    sound: elephantSound,
    error: errorSound,
  },
  {
    name: "Lion",
    image: lionImage,
    sound: lionSound,
    error: errorSound,
  },
  {
    name: "Mouse",
    image: mouseImage,
    sound: mouseSound,
    error: errorSound,
  },
];

export default Animaldata;
