export class Item {
    name: string;
    value: number;
    weight: number;
    rarity: number;
    type: string;
    description: string;
    effect: number;

    constructor(name: string, value: number, weight: number, rarity: number, type: string, description: string, effect: number) {
        this.name = name;
        this.value = value;
        this.weight = weight;
        this.rarity = rarity;
        this.type = type;
        this.description = description;
        this.effect = effect;
    }
}