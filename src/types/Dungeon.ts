import { Feature } from "./Feature";
import { Item, itemCatalog } from "./Item";
import { Monster } from "./Monster";

class Floor {
    name: string;
    description: string;
    number: number;
    rooms: Room[];

    constructor(name: string, description: string, number: number) {
        this.name = name;
        this.description = description;
        this.number = number;
        this.rooms = [];
        this.generateRooms(Math.floor(Math.random() * 3) + 1);
    }

    generateRooms(numRooms: number) {
        for (let i = 0; i < numRooms; i++) {
            this.rooms.push(new Room(`Room ${i + 1}`, `This is room ${i + 1}`, this.number));
        }
    }
}

class Room {
    name: string;
    description: string;
    floorNumber: number;
    monsters: Monster[];
    treasure: Item[];

    constructor(name: string, description: string, floorNumber: number) {
        this.name = name;
        this.description = description;
        this.floorNumber = floorNumber;
        this.monsters = [];
        this.treasure = [];
        this.fillRoom();
    }

    fillRoom() {
        const numMonsters = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numMonsters; i++) {
            this.monsters.push(new Monster(`Monster ${i + 1}`, this.floorNumber));
        }

        const numTreasure = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numTreasure; i++) {
            const itemData = itemCatalog[Object.keys(itemCatalog)[Math.floor(Math.random() * Object.keys(itemCatalog).length)]];
            this.treasure.push(new Item(itemData));
        }
    }

    removeMonster(monster: Monster) {
        const index = this.monsters.indexOf(monster);
        if (index > -1) {
            this.monsters.splice(index, 1);
        }
    }

    removeTreasure(item: Item) {
        const index = this.treasure.indexOf(item);
        if (index > -1) {
            this.treasure.splice(index, 1);
        }
    }

    clearRoom() {
        this.monsters = [];
        this.treasure = [];
    }

    hasMonsters() {
        return this.monsters.length > 0;
    }

    hasTreasure() {
        return this.treasure.length > 0;
    }

    getMonsters() {
        return this.monsters;
    }

    getTreasure() {
        return this.treasure;
    }
}

export class Dungeon implements Feature {
    name: string;
    description: string;
    floors: Floor[];

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.floors = [];
        this.addFloors();
    }

    addFloors() {
        const numFloors = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numFloors; i++) {
            const floor = new Floor(`Floor ${i + 1}`, `This is floor ${i + 1}`, i + 1);
            floor.generateRooms(Math.floor(Math.random() * 3) + 1);
            this.floors.push(floor);
        }
    }

    toString() {
        let dungeonInfo = `Dungeon: ${this.name}\nDescription: ${this.description}\n\n`;

        for (let i = 0; i < this.floors.length; i++) {
            const floor = this.floors[i];
            dungeonInfo += `Floor ${i + 1}: ${floor.name}\nDescription: ${floor.description}\n\n`;

            for (let j = 0; j < floor.rooms.length; j++) {
                const room = floor.rooms[j];
                dungeonInfo += `Room ${j + 1}: ${room.name}\nDescription: ${room.description}\n`;

                if (room.hasMonsters()) {
                    dungeonInfo += "Monsters:\n";
                    const monsters = room.getMonsters();
                    for (let k = 0; k < monsters.length; k++) {
                        dungeonInfo += `- ${monsters[k].name}\n`;
                    }
                }

                if (room.hasTreasure()) {
                    dungeonInfo += "Treasure:\n";
                    const treasure = room.getTreasure();
                    for (let k = 0; k < treasure.length; k++) {
                        dungeonInfo += `- ${treasure[k].name}\n`;
                    }
                }

                dungeonInfo += "\n";
            }

            dungeonInfo += "\n";
        }

        return dungeonInfo;
    }
}