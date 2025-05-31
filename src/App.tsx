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
    <div className="h-screen w-screen grid grid-cols-12 font-open-sans bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="col-span-3 p-2">
        <LocationSearch
          onPlaceClick={(p) => setPlace(p)}
          darkMode={darkMode}
          onToggleDarkMode={onToggleDarkMode}
        />
      </div>
      <div className="col-span-9">
        <Map place={place} />
      </div>
    </div>
  );
}

export default App;
