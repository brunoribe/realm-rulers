import { useState } from 'react'
import './App.css'
import { GameMap } from './types/GameMap'

function App() {
  const [gameMap, setGameMap] = useState(new GameMap(15, 15))

  return (
    <>
      <h1>Realm Rulers</h1>
      <div className="card">
        <h2>Game Map</h2>
        <table>
          <tbody>
            {gameMap.tiles.map((row, i) => (
              <tr key={i}>
                {row.map((tile, j) => (
                  <td key={j}>
                    <button onClick={() => console.log(tile)} className={`terrain-${tile.terrain}`}>
                      &nbsp;
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
