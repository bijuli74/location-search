import React, { Fragment, useState, useEffect } from "react";
import type { Place } from "../api/Place";
import {search} from "../api/search";

interface LocationSearchProps {
  onPlaceClick: (place: Place) => void;
}

export default function LocationSearch({ onPlaceClick }: LocationSearchProps) {
  const [term, setTerm] = useState('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const results = await search(term);
    setPlaces(results)
  };

   // Use useEffect to call onPlaceClick with the first place whenever places changes
  useEffect(() => {
    if (places.length > 0) {
      setSelectedPlace(places[0]);
    }
  }, [places]); 

  useEffect(() => {
    if (selectedPlace) {
      onPlaceClick(selectedPlace);
    }
  }, [selectedPlace, onPlaceClick]);

  return (
   <div>
    <form onSubmit={handleSubmit}> 
    <label className="font-bold" htmlFor="term">Search</label>
    <input 
      className="border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 px-4 py-2 w-full"
      id="term"
      value={term}
      onChange={(e) => setTerm(e.target.value)}
    />
    </form>

    <h1 className="font-bold mt-6">Found Locations</h1>
    <div className="grid grid-cols-[1fr 40px] gap-2 mt-2 items-center">
    {places.map((place) => {
      return (
        <Fragment key={place.id}>
          <p className="text-sm">{place.name}</p>
          <button
            className="bg-blue-500 text-xs text-white font-bold py-1 px-1 rounded"
            onClick={() => setSelectedPlace(place)}
          > 
          Go 
          </button>

          <div className="border-b w-full col-span-2" />
        </Fragment>
      );
    })}
    </div>
    </div>
  );
}