export interface Feature {
    name: string;
    description: string;
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

export { City, Lair };
