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
    armorType?: string;
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
    savingThrows?: string[];
    skills?: string[];
    damageImmunities: string[];
    damageResistances: string[];
    damageVulnerabilities: string[];
    conditionImmunities: string[];
    senses?: string[];
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

    private readonly callbacks: (() => void)[] = [];
    
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
        this.curHP = Math.min(this.MaxHP, Math.max(0, v));
        this.raise();
    }
    
    public get HealthPercentage() : number {
        return (this.CurrentHP/this.MaxHP) * 100
    }
    
    public get Initiative() : number {
        return this.initiative;
    }
    
    constructor(public readonly data: IMonster) {
        const rollHP = Dice.rollString(data.hitPointRoll);
        this.maxHP = rollHP > 0 ? rollHP : data.hitPoints;
        this.curHP = this.maxHP;

        this.initiative = Dice.rollString(`d20 + ${data.dexterityModifier}`);
        this.name = data.name;
    }

    subscribe(callback: () => void) {
        this.callbacks.push(callback);
    }

    raise() {
        console.log(`Raising ${this.callbacks.length} Listeners`);
        this.callbacks.forEach(c => c());
    }
}

export const DEFAULT_PLAYER: IMonster = {
    name: "",
    flavorText: "",
    sectionText: "",
    size: "",
    types: ["player"],
    alignment: "",
    armorClass: 10,
    hitPoints: 10,
    hitPointRoll: "",
    speed: 30,
    speeds: "30 ft",
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    strengthModifier: 0,
    dexterityModifier: 0,
    constitutionModifier: 0,
    intelligenceModifier: 0,
    wisdomModifier: 0,
    charismaModifier: 0,
    damageImmunities: [],
    damageResistances: [],
    damageVulnerabilities: [],
    conditionImmunities: [],
    languages: [],
    challengeRating: "",
    experiencePoints: 0,
    behaviors: [],
}