export interface Feature {
    name: string;
    description: string;
}

class Dungeon implements Feature {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

class City implements Feature {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

class Lair implements Feature {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

export { Dungeon, City, Lair };
