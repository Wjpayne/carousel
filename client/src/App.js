import "./App.css";
import Slider from "./Components/Slider";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [slides, setSlides] = useState([]);

  const loadPhotos = async () => {
    try {
      const result = await axios.get("http://localhost:5000/photo/get");

      setSlides(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPhotos();
   
  }, []);

  

  return (
    <div className="App">
      <Slider slides={slides}  />
    </div>
  );
}

export default App;
