import type { MonsterBehavior } from "./behaviors";
import { Dice } from "./dice";

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
    size: string;
    types: string[];
    alignment: string;
    armorClass: number;
    armorType: string|null;
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
    strengthModifier: number;
    dexterityModifier: number;
    constitutionModifier: number;
    intelligenceModifier: number;
    wisdomModifier: number;
    charismaModifier: number;
    savingThrows: string[]|null;
    skills: string[]|null;
    damageImmunities: string[];
    damageResistances: string[];
    damageVulnerabilities: string[];
    conditionImmunities: string[];
    senses: string[]|null;
    languages: string[];
    challengeRating: string;
    experiencePoints: number;
    behaviors: MonsterBehavior[];
}

export class Monster {
    private maxHP: number;
    private curHP: number;
    private initiative: number;
    private name: string;
    
    public get Name() : string {
        return this.name;
    }
    
    public set Name(v : string) {
        this.name = v;
    }
    
    public get MaxHP() : number {
        return this.maxHP;
    }
    
    public get CurrentHP() : number {
        return this.curHP;
    }
    
    public set CurrentHP(v : number) {
        this.curHP = v;
    }
    
    public get HealthPercentage() : number {
        return (this.MaxHP/this.CurrentHP) * 100
    }
    
    public get Initiative() : number {
        return this.initiative;
    }
    
    constructor(public readonly data: IMonster) {
        const rollHP = Dice.rollString(data.hitPointRoll);
        this.maxHP = rollHP > 0 ? rollHP : data.hitPoints;
        this.curHP = this.maxHP;

        this.initiative = Dice.rollString("d20") + data.dexterityModifier;
        this.name = data.name;
    }
}