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

    // Método para o aventureiro receber dano
    receiveDamage(damage: number) {
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        }
    }

    // Método para o aventureiro atacar outro aventureiro ou monstro
    attack(target: Adventurer) {
        const damage = this.strength * 2; // Simples cálculo de dano
        target.receiveDamage(damage);
    }

    // Método para curar o aventureiro
    heal(amount: number) {
        this.health += amount;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }

    // Método para adicionar experiência
    gainExperience(exp: number) {
        this.experience += exp;
        if (this.experience >= this.level * 100) { // Suponha 100 exp por nível
            this.levelUp();
        }
    }

    // Método para o aventureiro subir de nível
    levelUp() {
        this.level++;
        this.maxHealth += 20;
        this.agility += 2;
        this.strength += 2;
        this.intelligence += 2;
        this.health = this.maxHealth; // Restaurar a saúde ao subir de nível
        console.log(`${this.name} has leveled up to level ${this.level}!`);
    }

    // Método para quando o aventureiro morre
    die() {
        console.log(`${this.name} has died.`);
        // Aqui você pode adicionar lógica adicional para quando o aventureiro morre
    }

    // Método para adicionar itens ao inventário
    addItem(item: Item) {
        this.inventory.push(item);
    }

    // Método para usar um item do inventário
    useItem(itemIndex: number) {
        const item = this.inventory[itemIndex];
        // Suponha que o item possa ser um item de cura
        if (item && item.type === 'potion') {
            this.heal(item.effect);
            this.inventory.splice(itemIndex, 1); // Remove o item após o uso
        }
    }

    toString() {
        return `${this.name} (${JobType[this.job]}) - Lvl: ${this.level} HP: ${this.health}/${this.maxHealth} AGI: ${this.agility} STR: ${this.strength} INT: ${this.intelligence} EXP: ${this.experience}`;
    }
}