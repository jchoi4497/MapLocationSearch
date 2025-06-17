import type { Place } from "../api/Place";
import React, { useState, Fragment } from 'react';
import { search } from "../api/search";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function LocationSearch({ onPlaceClick, darkMode, onToggleDarkMode }: LocationSearchProps) {
  const [term, setTerm] = useState('');
  const [places, setPlaces] = useState<Place[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const results = await search(term);
    setPlaces(results);
  };

  return (
    <>
      {/* Card container */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-md shadow-md transition-colors duration-300">
        <form onSubmit={handleSubmit}>
          <input
            className="border border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-4 py-2 w-full
                       focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                       dark:bg-gray-700 dark:text-white"
            id="term"
            value={term}
            onChange={e => setTerm(e.target.value)}
            placeholder="Search places..."
          />
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-500 text-white font-bold px-4 py-2 mt-4 rounded-md shadow-md hover:bg-blue-600 active:bg-blue-700"
          >
            Search
          </button>
        </form>

        <div className="mt-6 space-y-3">
          {places.map(place => (
            <Fragment key={place.id}>
              <p className="text-sm dark:text-gray-300">{place.name}</p>
              <button
                className="bg-blue-500 text-xs text-white font-bold py-1 px-1 rounded shadow-sm hover:bg-blue-600 active:bg-blue-700"
                onClick={() => onPlaceClick(place)}
              >
                Go
              </button>
              <div className="border-b w-full border-gray-300 dark:border-white p-2" />
            </Fragment>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-end md:justify-start ml-3">
        <button
          onClick={onToggleDarkMode}
          className="w-full md:w-auto p-2 rounded-md
               bg-gray-400 dark:bg-gray-700
               text-gray-900 dark:text-gray-200
               hover:bg-gray-400 dark:hover:bg-gray-600
               transition-colors duration-150
               border border-gray-400 dark:border-gray-600"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"} Mode
        </button>
      </div>
    </>
  );
}