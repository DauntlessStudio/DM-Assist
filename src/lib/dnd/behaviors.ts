import type { MonsterDamageType } from "./monster";

export enum MonsterBehaviorType {
    "None",
    "Trait",
    "Action",
};

export enum MonsterAttackType {
    "None",
    "MeleeWeapon",
    "RangedWeapon",
};

export type MonsterBehavior = {
    name: string;
    monsterBehaviorType: string;
    description: string;
    descriptionWithLinks: string;
    attackType: string;
    restrictions: any;
    attackBonus: number;
    range: string|null;
    numberOfTargets: string|null;
    damage: string|null;
    damageRoll: string|null;
    damageType: string;
}