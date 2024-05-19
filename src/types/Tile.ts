import { TerrainType } from '../enum/TerrainType';
import { Feature } from './Feature';

export class Tile {
    terrain: TerrainType;
    features: Feature[];

    constructor(terrain: TerrainType, features: Feature[] = []) {
        this.terrain = terrain;
        this.features = features;
    }
}