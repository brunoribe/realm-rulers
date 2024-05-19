import { Item } from './Item';
import { JobType } from '../enum/JobType';

const jobAttributes = {
    [JobType.WARRIOR]: { health: 120 },
    [JobType.MAGE]: { health: 80 },
    [JobType.ROGUE]: { health: 100 }
};

export class Adventurer {
    name: string;
    level: number;
    health: number;
    maxHealth: number;
    agility: number;
    strength: number;
    intelligence: number;
    experience: number;
    inventory: Item[];
    job: JobType;

    constructor(name: string) {
        this.name = name;
        this.level = 1;
        this.job = Math.floor(Math.random() * 3);
        this.maxHealth = jobAttributes[this.job].health;
        this.health = this.maxHealth;
        this.agility = Math.floor(Math.random() * 20) + 1;
        this.strength = Math.floor(Math.random() * 20) + 1;
        this.intelligence = Math.floor(Math.random() * 20) + 1;
        this.experience = 0;
        this.inventory = [];
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

    heal(amount: number) {
        this.health += amount;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }

    gainExperience(exp: number) {
        this.experience += exp;
        if (this.experience >= this.level * 100) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.maxHealth += 20;
        this.agility += 2;
        this.strength += 2;
        this.intelligence += 2;
        this.health = this.maxHealth;
        console.log(`${this.name} has leveled up to level ${this.level}!`);
    }

    die() {
        console.log(`${this.name} has died.`);
    }

    addItem(item: Item) {
        this.inventory.push(item);
    }

    useItem(itemIndex: number) {
        const item = this.inventory[itemIndex];
        if (item && item.type === 'Potion') {
            this.heal(item.effect);
            this.inventory.splice(itemIndex, 1);
        }
    }

    toString() {
        return `${this.name} (${JobType[this.job]}) - Lvl: ${this.level} HP: ${this.health}/${this.maxHealth} AGI: ${this.agility} STR: ${this.strength} INT: ${this.intelligence} EXP: ${this.experience}`;
    }
}