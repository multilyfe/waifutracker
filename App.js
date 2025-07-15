
import React, { useState } from 'react';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    title: '',
    type: 'Anime',
    progress: 0,
    total: 12,
    ratings: {
      story: 5,
      characters: 5,
      ost: 5,
      op: 5,
      ed: 5,
      twists: 5,
      waifu: 5,
      combat: 5,
      cinematic: 5,
    }
  });

  const handleAddEntry = () => {
    setEntries([...entries, newEntry]);
    setNewEntry({
      title: '',
      type: 'Anime',
      progress: 0,
      total: 12,
      ratings: {
        story: 5,
        characters: 5,
        ost: 5,
        op: 5,
        ed: 5,
        twists: 5,
        waifu: 5,
        combat: 5,
        cinematic: 5,
      }
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Waifu Tracker</h1>
      <input
        placeholder='Title'
        value={newEntry.title}
        onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
      />
      <input
        type='number'
        placeholder='Progress'
        value={newEntry.progress}
        onChange={(e) => setNewEntry({ ...newEntry, progress: parseInt(e.target.value) })}
      />
      <input
        type='number'
        placeholder='Total Episodes'
        value={newEntry.total}
        onChange={(e) => setNewEntry({ ...newEntry, total: parseInt(e.target.value) })}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {Object.keys(newEntry.ratings).map((key) => (
          <div key={key}>
            <label>{key}</label>
            <input
              type='range'
              min='0'
              max='10'
              value={newEntry.ratings[key]}
              onChange={(e) =>
                setNewEntry({
                  ...newEntry,
                  ratings: { ...newEntry.ratings, [key]: parseInt(e.target.value) },
                })
              }
            />
            {newEntry.ratings[key]}
          </div>
        ))}
      </div>
      <button onClick={handleAddEntry}>Add Entry</button>
      <div>
        {entries.map((entry, i) => (
          <div key={i} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h3>{entry.title}</h3>
            <p>Progress: {entry.progress}/{entry.total}</p>
            <p>
              Score: {(
                Object.values(entry.ratings).reduce((a, b) => a + b, 0) /
                Object.keys(entry.ratings).length
              ).toFixed(1)} / 10
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
