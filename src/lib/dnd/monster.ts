export enum MonsterSize {
    "None",
    "Tiny",
    "Small",
    "Medium",
    "Large",
    "Huge",
    "Gargantuan",
};

export enum MonsterDamageType {
    "Unknown",
    "Acid",
    "Cold",
    "Energy",
    "Fire",
    "Force",
    "Ion",
    "Kinetic",
    "Lightning",
    "Necrotic",
    "Poison",
    "Psychic",
    "Sonic"
};

export enum MonsterConditions {
    "A0",
    "Blinded",
    "Charmed",
    "A3",
    "Frightened",
    "A5",
    "Restrained",
    "A7",
    "A8",
    "Petrified",
    "Poisoned",
    "Prone",
    "Incapacitated",
    "A13",
    "Stunned",
    "A15",
};

export interface IMonster {
    name: string;
    flavorText: string;
    sectionText: string;
    size: MonsterSize;
    types: string[];
    alignment: string;
    armorClass: number;
    armorType: string;
    hitPoints: number;
    hitPointRoll: string;
    speed: number;
    speeds: string;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    savingThrows?: string[];
    skills?: string[];
    damageImmunities: string[];
    damageResistances: MonsterDamageType[];
    damageVulnerabilities: MonsterDamageType[];
    conditionImmunities: MonsterConditions[];
    senses: string[];
    languages: string[];
    challengeRating: string;
    experiencePoints: number;
}

export class Monster {
    
}