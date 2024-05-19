import { createNoise2D } from 'simplex-noise';
import { Tile } from './Tile';
import { TerrainType } from '../enum/TerrainType';
import { Feature, City, Lair } from './Feature';
import { Dungeon } from './Dungeon';

export class GameMap {
    tiles: Tile[][];

    constructor(x: number, y: number, frequency: number = 0.1) {
        this.tiles = [];

        const noise = createNoise2D();  // Create the noise function once to use it multiple times efficiently
        for (let i = 0; i < x; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < y; j++) {
                const value = noise(i * frequency, j * frequency);
                // Normalize the value from -1...1 to 0...1
                const normalizedValue = (value + 1) / 2;
                // Convert the normalized value to an integer index (0, 1, 2, 3 for four tile types)
                const tileType = Math.floor(normalizedValue * 4);
                // Ensure that the value does not exceed the maximum index (3 for four types)
                const finalTileType = Math.min(tileType, 3);
                this.tiles[i][j] = new Tile(finalTileType);

                // Add features to tiles
                const feature = this.determineFeature(i, j, finalTileType);
                if (feature) {
                    this.tiles[i][j].features.push(feature);
                }
            }
        }
    }

    determineFeature(i: number, j: number, terrainType: TerrainType): Feature | null {
        // Base chance of having a feature
        const chance = Math.random();
        let threshold = 0.2; // 20% chance of having a feature

        switch (terrainType) {
            case TerrainType.Grass:
                if (chance < threshold) {
                    return new City("City", "A bustling desert city.");
                }
                break;
            case TerrainType.Mountain:
                if (chance < threshold) {
                    return new Dungeon("Dungeon", "A dark and dangerous dungeon.");
                }
                break;
            case TerrainType.Desert:
                if (chance < threshold) {
                    return new Lair("Cavern", "A mysterious cavern.");
                }
                break;
        }

        // Raises the threshold for specific points of interest
        if (i % 10 === 0 && j % 10 === 0) { // Every 10th tile
            threshold = 0.5;  // 50% chance of having a feature
            if (chance < threshold) {
                return new Dungeon("Ancient Ruins", "Ruins of an ancient civilization.");
            }
        }

        return null; // No feature
    }
}
