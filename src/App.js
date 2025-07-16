
import React, { useState } from 'react';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [query, setQuery] = useState('');
  const [anime, setAnime] = useState(null);

  const fetchAnime = async () => {
    const res = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query ($search: String) {
          Media(search: $search, type: ANIME) {
            title { romaji }
            coverImage { large }
          }
        }`,
        variables: { search: query }
      })
    });
    const data = await res.json();
    setAnime(data.data.Media);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-400 mb-4">Waifu Tracker v2</h1>
      <input
        className="p-2 bg-gray-800 w-full mb-2"
        placeholder="Search anime..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-pink-500 p-2 rounded"
        onClick={fetchAnime}
      >
        Search
      </button>
      {anime && (
        <div className="mt-4">
          <img src={anime.coverImage.large} alt={anime.title.romaji} className="w-32 rounded" />
          <p>{anime.title.romaji}</p>
        </div>
      )}
    </div>
  );
}
