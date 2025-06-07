import type { Place } from "./api/Place";
import { useState, useEffect } from "react";
import Map from "./components/Map";
import LocationSearch from "./components/LocationSearch";

function App() {
  const [place, setPlace] = useState<Place | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme") === "dark";
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const onToggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3">
        <LocationSearch
          onPlaceClick={(p) => setPlace(p)}
          darkMode={darkMode}
          onToggleDarkMode={onToggleDarkMode}
        />
      </div>
      <div className="w-full md:w-2/3">
        <Map place={place} />
      </div>
    </div>
  );
}

export default App;
