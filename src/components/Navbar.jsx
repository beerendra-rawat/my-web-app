import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Navbar() {

  const { theme, toggleTheme } = useContext(ThemeContext);

  const navStyle = {
    padding: "15px",
    display: "flex",
    gap: "20px",
    flexWrap: 'wrap',
    borderBottom: '1px solid #cfcfcf',
  }
  const themeBtn = {
    backgroundColor: "#f8fafc",
    border: 'none',
    cursor: "pointer",
    borderRadius: '8px',
    width: '10%',
  }

  return (
    <nav style={navStyle}>
      <Link to="/">To-Do</Link>
      <Link to="/Weather">Weather</Link>
      <Link to="/Movies">Movies</Link>

      <button onClick={toggleTheme} style={themeBtn}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </nav>
  );
}
