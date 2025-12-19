import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";


import ToDo from "./components/ToDo";
import Weather from "./components/Weather";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<ToDo />} />
        <Route path="/Weather" element={<Weather />} />
        <Route path="/Movies" element={<Movies />} />
      </Routes>
    </div>
  );
}

export default App;
