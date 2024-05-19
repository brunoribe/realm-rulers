export enum ItemType {
    Weapon = "Weapon",
    Armor = "Armor",
    Potion = "Potion",
    Misc = "Misc",
}

export interface ItemData {
    name: string;
    value: number;
    weight: number;
    rarity: number;
    type: ItemType;
    description: string;
    effect: number;
}

export const itemCatalog: { [key: string]: ItemData } = {
    "sword": { name: "Sword", value: 10, weight: 5, rarity: 2, type: ItemType.Weapon, description: "A sharp blade.", effect: 5 },
    "shield": { name: "Shield", value: 15, weight: 8, rarity: 3, type: ItemType.Armor, description: "A sturdy shield.", effect: 3 },
    "healingPotion": { name: "Healing Potion", value: 5, weight: 1, rarity: 1, type: ItemType.Potion, description: "Restores health.", effect: 10 },
};



export class Item {
    name: string;
    value: number;
    weight: number;
    rarity: number;
    type: ItemType;
    description: string;
    effect: number;

    constructor(data: ItemData) {
        this.name = data.name;
        this.value = data.value;
        this.weight = data.weight;
        this.rarity = data.rarity;
        this.type = data.type;
        this.description = data.description;
        this.effect = data.effect;
    }
}
