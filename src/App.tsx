import { useEffect, useState } from 'react'
import './App.css'
import { GameMap } from './types/GameMap'
import { TerrainType } from './enum/TerrainType'
import { Adventurer } from './types/Adventurer'

function App() {
  const [gameMap, setGameMap] = useState(new GameMap(15, 15))
  const [terrainInfo, setTerrainInfo] = useState("")
  const [featuresInfo, setFeaturesInfo] = useState("")

  const generateAdventurers = () => {
    const adventurers: Adventurer[] = [];
    for (let i = 0; i < 10; i++) {
      adventurers.push(new Adventurer(`Adventurer ${i}`));
      console.log(adventurers[i].toString());
    }
  }

  const tileClick = (tile: any) => {
    let terrainInfo = `Terrain: ${TerrainType[tile.terrain]}`;
    setTerrainInfo(terrainInfo);

    if (tile.features.length > 0) {
      let featuresInfo = `Features: ${tile.features.map((feature: any) => feature.name).join(", ")}`
      setFeaturesInfo(featuresInfo)
    } else {
      setFeaturesInfo("")
    }

    if (tile.features.length > 0) {
      if (tile.features[0].name === "Dungeon") {
        console.log(tile.features[0].toString());
      }
    }
  }

  useEffect(() => {
    generateAdventurers();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "r") {
        setGameMap(new GameMap(15, 15))
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, []);

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
                    <button onClick={() => tileClick(tile)} className={`terrain-${tile.terrain} ${tile.features.length > 0 ? "has-feature" : ""}`}>
                      &nbsp;
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        terrainInfo && (
          <div className="popup">
            <p>{terrainInfo}</p>
            {featuresInfo && <p>{featuresInfo}</p>}
          </div>
        )
      }
    </>
  )
}

export default App
