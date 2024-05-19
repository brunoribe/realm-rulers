import { Adventurer } from "./Adventurer";

export class Monster {
    name: string;
    level: number;
    health: number;
    maxHealth: number;
    agility: number;
    strength: number;
    intelligence: number;
    experience: number;

    constructor(name: string, level: number) {
        this.name = name;
        this.level = level;
        this.maxHealth = level * 20;
        this.health = this.maxHealth;
        this.agility = level * 2;
        this.strength = level * 2;
        this.intelligence = level * 2;
        this.experience = level * 100;
    }

    receiveDamage(damage: number) {
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        }
    }

    attack(target: Adventurer) {
        const damage = this.strength * 2;
        target.receiveDamage(damage);
    }

    die() {
        // Drop treasure
    }
}