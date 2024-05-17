import { TerrainType } from '../enum/TerrainType';

export class Tile {
    terrain: TerrainType;

    constructor(terrain: TerrainType) {
        this.terrain = terrain;
    }
}