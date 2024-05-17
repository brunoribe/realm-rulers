import { createNoise2D } from 'simplex-noise';
import { Tile } from './Tile';

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
            }
        }
    }
}
